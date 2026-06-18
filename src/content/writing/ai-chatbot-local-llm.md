---
title: "AI Chatbot with a Local LLM and Efficient Retrieval"
date: 2024-06-18
summary: "My final year project: a RAG chatbot built on a local LLM (Ollama + Llama 2), nomic-embed-text embeddings, ChromaDB retrieval, and a Gradio interface. Reposting it here as the starting point of the journey."
tags: [RAG, LLM, Ollama, ChromaDB]
---

_This was my final year project, first published on LinkedIn in June 2024. I am reposting it here as the starting point. Two years later I built a [production version on real Arabic data](/writing/rag-on-real-arabic-data), and it is striking how far both the tooling and I have come._

![Retrieval Augmented Generation: siddiqitaha/rag_llama3, built with Gradio, Chroma, and Llama 3](/writing-assets/fyp-cover.png)

## Introduction

As part of my final year project, I built an AI chatbot that leverages large language models (LLMs) and document retrieval. It integrates Ollama's embeddings with ChromaDB's retrieval to provide accurate, contextually relevant responses. Using Retrieval-Augmented Generation (RAG), the chatbot combines the strengths of retrieval and generation, which improves accuracy, efficiency, and user satisfaction. It also features a Gradio web interface, so users can interact with the chatbot, ask questions, and adjust response creativity.

## Project overview

The goal was a highly interactive, intelligent chatbot that answers questions by retrieving relevant information from a predefined set of documents. By combining Ollama's embedding and language models with ChromaDB's efficient retrieval, the system not only understands user queries but also provides accurate, contextually rich answers.

![Implemented RAG architecture: data loading, splitting, storage, retrieval, output](/writing-assets/fyp-architecture.png)
_The high-level stages: load, split, store, retrieve, answer._

## Key components

**Ollama embedding and LLM.** Ollama is the backbone for generating embeddings and text responses. The nomic-embed-text model creates vector embeddings of the documents, and the Llama 2 model generates responses, which keeps the chatbot's answers accurate and relevant.

**ChromaDB for document retrieval.** ChromaDB acts as the vector store, holding and efficiently retrieving document embeddings, so the chatbot can quickly fetch and use the most relevant information.

![Vector store method: scrape, split, embed with nomic-embed-text, store in ChromaDB](/writing-assets/fyp-vector-store.png)
_Building the vector store: scrape the source, split into chunks, embed, and persist to ChromaDB._

**Character splitting.** A technique to break a large text into smaller, manageable chunks based on character count. Each chunk holds a set number of characters (here, 500 characters with a 75-character overlap), which makes lengthy documents easier to process while preserving the contextual flow across chunks. It also gives the embedding and retrieval steps consistent, uniform input sizes.

![Character splitting: full text divided into overlapping chunks](/writing-assets/fyp-character-splitting.png)
_Character splitting with overlap, so context is not lost at the chunk boundaries._

**Gradio web interface.** A friendly platform for interacting with the chatbot. Users ask questions, adjust the model's temperature to control response creativity, and view responses directly in the browser.

![Gradio interface flow: user query, retrieval from Chroma, Llama 3 response](/writing-assets/fyp-gradio.png)
_The query path: ask in Gradio, retrieve from Chroma, answer with Llama 3._

## Features

- **Local embedding generation** using Ollama's nomic-embed-text model for documents sourced from various URLs.
- **Efficient retrieval with ChromaDB**, making the retrieval process fast and reliable.
- **Customizable responses** by adjusting the LLM's temperature for more or less creative output.
- **User-friendly interface** via Gradio for asking questions and receiving concise, sourced answers.

## Conclusion

This project showed the potential of combining capable AI models with efficient retrieval to build a robust, interactive chatbot. Ollama handled embeddings and text generation, ChromaDB handled fast document retrieval, and Gradio made it easy to use. It was the foundation that everything since has built on.
