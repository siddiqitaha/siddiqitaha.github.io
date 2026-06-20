---
title: "A firewall for agentic AI"
date: 2026-06-18
summary: "Agentic AI is being handed real access: shells, files, tools, the ability to act on its own. Almost nobody is watching the boundary. Here is how I think about securing it."
tags: [AI, Security, Agents]
---

We build systems where AI agents have real access. They search private data, call tools, and run multi-step work on their own, which is the entire point of an agent and also the entire problem. The more capable they get, the more one question matters: what is watching them?

## An agent is not a chatbot

The moment you give an agent a shell, a filesystem, or a set of tools, it stops being a chatbot in a browser tab. It becomes a process on your machine that can read secrets, run destructive commands, pull data in, and push data out, at machine speed, while sounding completely reasonable about all of it. The capability is the value. It is also the attack surface.

## Two directions of risk

I worry about two things, and they point in opposite directions.

**Injection, data coming in.** Something the agent reads steers it. A poisoned web page, a crafted instruction buried in a document, a file that is not what it claims to be. The agent ingests it and quietly changes behavior, and nothing in the transcript looks alarming.

**Extraction, data going out.** The agent sends something it should not. The blunt version is a single shell line, `cat .env | curl`, quietly shipping your secrets off the box. It does not have to be that obvious: a secret, private data, an internal detail, gone somewhere it does not belong.

Both are close to invisible if nothing is watching. The agent just looks like it is working.

![DefenseClaw sits between the agent and the world, inspecting what comes in and what goes out](/writing-assets/dc-boundary.png)

## Distrust in two places

Our answer is to build distrust into two places.

Inside the workflow first. In the [RAG system I wrote about](/writing/rag-on-real-arabic-data), nothing is trusted on the first pass. Every stage verifies its own output, and the system refuses to answer when the retrieved context does not support it. The agent is never assumed to be right.

![Distrust inside the workflow: each stage verifies, and the system refuses to answer when the context does not support it](/writing-assets/dc-workflow.png)

Then at the boundary. That is what DefenseClaw is for.

## What DefenseClaw does

DefenseClaw, from [Cisco AI Defense](https://cisco-ai-defense.github.io/defenseclaw/), is the layer we run at that boundary. The simplest way to describe it is a firewall for agentic AI. It inspects every prompt, completion, and tool call an agent makes, and depending on how you set it, it observes, blocks the dangerous calls, or pauses for a human to approve. Prompt injection on the way in, data exfiltration on the way out, destructive commands in between.

It comes down to three questions: what is the agent allowed to do, what is it doing right now, and what did it do. Policy, runtime inspection, and an audit trail, sitting in a sidecar so the agent itself does not have to change.

What makes it worth running is that it is agent-agnostic. One adapter per agent, the same enforcement contract behind it, so the same controls apply whether the agent is Claude Code, Cursor, a Gemini or Copilot CLI, or my own Hermes agent. You are not hardening one tool, you are hardening the pattern. That matters, because we do not run just one agent, and before long nobody will.

![One contract, any agent: one adapter per agent into a single gateway, then out as ordinary audit trail](/writing-assets/dc-one-contract.png)

In practice it is mundane and specific. An `rm -rf` stopped before it runs. A prompt injection caught inside a fetched page. A command that tries to pipe a secret out, blocked or held for us to approve. It does not prove an agent is safe, nothing does, but it improves the odds and leaves evidence, which is the honest goal.

## Seeing what it caught

A firewall is only as useful as your ability to see what it stopped. DefenseClaw logs every prompt, tool call, finding, and approval decision, each tagged with a trace ID so you can follow a single decision across the whole pipeline.

Locally, that lands in a structured log and a bundled stack: Grafana dashboards fed by an OpenTelemetry collector, so we can watch connectors, findings, and human-in-the-loop approvals in real time on our own box. When we want it somewhere central, it ships to Splunk, either a local Splunk in Docker with prebuilt dashboards or an enterprise instance over HEC, with views for policy decisions and findings and SPL queries like blocked guardrail actions broken down by connector.

![Trace of a blocked call: prompt, tool call, finding, decision, and log, all under one trace ID](/writing-assets/dc-trace.png)

That last part is the shift I care about. Agent activity stops being a black box and becomes ordinary security telemetry, monitored and audited in the same SIEM as everything else.

## Why it matters

I am not cautious about AI because I dislike it. I build with it every day. I am cautious because we treat an AI agent the way we treat anything else with access to our systems: least privilege, and something watching the boundary. An agent being helpful is not a reason to assume it cannot be wrong, or be turned by something it read.

![Treat the agent like any identity: granted only what it needs, denied the rest, every call audited](/writing-assets/dc-identity.png)

## Takeaway

Agents are too useful to ignore, and they are getting more access, not less. So the boundary is where the work is. Watch what goes in, watch what comes out, and assume that on a long enough timeline, something will try to make a very capable assistant do something no one asked for.

How are you thinking about this as you give agents more to do? I would like to hear it.
