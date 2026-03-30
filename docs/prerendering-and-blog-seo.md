# Prerendering and Blog SEO

This site uses Vite + React for the app shell and a build-time prerender step to make the homepage, blog index, and every blog post crawlable in the initial HTML response.

## How prerendering works

- `npm run build` runs `vite build`
- `postbuild` runs `node prerender.mjs && node validate-prerender.mjs`
- `prerender.mjs` rewrites the generated `dist` output so important routes ship with real HTML content before deployment
- `validate-prerender.mjs` checks that the prerendered files contain visible text, internal links, and page-specific SEO tags

## What `prerender.mjs` does

- reads all markdown files in `src/content/posts`
- parses frontmatter and markdown body content
- prerenders these routes into `dist`:
  - `/`
  - `/blog`
  - `/blog/<slug>` for every post discovered in `src/content/posts`
- injects route-specific SEO tags:
  - `<title>`
  - meta description
  - canonical
  - Open Graph tags
  - JSON-LD structured data

## How each route is handled

- `/`: prerendered with meaningful visible copy for the hero, profile, capabilities, selected experience, timeline summary, credibility summary, blog preview, and contact section
- `/blog`: prerendered with a visible index title, intro text, and a linked list of all blog posts with titles, excerpts, and dates
- `/blog/<slug>`: prerendered as a full article page with article title, lead, body, subheadings, metadata, and internal related links

## How new posts are discovered automatically

- runtime blog data in `src/content/blogPosts.js` uses `import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true })`
- build-time prerendering in `prerender.mjs` reads `src/content/posts/*.md` directly from the filesystem
- because both steps discover posts from the folder automatically, no manual route registration is required for new posts

## Required frontmatter for new posts

Each post should include the same fields used by the current posts:

```md
---
id: '04'
slug: 'your-post-slug'
category: 'Ideas'
title: 'Your Post Title'
date: 'April 2026'
publishedAt: '2026-04-01'
readTime: '5 min read'
excerpt: 'Short summary used on cards and article lead.'
seoTitle: 'Your Post Title | Edgar Mancilla Sanchez'
seoDescription: 'Search and social description for the article.'
ogTitle: 'Your Post Title'
ogDescription: 'Open Graph description for the article.'
coverImage: '/blog/cover-image.svg'
coverAlt: 'Describe the cover image'
keywords:
  - 'keyword one'
  - 'keyword two'
insights:
  - 'Key idea one.'
  - 'Key idea two.'
---

# Your Post Title

Article body starts here.
```

Notes:

- the markdown file must live in `src/content/posts`
- the filename does not need to be registered anywhere else
- the `slug` becomes the route at `/blog/<slug>`
- `excerpt` is used in the blog index and as the article lead
- `seoTitle` and `seoDescription` become page-specific metadata
- `keywords` and `insights` are expected arrays
- the top-level markdown `# Title` is optional but recommended; the prerender step removes a duplicate title heading from the body when it matches the frontmatter `title`

## Publishing a new post

1. Add a new markdown file in `src/content/posts`
2. Fill in the required frontmatter fields
3. Write the article body in markdown
4. Run `npm run build`
5. Confirm the validator passes
6. Preview locally with `npm run preview` or `npm run firebase:serve`
7. Optionally inspect the generated HTML in:
   - `dist/blog/index.html`
   - `dist/blog/<slug>/index.html`
8. Deploy with `npm run deploy`

## Validation command

Use this command any time you want to confirm crawlability before deploy:

```bash
npm run build
```

The build already includes prerender validation. You can also run the validator directly against an existing `dist` build:

```bash
npm run validate:prerender
```

The validator checks that:

- `/` contains meaningful visible homepage text in initial HTML
- `/blog` contains visible post titles and internal links in initial HTML
- every `/blog/<slug>` page contains readable article content in initial HTML
- every prerendered route includes title, meta description, canonical, and Open Graph tags

## Firebase deployment behavior

- Firebase Hosting serves files from `dist`
- prerendered route files are written directly into `dist` before deploy
- the catch-all rewrite still supports the SPA, but existing prerendered files are available as static HTML responses for crawlers and browsers

## Stability guarantee for future posts

As long as a new post is added to `src/content/posts` with valid frontmatter, it will automatically:

- appear in the app data model
- get a prerendered route at `/blog/<slug>`
- appear in the prerendered blog index
- be linked internally from the blog index
- get page-specific SEO metadata
- be checked by the automated prerender validator before deploy
