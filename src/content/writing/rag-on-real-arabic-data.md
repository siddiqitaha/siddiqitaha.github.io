---
title: "Building a RAG system on real Arabic data: a few notes"
date: 2026-06-18
summary: "Notes from building a production RAG pipeline on Arabic and English policy data, running locally on a DGX Spark. The architecture was the easy part. Cleaning the data and making the system refuse to guess was the real work."
tags: [RAG, AI, Retrieval, Arabic]
---

Two years ago, almost to the day, I built my first RAG chatbot for my final year project. Local Llama 2 through Ollama, nomic-embed-text for the embeddings, ChromaDB for retrieval, fixed character-count chunking, and a small Gradio window to ask it questions. It worked, and at the time it felt like magic. The [code is still up](https://github.com/siddiqitaha/rag_llama3), and I even [wrote it up](https://www.linkedin.com/pulse/ai-chatbot-local-llm-efficient-retrieval-project-showcase-siddiqi-zapef/).

This summer we built another one. Same core idea, retrieve then generate, but almost nothing else is the same. Production data instead of a tidy demo set. Arabic and English instead of clean English. A DGX Spark in the room instead of my laptop. GPT-OSS-120B, Qwen3 embeddings, a reranker, Qdrant, all of it running locally. Two years, and both the technology and I have moved a long way.

What surprised me is what did not change. The model was never the hard part. Real data does not behave, and a RAG pipeline looks perfectly healthy while feeding the model garbage. So most of the effort went into two things: cleaning the data, and making the system refuse to guess.

## The pipeline

![Full pipeline: three models, three jobs](/writing-assets/rag-pipeline.png)

_Three models, three jobs. The big one reasons; the small ones retrieve._

| Layer | What |
|-------|------|
| Machine | NVIDIA DGX Spark (GB10) |
| Generation | GPT-OSS-120B (mxfp4): classifies, grounds, answers |
| Embeddings | Qwen3-Embedding-4B (2560-dim) |
| Reranker | Qwen3-Reranker-0.6B |
| Vector DB | Qdrant |
| Storage | MinIO |

## What made it hard

A few challenges worth flagging:

- **Extraction.** The website was JavaScript-rendered, so normal requests returned no content; a real browser that actually ran the page was the only way in. The PDFs were born-digital, where a plain command-line extractor beat a heavier vision model.
- **Arabic.** Text looked fine on screen and extracted broken: scrambled order, mangled ligatures, and errors that read perfectly plausible (more on that below).
- **Chunking.** There is no universal strategy. Instead, I let a capable LLM pick the chunking approach per source, so it fits the hierarchy of each type of data.
- **Retrieval.** Qwen3 embeddings into Qdrant, then a Qwen3 reranker. The query is routed by program level, so only the documents a user is allowed to see are searched.

The Arabic problem is the one to sit with. Here is the kind of thing extraction produced:

| Looked like | Came out as | Why it matters |
|-------------|-------------|----------------|
| 3.5 | 35 | A GPA cutoff, wrong by 10x |
| تخويل (granting) | تحويل (transferring) | The opposite meaning, in a policy |

None of these throw an error. They just read plausibly, and they are wrong.

## The embedding model is the one you live with

One thing I underrated: the embedding model. We started with a small one (Qwen3-Embedding-0.6B, 1024-dim). It worked, technically, but retrieval kept confusing sibling policies, and English-to-Arabic questions barely cleared the threshold.

Moving to Qwen3-Embedding-4B (2560-dim) fixed most of it, but it was not a free swap: vectors grew 2.5x, the index roughly doubled, and there is no upgrade in place, so the whole corpus had to be re-embedded. The LLM is easy to swap. The embedding model is the one you live with.

## Don't trust the first pass

Nothing is trusted on the first pass. Every stage that touches data runs a verification loop: a local model (GPT-OSS-120B) checks each item, and only the hard cases get a second opinion from a frontier model.

And before any answer is written, a grounding check asks whether the retrieved chunks contain the answer at all. If they do not, the user gets "information not available in the provided documents," in their own language, instead of a confident hallucination.

Do the work, verify locally, audit the hard cases, and only a pass continues. A fail loops back.

![The verification loop: do the work, verify locally, audit the hard cases, pass or loop](/writing-assets/verification-loop.png)

## Lessons that might save someone some pain

- **The real bug is usually upstream.** Bad extraction quietly poisons everything after it.
- **Normalize identically on both sides.** Same rules at index and query time, or retrieval degrades with no error to tell you why.
- **Match the tool to the document.** A decades-old text extractor beat a vision model on clean PDFs.
- **Make it refuse.** A system that says "I don't know" is worth more than one that always answers.
- **Keep provenance.** When something breaks weeks later, you will want to trace it back to the exact source.

## Takeaway

The model is the most replaceable part of the system. We can swap it next quarter. What we cannot download is an understanding of the data in its own language.

This is a short summary, and there is far more depth to each piece. I would love to hear how others have handled RAG on messy, non-English data. Always happy to learn.
