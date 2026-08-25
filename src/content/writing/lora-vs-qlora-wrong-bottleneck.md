---
title: "Fine-Tuning with LoRA and QLoRA"
date: 2026-08-21
summary: "RAG or fine-tuning. One gives a model access to what you know, the other changes how it behaves. I tested LoRA against QLoRA on the same model and the memory-saving option lost, which turned out to be the interesting part."
tags: [Fine-Tuning, LoRA, QLoRA, RAG]
---

RAG or fine-tuning. One gives a model access to what you know. The other changes how it behaves.

RAG gives the model access to your documents. It looks things up and answers using the retrieved context. Update a fact by editing the document, answers can cite where they came from, and access can be restricted at retrieval time.

Fine-tuning changes the model's learned behaviour. It is good at teaching tone, format, terminology, and response patterns. Knowledge baked into the weights does not update when the documents change, and fine-tuning by itself gives the model nothing to cite. Confidential or fast-changing material is usually better kept in RAG than baked into the weights.

RAG was covered previously in [Building a RAG system on real Arabic data](/writing/rag-on-real-arabic-data). This is the other half.

## LoRA and QLoRA

Full fine-tuning updates every parameter in the model. For a model with billions of parameters, training memory can be several times larger than the model weights alone once gradients, optimizer states, activations and precision are accounted for. It also leaves you with a separate set of model weights for each fine-tune. Eight teams, eight copies.

**LoRA** freezes the base model and trains a small set of low-rank updates alongside selected layers. The original parameters stay locked and only the adapter weights learn. Depending on the rank and which layers are targeted, those trainable parameters can be a tiny fraction of the full model. During inference those learned updates are applied alongside the base weights, or can be merged into them.

So the base model stays untouched, each fine-tune produces a much smaller adapter rather than another full model, and training memory drops significantly. Eight teams, one base model, eight adapters.

**QLoRA** shrinks the memory requirement again. Standard LoRA does not require the base model to be full precision, but it is commonly loaded in FP16 or BF16. QLoRA instead keeps the frozen base model quantized to 4-bit while training the adapters at higher precision. The quantized weights are dequantized to the compute datatype as needed during computation, which saves memory but can cost training speed.

Two details worth being precise about, because they are easy to get wrong:

- The base model **on disk** is unchanged. The compression happens at load time.
- The **adapter** stays 16-bit deliberately. A 4-bit adapter trains unstably.

## The test

Both were run on a DGX Spark, fine-tuning Qwen3-8B on 342 examples from the DefenseClaw documentation. Everything was held the same except the setting that enabled 4-bit quantization for the base model.

Rank 16, alpha 32, dropout 0.1, all linear layers, seed 42, 100 steps, learning rate 1e-5, AdamW. NeMo AutoModel 26.02. Machine idle, both runs back to back.

| | LoRA | QLoRA |
|---|---|---|
| Wall clock | 4m07s | 6m13s (+51%) |
| Peak training memory | 17.2 GiB | 7.6 GiB (−56%) |
| Throughput | ~550 tok/s | ~330 tok/s (−40%) |
| Adapter size | 100 MB | 99 MB |
| Final validation loss | 2.0405 | 2.0452 |

QLoRA used around half the memory and took roughly 50% longer. On the questions the dataset covered, the resulting answers were broadly similar: validation loss within 0.2%, and the generated answers on 30 held-out questions substantively the same.

That trade is worth making when memory is what you are short of. It is not worth it when memory is sitting spare, which is what happened here. The Spark had 53 GB free and LoRA only needed 17, so the compression solved a problem I did not have and the extra training time was a straight loss.

Same technique, opposite answer, depending on the machine.

The identical adapter size is the mechanism visible in one number. 100 MB against 99 MB, because quantization only touches the frozen base and the adapter is 16-bit in both runs. The adapter is the only thing you keep, and it is the same either way.

### A second result I was not looking for

I reran both while another model was competing for memory bandwidth.

QLoRA came in at 6m12s contended against 6m13s idle. One second apart. LoRA went from 4m07s idle to 5m08s contended.

QLoRA is compute-bound on dequantization, so it does not notice bandwidth pressure. LoRA is bandwidth-bound, so it does. Measured by accident, but it is the clearest demonstration of the mechanism in the whole exercise.

## Check that it loaded at all

Before any of those numbers meant anything, I checked whether the adapter had actually loaded. It had not.

NeMo AutoModel 26.02 writes LoRA checkpoints with the key prefix the loader expects:

```
base_model.model.model.layers.0.mlp.down_proj.lora_A.weight
```

and QLoRA checkpoints without it:

```
model.layers.0.mlp.down_proj.lora_A.weight
```

The loader matches zero keys, emits a warning about missing adapter keys, and loads successfully anyway with every adapter tensor left at its initial value. No exception, no failure. The model runs perfectly well, as the plain base model.

I caught it because `lora_B` tensors initialise at exactly zero, so any non-zero value proves training happened. Reading them directly gave 253 tensors at a mean absolute value of 0.00000000. The weights on disk were fine. Reading the file directly gave 0.000215, essentially identical to LoRA's 0.000206. Training had worked. Loading had not. Renaming the keys fixed it.

Anyone who follows the playbook and evaluates with the standard loader will test the base model, see no improvement, and conclude their QLoRA run failed.

## What the model learned

Style transferred well. Right vocabulary, better structure, more focused answers.

Specific facts were much less reliable. Asked one factual question, it gave the generic answer even though that fact appeared in the training data five times. Training for five times longer made the model fit the 342 examples more closely, but generalisation got worse.

The dataset had 342 examples of how DefenseClaw's parts fit together and none that clearly explained what DefenseClaw itself is. Asked directly what it does, all three versions invented an answer, and a different one each time. The tuned versions simply sounded more confident about it.

Fine-tuning cannot compensate for information that is missing or poorly represented in the dataset. Building the dataset is the work.

## Takeaway

Fine-tuning changed how the model behaved. With these 342 examples, it did not reliably change what it knew. A better and broader dataset could improve that, but the distinction is still useful: behaviour is generally easier to teach through fine-tuning than reliable, updateable factual knowledge.

Want the model to sound like your team and follow your format? Fine-tuning, and LoRA makes it cheap enough to be practical. Want it to answer from current product documentation and show where the answer came from? RAG.

A lot of real systems want both. RAG supplies the knowledge; fine-tuning can shape how the model uses it. Refusing to answer when the retrieved passage does not support the response can be reinforced through fine-tuning, although it can also be implemented through prompting and application logic.

One last thing: change one variable at a time. Example configs are written to demonstrate a technique, not to compare two, so their defaults rarely make a fair test.
