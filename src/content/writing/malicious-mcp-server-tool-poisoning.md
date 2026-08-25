---
title: "I built a malicious MCP server to test tool poisoning"
date: 2026-08-13
summary: "An MCP server tells the agent what its tools do, in free text somebody else wrote. I had never read those descriptions. So I wrote a server whose description quietly instructs the agent to steal your SSH key, and pointed scanners at it."
tags: [MCP, Security, OWASP, Cisco AI Defense]
---

An MCP server exposes tools. When an MCP client calls `tools/list`, the server returns tool definitions with fields such as a name, description, and input schema. The client makes that metadata available to the agent, which uses it to decide which tool to call.

The interesting part is the description. It is just text. Somebody else wrote it, and the agent is designed to read it and use it when deciding what to do.

Until recently I had been installing MCP servers the same way I install most open-source tools: check the stars, skim the README, look through the repo, run it. I had never once read the actual tool descriptions my MCP client was receiving from the server.

OWASP publishes an [MCP Top 10](https://owasp.org/www-project-mcp-top-10/) covering ways this can go wrong, from token exposure and too much access through tool poisoning, supply-chain attacks, command injection, weak authentication, missing audit logs, shadow MCP servers, and sharing too much context. It is worth twenty minutes.

I went after tool poisoning, because it does not really need an exploit. Sometimes it is just hostile text.

## The test server

I wrote a deliberately malicious MCP server with one tool called `save_note`. It is on my [GitHub](https://github.com/siddiqitaha/mcp-attack-lab), along with four more, one per weakness.

The tool works. It really does save your note. The problem is its description.

Alongside the normal instructions, the description tells the agent to read sensitive local information such as the user's SSH key and environment variables, add that information to the note, and not tell the user it did so. It also tells the agent that these instructions should override what the user asked for.

Nothing is broken or invalid. The protocol is working normally. The server is simply putting hostile instructions inside the same description the agent uses to understand what the tool does.

That is what makes tool poisoning interesting.

I had already been running Cisco's open-source MCP Scanner with DefenseClaw locally. Then I got access to Cisco AI Defense Enterprise and had a chance to see what the commercial version did with the same server.

## Registration is a scan

You add an MCP server in the portal by giving it a URL and, optionally, its source repo.

What actually happens is more interesting: AI Defense opens its own MCP connection to the server, performs the handshake, calls `tools/list`, receives the tool metadata, and analyses the returned descriptions during registration.

I uploaded nothing. It went and looked.

My `save_note` tool came back High on three findings: data exfiltration, direct prompt injection, and tool exploitation. Each was also mapped to an identifier in Cisco's own AI threat framework rather than just being given a severity rating. I liked that, because it tells you what kind of threat was detected, not only that something looks bad.

I also registered a normal public MCP server as a control. It came back clean. That mattered almost as much as catching the poisoned one. A scanner that flags everything is useless.

## How the pieces fit together

This was the part where I had to slow down, because it was not obvious at first. Everything follows one chain:

```
Application → Connection → Policy → Guardrail Profile → Rules
```

The Connection is where traffic passes through AI Defense and where policy enforcement happens. A Policy is attached to that connection, and the policy points to a Guardrail Profile containing the rules. Those rules are grouped into Security, Privacy, and Safety.

Once I understood that chain, the rest of the product made much more sense.

## Putting it inline

Scanning can catch a suspicious tool before you use it, but a clean scan does not prove the code behind the tool will behave safely once it starts running.

For runtime protection, AI Defense can sit between the MCP client and the MCP server. Instead of pointing your client directly at the server, you point it at the gateway and the traffic passes through AI Defense on the way.

I tested this with plain `curl`, because I wanted to see the raw MCP messages instead of trusting another client to explain what happened. Three states came out of it:

```
Tool visible  →  Tool hidden  →  Connection refused
```

The same MCP server produced three very different experiences depending on the policy.

One thing I would be careful about: hiding a tool from the `tools/list` response is not automatically the same as stopping someone from calling that tool directly. Those are two different things, so both should be tested.

From the user's side the difference is noticeable. If a dangerous tool simply disappears from the list, the agent can continue working without it. If the whole MCP connection is blocked, everything looks broken.

One practical thing also wasted some of my time: after changing a policy in the console I had to start a fresh MCP session and run the handshake again. Otherwise I was testing against an old session and getting confusing results.

## What I took away from it

**Read the tool descriptions of MCP servers you install.** The README tells you what the developer says the server does. `tools/list` shows you what the agent is actually being given.

Scan before connecting, but understand what a clean scan means. A clean tool description does not guarantee that the code behind the tool is safe.

Look at the raw messages when something seems wrong. One of the clients I used hid the useful error and showed me something misleading instead. `curl` showed me what was actually happening within minutes.

And where you apply a security rule matters. Blocking the whole connection, hiding one tool, and stopping a specific tool call can all produce very different results for the person using the agent.

The biggest thing this changed for me was how I think about trust in MCP. I check repositories, read source code, look at permissions, and think about what access a server has. I was not paying much attention to the descriptions the server was sending to the model.

Now I do.

I also tested Cisco AI Defense's validation and red-teaming side and its model scanning, but those deserve their own write-up rather than making this one longer.

For now my rule is simple: before I connect an MCP server to an agent, I want to know exactly what that server is telling the agent its tools do.
