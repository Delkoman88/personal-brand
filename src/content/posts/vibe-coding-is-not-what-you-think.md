---
id: '04'
slug: 'vibe-coding-is-not-what-you-think'
category: 'Systems'
title: 'Vibe coding is not what you think'
date: 'April 2026'
publishedAt: '2026-04-22'
readTime: '7 min read'
excerpt: 'Everyone has an opinion on vibe coding. Most of them are wrong. Here is what it actually takes to build real things with AI — and why the barrier it removes is not the one people think.'
seoTitle: 'Vibe Coding Is Not What You Think | Edgar Mancilla Sanchez'
seoDescription: 'Vibe coding is not about letting AI do everything. It is a structured, context-driven approach to building real systems. Here is what it actually requires.'
coverImage: '/blog/cover-vibe-coding.svg'
coverAlt: 'Abstract cover image for an article about vibe coding and AI-assisted development'
keywords:
  - 'vibe coding'
  - 'AI development'
  - 'AI-assisted programming'
  - 'LLM coding'
  - 'systems thinking'
insights:
  - 'Vibe coding is not about zero knowledge — it is about shifting what knowledge matters.'
  - 'The AI is your execution engine. Context, structure, and problem decomposition are still yours.'
  - 'The real barrier that vibe coding removes is not syntax — it is the fear of starting.'
  - 'Knowing how to talk to an LLM is a skill. Most people underestimate how much it determines the quality of the output.'
---

# Vibe coding is not what you think

I started doing what people now call vibe coding about two years ago, before anyone had given it that name. I was not a developer. I had basic to intermediate Python knowledge and a job title that said Strategy & Operations. What I had was a problem that code could solve and no patience for waiting months to hire someone to solve it for me.

So I opened ChatGPT, described the architecture of my database, explained what I needed the script to do, and started building. Copy, paste, test, debug with the same tool, repeat. No IDE shortcuts, no CLI agents, no Cursor. Just a chat window and a clear enough picture of what I was trying to accomplish.

That primitive version of vibe coding cut months of development down to weeks. It shipped. It worked. It had real operational impact. And it taught me something most of the current discourse gets completely wrong.

## Why this matters

Vibe coding has become one of those terms that gets distorted the moment it gets popular. On one side you have people claiming it democratizes software development for everyone, no knowledge required. On the other you have developers insisting it produces garbage code that nobody should trust in production. Both camps are arguing about a version of vibe coding that does not really exist.

The real version — the one that actually produces working systems — requires more from you than either side admits. And the thing it requires is not what you would expect.

## What I have noticed in practice

The most common mistake I see is treating vibe coding as a delegation problem. You hand off the task to the AI and wait for the output. That is not vibe coding. That is wishful thinking with extra steps.

What actually works looks different. Before I write a single prompt, I spend time on structure: what is this system supposed to do, what are its inputs and outputs, how does it connect to other systems, what are the failure modes I cannot afford. I maintain briefing files by model. I build persistent context so the AI understands the architecture, not just the immediate task. I treat the LLM as an execution engine, not as a collaborator who already knows what I know.

This changes the nature of the work dramatically. The AI handles the parts that used to require memorizing syntax and looking up Stack Overflow. I handle problem decomposition, architectural decisions, and knowing when the output is wrong even if it looks right. That last one matters more than people realize. You have to be able to read the code at a systems level — not write every line from scratch, but understand what it is doing and whether it makes sense for the problem.

The other thing I have noticed: vibe coding makes you a more disciplined thinker. If you cannot explain a system clearly enough for an LLM to implement it, you do not understand the system well enough yet. That feedback loop is brutal and useful.

## A more practical way to think about it

Vibe coding is programming guided by knowledge, structure, objective definition, intuition, common sense, and outcome — using AI as a copilot to accelerate both learning and execution, and to remove blockers that used to be tied to the developer's prior knowledge.

That definition matters because it puts the human back in the loop in the right place. The AI accelerates. You direct.

The barrier it removes is not the need to understand systems. You still need to understand systems. You still need to know how to decompose a problem, how databases relate to each other, what a function is supposed to do before you ask for one. What it removes is the need to hold all the syntax, all the libraries, all the implementation details in your head. That is a real and significant removal. But it is not the same as removing the need to think.

When someone who has never written code says vibe coding makes them a developer, I think they are partially right and mostly wrong. It is the beginning of becoming a developer. The real skill shift is learning to communicate precisely with a system that takes you literally. That is not nothing. That is actually a foundational engineering skill dressed in different clothes.

## What this changes operationally

In practice, this means a few things worth being specific about.

Development cycles compress dramatically. Work that used to take months takes weeks. Work that took weeks takes days. This is not marketing language — I built production scripts at Tryp as an Operations Manager that would have taken a backend developer six to eight weeks to scope and ship. We did it in under two. That changes what is even worth attempting.

But the compression only holds if your context is good. An under-specified prompt to an LLM produces an under-specified system. You end up debugging something you did not design, which is the worst version of the problem. The projects that go wrong with vibe coding almost always go wrong in the briefing stage, not the implementation stage.

The discipline of writing clear context for AI ends up improving the discipline of how you think about systems generally. You cannot be vague with an LLM and expect a precise output. That constraint, once internalized, makes you better at every form of communication about technical work.

On the question of trust in high-stakes systems — traceability, compliance, critical operations — the answer is not "trust the AI" or "never trust AI-generated code." The answer is: use the same AI to understand what you do not understand. The tool that writes the code can explain it. The tool that flags a bug can help you trace why it happened. Not understanding something is no longer a terminal blocker. It is a question you have not asked yet.

## Final thought

Most of the debate about vibe coding is a debate about the wrong thing. The question is not whether AI can write code. It can. The question is whether you can give it something worth building.

The developers who dismiss it are usually imagining someone with no context and no structure pointing at a vague idea. The enthusiasts are usually imagining something closer to magic than what actually happens in practice. Both are missing what makes it genuinely powerful: the combination of human judgment at the architectural level and AI capability at the implementation level.

The programming languages that came before this were always trying to get closer to natural language. Vibe coding is not the end of that trajectory. It is just the latest, fastest step.

The limiting factor was never syntax. It was always clarity of thought.
