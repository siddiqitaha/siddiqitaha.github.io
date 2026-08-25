---
title: "I ran LoRA against QLoRA and QLoRA lost"
date: 2026-08-19
summary: "QLoRA is meant to be the memory-efficient option. On a machine with 128GB of memory it cost 51% more time and saved something I did not need. That is not a failed experiment, it is the finding."
tags: [Fine-Tuning, LoRA, QLoRA, Benchmarks]
---

The advice you read everywhere is that QLoRA is the efficient choice. Squeeze the frozen base model down to 4-bit, train the small adapter on top, and fit a model on hardware that could not otherwise hold it. It is good advice. It is also advice about a specific problem, and I had a different one.

## What the two techniques actually are

**LoRA** freezes the base model's weights and bolts on a small trainable side-path, about 0.1% as many numbers. At inference the prompt runs through both and the results are added. The adapter is a separate file, roughly 100MB against the base model's 16GB.

**QLoRA** is LoRA with the frozen base squeezed to 4-bit. Three things behave differently and it is worth being precise about them:

- The base model **on disk** is unchanged. The compression happens when it loads.
- The base model **in memory** is 4-bit and stays that way. It is frozen, so it is never trained.
- The **adapter** stays 16-bit, deliberately. A 4-bit adapter trains unstably.

So QLoRA is two precisions on purpose: a 4-bit frozen base and a 16-bit adapter that does the learning. The 4-bit base has to be unpacked back to 16-bit on **every single forward pass**. You are spending time to buy capacity.

That trade is the whole story. It is only a good trade if capacity is what you are short of.

## The setup

Qwen3-8B, 16.4GB on disk. NeMo AutoModel 26.02. 342 training and 30 test question-answer pairs I wrote from our own DefenseClaw documentation, so I could tell whether the model had actually learned the facts or just picked up the tone.

Same everything else: rank 16, alpha 32, dropout 0.1, all linear layers, seed 42, 100 steps, learning rate 1e-5, AdamW. The two config files differ only in the quantization block. Machine idle, both runs back to back.

## The numbers

| | LoRA | QLoRA |
|---|---|---|
| Wall clock | 4m07s | 6m13s (+51%) |
| Peak training memory | 17.2 GiB | 7.6 GiB (−56%) |
| Throughput | ~550 tok/s | ~330 tok/s (−40%) |
| Adapter size | 100 MB | 99 MB |
| Final validation loss | 2.0405 | 2.0452 |

Quality came out equivalent, checked three independent ways: validation loss within 0.2%, adapter weights near-identical, and the generated answers on 30 held-out questions substantively the same.

## Why QLoRA lost

The machine has 128GB of unified memory, about 119GB usable. LoRA peaked at 17.2 GiB. It was never anywhere near a limit.

So the 9.7 GiB that QLoRA saved bought nothing at all. And the memory on this hardware is roughly seven times slower than the memory on a datacenter card, which is exactly the resource QLoRA's unpack-on-every-forward-pass cost is charged against. It spent 51% more time to save something I had in abundance.

On a 24GB card where LoRA will not fit, QLoRA is the difference between working and crashing. Here it was the difference between four minutes and six.

**A technique is not efficient or inefficient on its own. It solves one specific shortage, and you have to know which shortage you actually have.**

## The identical adapter size is the proof

100 MB against 99 MB. That is not a coincidence, it is the mechanism visible in a single number: quantization only touches the frozen base, and the adapter is 16-bit in both runs. The adapter is the only thing you keep, and it is the same either way.

## A second finding I did not go looking for

I ran both again while another model was competing for memory bandwidth.

QLoRA: 6m12s contended, 6m13s idle. One second apart.

LoRA: 5m08s contended, 4m07s idle.

QLoRA is compute-bound on unpacking, so it does not notice bandwidth pressure. LoRA is bandwidth-bound, so it does. I measured it by accident, and it is the cleanest demonstration of the mechanism in the whole exercise.

## The bug that nearly wasted all of it

Before any of those numbers meant anything, I checked whether the adapter had actually loaded.

NeMo AutoModel 26.02 writes LoRA checkpoints with the key prefix that the loader expects:

```
base_model.model.model.layers.0.mlp.down_proj.lora_A.weight
```

and QLoRA checkpoints without it:

```
model.layers.0.mlp.down_proj.lora_A.weight
```

The loader then matches zero keys. It emits a warning about missing adapter keys and **loads successfully anyway**, with every adapter tensor left at its initial value. No exception. No failure. The model loads and runs perfectly well, as the plain base model.

I caught it because the `lora_B` tensors initialise at exactly zero, so any non-zero value proves training happened. I read them directly: 253 tensors, mean absolute value 0.00000000.

The weights on disk were fine. Reading the file directly gave a mean of 0.000215, essentially identical to LoRA's 0.000206. Training had worked. Loading had not. Renaming the keys fixed it, and the tensors came back at 0.00026.

Anyone who follows the vendor playbook and then evaluates with the standard loader will test the base model, see no improvement, and conclude their QLoRA run failed.

**No error is not the same as it worked.** The only reason I know these results are real is that I read the numbers instead of trusting that the run finished cleanly.

## What actually transferred

Worth saying plainly, because it is the thing fine-tuning is most often misunderstood for. The adapter learned style, structure, confidence and vocabulary. On one question it moved the model from a vague "secure intermediary layer" to "the client uses a bearer token, the guardrail uses the provider API key": correct in shape, wrong in the specifics.

It did not reliably learn exact strings. A particular pair of header names appeared five times in the training data and the model never produced them, at any learning rate or step count I tried. Five mentions could not outweigh everything the base model had already read about how proxies work.

Fine-tuning teaches behaviour. Retrieval provides facts. They are not substitutes, and the adapter contains no dataset to look anything up in.
