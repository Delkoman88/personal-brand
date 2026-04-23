# Blog Post Creation Workflow

> This document defines the end-to-end process for creating blog posts for edgarmancilla.com.
> It covers the interview → draft → publish loop and the canonical post format.

---

## 1. The Workflow

Every post starts with a conversation, not a blank page.

### Step 1 — Edgar proposes a topic
Edgar names a topic, an angle, or a question he wants to explore.

### Step 2 — Claude asks 5–10 targeted questions
Before writing a single word of the post, Claude asks questions designed to surface:
- Edgar's direct experience or observation related to the topic
- A specific frustration, surprise, or pattern he's noticed in practice
- The angle that makes his take different from the generic explanation
- A concrete example, case, or decision that illustrates the idea
- How this changes something operationally or practically
- Any counterintuitive or non-obvious insight he holds
- The one thing he wants the reader to walk away thinking

Questions should feel like a sharp interview, not a form. The goal is to extract real opinion, real experience, and real voice — not generic thoughts on the topic.

### Step 3 — Edgar answers (as much or as little as he wants)
No format required. Stream of consciousness is fine. Claude will structure it.

### Step 4 — Claude drafts the full post
Based on Edgar's answers, Claude writes a complete, publish-ready post following the structure below.
The post must sound like Edgar: practical, reflexive, with criteria, without filler.

### Step 5 — Review and iterate
Edgar reads the draft. One or two rounds of revision. Then publish.

---

## 2. Canonical Post Structure

```markdown
---
id: '05'                          # Sequential — check existing posts to get next number
slug: 'post-slug-in-english'      # Lowercase, hyphenated, URL-safe
category: 'Operations'            # One of: Operations, AgTech, Compliance, Ideas, Systems, Traceability
title: 'Full Post Title'
date: 'April 2026'                # Human-readable month + year
publishedAt: '2026-04-22'         # ISO date — used for sorting and JSON-LD
readTime: '6 min read'            # Estimated (250 words/min)
excerpt: >
  Short summary in 1–2 lines. Used in blog cards and RSS. Should hook without giving everything away.
seoTitle: 'Full Post Title | Edgar Mancilla Sanchez'
seoDescription: >
  Meta description for search engines. Clear, natural, 140–160 characters.
  Written for humans, not bots.
coverImage: '/blog/cover-post-slug.svg'
coverAlt: 'Clear description of the cover image for screen readers'
keywords:
  - 'primary keyword'
  - 'secondary keyword'
  - 'tertiary keyword'
insights:
  - 'One-line key insight from the post.'
  - 'Another key idea, stated as a takeaway.'
  - 'A third insight if relevant.'
---

# Full Post Title

Opening paragraph with a clear hook.
Land the central idea fast. Sound like Edgar: practical, reflexive, with criteria, without filler.

## Why this matters

Explain why this topic matters in the real world.

- What problem it solves
- Why it's usually misunderstood
- What angle you're bringing to it

## What I've noticed in practice

Real observations, experience, patterns, or common errors.
Draw from:
- systems thinking
- operations and execution
- traceability and compliance
- urban agriculture and hydroponics
- workflow design and process improvement
- experimentation and iteration
- 3D printing and prototyping
- localized food systems
- venture building

## A more practical way to think about it

Your point of view. Don't just explain the topic —
propose a more useful way to understand, design, or implement it.

## What this changes operationally

Bring the idea down to execution:
- What decisions it improves
- What errors it prevents
- What processes it clarifies
- What you'd do differently from day one

## Final thought

Short, solid, identity-carrying close.
Not generic. Leave a clear idea about systems, execution, criteria, or applied innovation.
```

---

## 3. Frontmatter Field Reference

| Field | Required | Notes |
|---|---|---|
| `id` | ✅ | Sequential string ('01', '02'…). Check existing posts for next number. |
| `slug` | ✅ | URL slug in English, hyphenated. Must be unique. |
| `category` | ✅ | One of: Operations, AgTech, Compliance, Ideas, Systems, Traceability |
| `title` | ✅ | Full title of the post |
| `date` | ✅ | Human-readable: "April 2026" |
| `publishedAt` | ✅ | ISO 8601: "2026-04-22" |
| `readTime` | ✅ | Estimated at 250 words/min. Format: "6 min read" |
| `excerpt` | ✅ | 1–2 lines for blog cards and RSS feed |
| `seoTitle` | ✅ | Always ends with `\| Edgar Mancilla Sanchez` |
| `seoDescription` | ✅ | 140–160 chars. Natural language for humans. |
| `coverImage` | ✅ | Path from public root: `/blog/cover-slug.svg` |
| `coverAlt` | ✅ | Descriptive alt text for accessibility |
| `keywords` | ✅ | 3–6 keywords, lowercase |
| `insights` | ✅ | 2–4 one-line takeaways. Used in structured data. |

---

## 4. Voice and Tone Reference

Posts should sound like Edgar in a smart conversation:
- **Practical**: concrete over abstract, real examples over theory
- **Reflexive**: shows thinking process, not just conclusions
- **Criteria-driven**: has a point of view, defends it
- **No filler**: no "in today's fast-paced world", no vague closes
- Language: English for the post body (audience is international); Spanish is OK for tone and casual asides if natural

Recurring themes and domains (draw from freely):
- Operating systems for teams and organizations
- Traceability in food and agriculture
- Compliance as a design constraint, not a checkbox
- Urban agriculture, hydroponics, controlled environments
- Localized and regenerative food systems
- Venture building and early-stage operations
- Workflow design and decision architecture
- 3D printing and rapid prototyping
- Experimentation frameworks

---

## 5. Publishing Checklist

After the post is drafted and reviewed:

- [ ] All frontmatter fields filled (see table above)
- [ ] `id` is sequential and unique
- [ ] `slug` is URL-safe and unique
- [ ] `publishedAt` is the correct ISO date
- [ ] Cover image exists at the path specified in `coverImage`
- [ ] `seoDescription` is 140–160 characters
- [ ] Keywords are specific and intentional (not generic)
- [ ] Insights are standalone takeaways (readable out of context)
- [ ] Run `npm run build` (includes prerender + validation)
- [ ] Preview with `npm run preview` or `npm run firebase:serve`
- [ ] Deploy with `npm run deploy`

---

*Last updated: 2026-04-22*
