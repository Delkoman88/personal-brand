# edgarmancilla.com

## What This Project Is

This repository contains my personal brand website: a public-facing portfolio, AI agent services page (`/servicios`), bilingual CV (`/cv/en`, `/cv/es`), and blog (`Field Notes`) built to communicate my work at the intersection of applied AI, operations, compliance, AgTech, and systems thinking.

It is also a direct demonstration of my professional **vibe coding** workflow. I built this project end-to-end with AI integrated across the full delivery cycle: planning, structuring, copy iteration, design direction, motion engineering, implementation, testing, debugging, SEO hardening, and production release. The point is not that AI was used at some stage, but that I used it with criteria, orchestration, and engineering discipline to ship a real production website.

## Technologies Used

- **Frontend:** React 19 + Vite 8 (with route-level `React.lazy` code-splitting and Rolldown vendor chunking)
- **Routing:** `react-router-dom` v7 (including progressive View Transitions and catch-all 404 page)
- **Motion:** Native CSS motion system (`clip-path`, `::details-content`, `animation-timeline: scroll()`) + GSAP (`ScrollTrigger` + `@gsap/react`) for the desktop pinned `Selected Projects` showcase
- **Content system:** Markdown posts with YAML frontmatter
- **Markdown rendering:** `react-markdown` + `remark-gfm`
- **Comments:** Giscus via `@giscus/react`
- **Styling:** Unified dark blueprint CSS design system (`design-system.css` + `cv-page.css`) with CSS custom properties
- **Media:** Optimized WebP portrait, project, services, and experience assets
- **SEO pipeline:** custom `prerender.mjs`, `generate-feeds.mjs`, and `validate-prerender.mjs`
- **Discovery assets:** auto-generated `sitemap.xml` and `feed.xml`
- **Hosting:** Firebase Hosting via GitHub Actions CI/CD
- **Workflow:** AI-native, multi-model vibe coding from planning through production
