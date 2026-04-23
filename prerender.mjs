import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readPosts } from './src/utils/markdown.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const POSTS_DIR = path.join(__dirname, 'src/content/posts');
const SITE_URL = 'https://edgarmancilla.com';
const SITE_NAME = 'Edgar Mancilla Sanchez';
const SITE_DESCRIPTION = 'Biotech PhD designing operational systems for complex and regulated environments. Strategy and operations, compliance and market readiness, traceability, quality systems, automation, and AgTech.';



function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const NO_TRANSLATE_PATTERN = /(\s*\bvibe\s+cod(?:ing|e|er|ers)?\b[.,;:!?]*\s*)/gi;

function wrapNoTranslateStatic(html) {
  if (!html) return html;
  return String(html).replace(NO_TRANSLATE_PATTERN, '<span translate="no">$1</span>');
}

function inlineMd(text) {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  html = html.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
  html = wrapNoTranslateStatic(html);
  return html;
}

function mdToHtml(markdown) {
  const lines = markdown.split('\n');
  const output = [];
  let paragraphLines = [];
  let listItems = [];

  function flushParagraph() {
    if (!paragraphLines.length) {
      return;
    }

    output.push(`<p>${inlineMd(paragraphLines.join(' '))}</p>`);
    paragraphLines = [];
  }

  function flushList() {
    if (!listItems.length) {
      return;
    }

    output.push(`<ul>${listItems.map((item) => `<li>${inlineMd(item)}</li>`).join('')}</ul>`);
    listItems = [];
  }

  lines.forEach((line) => {
    const trimmed = line.trim();
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)/);
    const listMatch = trimmed.match(/^[-*]\s+(.+)/);

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      output.push(`<h${level}>${inlineMd(headingMatch[2])}</h${level}>`);
      return;
    }

    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
      return;
    }

    paragraphLines.push(trimmed);
  });

  flushParagraph();
  flushList();

  return output.join('\n');
}



const BASE_HTML = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function stripDefaultHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<link\s[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s[^>]*name="description"[^>]*>/gi, '')
    .replace(/<meta\s[^>]*name="keywords"[^>]*>/gi, '')
    .replace(/<meta\s[^>]*name="robots"[^>]*>/gi, '')
    .replace(/<meta\s[^>]*name="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s[^>]*property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<script\s[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');
}

function injectPage({ outputPath, head, body }) {
  let html = stripDefaultHead(BASE_HTML);
  html = html.replace('</head>', `${head}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const fullOutputPath = path.join(DIST, outputPath);
  fs.mkdirSync(path.dirname(fullOutputPath), { recursive: true });
  fs.writeFileSync(fullOutputPath, html, 'utf8');
}

function buildHead({ title, description, pathName, keywords = [], type = 'website', image = '/og-image.png', twitterSite, structuredData }) {
  const canonicalUrl = `${SITE_URL}${pathName}`;
  const imageUrl = `${SITE_URL}${image}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const twitterSiteTag = twitterSite
    ? `\n    <meta name="twitter:site" content="${escapeHtml(twitterSite)}" />`
    : '';

  return `
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords.join(', '))}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:title" content="${escapeHtml(fullTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />

    <meta name="twitter:card" content="summary_large_image" />${twitterSiteTag}
    <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />

    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
}

function buildHomePage(posts) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Field Notes',
      url: `${SITE_URL}/#blog`,
      description: 'Essays, notes, ideas, projects, and general interests by Edgar Mancilla Sanchez.',
      author: {
        '@type': 'Person',
        name: SITE_NAME
      },
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.publishedAt,
        articleSection: post.category,
        description: post.excerpt,
        url: `${SITE_URL}/blog/${post.slug}`
      }))
    }
  ];

  const head = buildHead({
    title: 'Edgar Mancilla Sanchez | Biotech PhD | Systems, Compliance & AgTech',
    description: SITE_DESCRIPTION,
    pathName: '/',
    image: '/og-image.png',
    twitterSite: '@urbanbeautygarden',
    keywords: ['Edgar Mancilla Sanchez', 'biotech phd', 'systems', 'compliance', 'AgTech', 'strategy and operations', 'traceability', 'quality systems', 'automation'],
    structuredData
  });

  const latestPosts = posts.slice(0, 3).map((post) => `
            <article class="blog-index-card">
              <a href="/blog/${escapeHtml(post.slug)}" class="blog-card-cover-link" aria-label="Open article ${escapeHtml(post.title)}">
                <img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.coverAlt)}" class="blog-card-cover" />
              </a>
              <div class="blog-article-eyebrow">
                <span class="label-text" style="color: var(--primary-container)">${escapeHtml(post.category)}</span>
                <time class="label-text" dateTime="${escapeHtml(post.publishedAt)}" style="color: var(--outline)">${escapeHtml(post.date)} // ${escapeHtml(post.readTime)}</time>
              </div>
              <div style="display: grid; gap: 0.75rem;">
                <h3 style="margin: 0; font-size: 1.45rem;">${wrapNoTranslateStatic(escapeHtml(post.title))}</h3>
                <p style="color: var(--on-surface-variant); margin: 0.5rem 0 0; font-size: 1.05rem;">
                  ${wrapNoTranslateStatic(escapeHtml(post.excerpt))}</p>
              </div>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="/blog/${escapeHtml(post.slug)}" class="btn-primary">Read article</a>
                <a href="/blog" class="btn-secondary">Browse all posts</a>
              </div>
            </article>`).join('');

  const body = `
    <main>
      <section class="bg-lowest grid-blueprint hero-section" style="min-height: 100vh; display: flex; align-items: center; padding-top: 80px; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -10%; left: -10%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, rgba(19, 19, 19, 0) 70%); z-index: 0; pointer-events: none;"></div>
        <div class="container hero-layout" style="position: relative; z-index: 1; display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 4rem; flex-wrap: wrap;">
          <div class="hero-copy" style="flex: 1 1 500px;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
              <div style="width: 40px; height: 2px; background-color: var(--primary-container);"></div>
              <span class="label-text" style="color: var(--on-surface-variant);">Vibe Coder · AI-Native Builder · Ops Architect</span>
            </div>
            <h1 style="margin-bottom: 1.5rem;">Biotech PhD. Building <span class="text-accent-cyan" style="display: inline-block;">AI-native products</span> for complex environments.</h1>
            <p style="font-size: 1.125rem; color: var(--on-surface-variant); margin-bottom: 2rem; max-width: 600px;">Operating at the intersection of science, product, and execution. I use AI as an execution engine to turn ambiguous problems into real, shipped software — fast.</p>
            
            <div style="display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--outline-variant);">
              <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                <span style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; color: var(--primary-container); line-height: 1;">3</span>
                <span class="label-text" style="font-size: 0.68rem; color: var(--on-surface-variant);">Products in production</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                <span style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; color: var(--primary-container); line-height: 1;">10+</span>
                <span class="label-text" style="font-size: 0.68rem; color: var(--on-surface-variant);">AI models in workflow</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                <span style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; color: var(--primary-container); line-height: 1;">12+</span>
                <span class="label-text" style="font-size: 0.68rem; color: var(--on-surface-variant);">Years building ventures</span>
              </div>
            </div>

            <div class="hero-signal-grid">
              <span class="hero-signal-pill">Vibe Coder</span>
              <span class="hero-signal-pill">AI Builder</span>
              <span class="hero-signal-pill">AgTech</span>
              <span class="hero-signal-pill">Compliance</span>
            </div>
            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
              <a href="https://linktr.ee/delkoman" target="_blank" rel="noopener noreferrer" class="btn-primary">Connect on Linktree</a>
              <a href="#projects" class="btn-secondary">View Projects</a>
            </div>
          </div>
          <div class="hero-visual" style="flex: 1 1 300px; display: flex; justify-content: center;">
            <div class="hero-portrait" style="position: relative; width: 100%; max-width: 400px; aspect-ratio: 3/4; background-color: var(--surface-high); border: 1px solid var(--outline-variant);">
              <div style="position: absolute; top: -1px; left: -1px; width: 10px; height: 10px; border-top: 2px solid var(--primary-container); border-left: 2px solid var(--primary-container); z-index: 2;"></div>
              <div style="position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px; border-bottom: 2px solid var(--primary-container); border-right: 2px solid var(--primary-container); z-index: 2;"></div>
              <img src="/profile.jpg" alt="Edgar Mancilla Sanchez" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(60%) contrast(1.1) brightness(0.9); mix-blend-mode: lighten;" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="section-spacing bg-surface">
        <div class="container">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem;">
            <span class="label-text" style="color: var(--primary-container);">01 // Profile</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px;">
            <h2 style="font-size: clamp(2rem, 3vw, 2.5rem); color: var(--on-surface);">I am an interdisciplinary professional navigating the complex intersections of science, technology, and operational realities.</h2>
            <div style="padding-left: 2rem; border-left: 2px solid var(--outline-variant);">
              <p style="font-size: 1.125rem; color: var(--on-surface-variant); margin-bottom: 1.5rem;">My background as a Biotech PhD provided the analytical rigor. My experience in high-growth operational environments and regulated industries built the strategic execution. I am a hands-on builder, systems-oriented, and execution-heavy.</p>
              <p style="font-size: 1.125rem; color: var(--on-surface-variant);">I work at the intersection of <span style="color: var(--on-surface);">product, operations, and AI execution</span> — using vibe coding and multi-model workflows to turn ambiguous problems into real, shipped software while keeping the process discipline that complex environments demand.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" class="section-spacing-top bg-low">
        <div class="container" style="display: grid; gap: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="label-text" style="color: var(--primary-container);">02 // Core Capabilities</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <p style="max-width: 800px; margin: 0; color: var(--on-surface-variant); font-size: 1.05rem;">AI-Native Product Development, strategy and operations, compliance and market readiness, traceability, documentation, quality systems, automation, AgTech, and cross-functional implementation.</p>
          
          <div style="margin-top: 3.5rem; padding-top: 3rem; border-top: 1px solid var(--outline-variant);">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
              <span class="label-text" style="color: var(--primary-container); white-space: nowrap;">AI Toolchain</span>
              <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
            </div>
            <p style="font-size: 0.95rem; color: var(--on-surface-variant); line-height: 1.8; border-left: 2px solid rgba(0, 245, 255, 0.3); padding-left: 1rem; font-style: italic; margin-bottom: 1.5rem; max-width: 640px;">
              "I use AI as an execution system, not autocomplete. My workflow includes persistent briefing files per model and context systems that guide implementation, debugging, and architectural decisions."
            </p>
            <div class="mobile-scroll-shell">
              <div class="mobile-scroll-indicator">
                <span class="label-text">Swipe to see more tools</span>
              </div>
              <div class="mobile-scroll-cue" aria-hidden="true">
                <span class="mobile-scroll-arrow">&larr;</span>
                <span class="mobile-scroll-arrow">&rarr;</span>
              </div>
              <div class="ai-toolchain-grid">
                <div class="project-item" style="padding: 1.5rem; border: 1px solid var(--outline-variant); background-color: rgba(28, 27, 27, 0.4);">
                  <span class="label-text" style="font-size: 0.65rem; color: var(--outline); display: block; margin-bottom: 0.6rem;">Anthropic / Claude</span>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🟣</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Claude Sonnet</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Architecture · Complex code · QA</span></div></div>
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🟣</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Claude Code</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Agentic CLI coding</span></div></div>
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🟣</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Claude Cowork</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Agent orchestration</span></div></div>
                  </div>
                </div>
                <div class="project-item" style="padding: 1.5rem; border: 1px solid var(--outline-variant); background-color: rgba(28, 27, 27, 0.4);">
                  <span class="label-text" style="font-size: 0.65rem; color: var(--outline); display: block; margin-bottom: 0.6rem;">OpenAI</span>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🟢</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">ChatGPT</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Ideation · Drafts · Second opinion</span></div></div>
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🟢</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Codex</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Code generation</span></div></div>
                  </div>
                </div>
                <div class="project-item" style="padding: 1.5rem; border: 1px solid var(--outline-variant); background-color: rgba(28, 27, 27, 0.4);">
                  <span class="label-text" style="font-size: 0.65rem; color: var(--outline); display: block; margin-bottom: 0.6rem;">Google & Local</span>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🔵</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Gemini</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Cross-review · Long context</span></div></div>
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🟠</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Google Antigravity</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Agentic coding · Full-stack execution</span></div></div>
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🔵</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">NotebookLM</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Research synthesis · Knowledge base</span></div></div>
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🎨</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Stitch</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">UI design & prototyping</span></div></div>
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">⚙️</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Qwen Code 2.5 7B</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Local inference · Offline tasks</span></div></div>
                  </div>
                </div>
                <div class="project-item" style="padding: 1.5rem; border: 1px solid var(--outline-variant); background-color: rgba(28, 27, 27, 0.4);">
                  <span class="label-text" style="font-size: 0.65rem; color: var(--outline); display: block; margin-bottom: 0.6rem;">Context & Knowledge</span>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">🪨</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Obsidian</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Context management · Knowledge base</span></div></div>
                    <div class="ai-tool-chip"><span style="font-size: 0.9rem;">📋</span><div style="display: flex; flex-direction: column; gap: 0.1rem;"><span style="font-size: 0.82rem; color: var(--on-surface); font-weight: 500;">Notion</span><span style="font-size: 0.65rem; color: var(--on-surface-variant); font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.04em;">Product HQ · Documentation</span></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section id="projects" class="section-spacing-bottom bg-low">
        <div class="container">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 4rem;">
            <span class="label-text" style="color: var(--primary-container);">03 // Vibe Coding - Shipped Projects</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <div class="mobile-scroll-shell">
            <div class="mobile-scroll-indicator">
              <span class="label-text">Swipe to see more projects</span>
            </div>
            <div class="mobile-scroll-cue" aria-hidden="true">
              <span class="mobile-scroll-arrow">&larr;</span>
              <span class="mobile-scroll-arrow">&rarr;</span>
            </div>
            <div class="projects-list">
              
              <div class="project-item" style="position: relative; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; align-items: start; align-content: start; padding-left: 2rem; border-left: 2px solid var(--outline-variant);">
                <div style="position: absolute; top: 0; left: -6px; width: 10px; height: 10px; background-color: var(--primary-container);"></div>
                
                <div class="project-copy" style="display: flex; flex-direction: column; gap: 1.5rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
                    <div>
                      <h3 style="margin: 0 0 0.3rem 0; font-size: 1.45rem;">Beauty Studio Copilot</h3>
                      <span class="label-text" style="font-size: 0.68rem; color: var(--on-surface-variant);">Solo Builder · Product Engineer · LATAM · 2026 — Present</span>
                    </div>
                    <a href="https://beauty-studio-copilot--beauty-studio-copilot.us-east4.hosted.app" target="_blank" rel="noopener noreferrer" class="project-live-badge"><span class="project-live-dot" style="background-color: var(--primary-container);"></span>Live — View project →</a>
                  </div>
                  
                  <p style="color: var(--on-surface-variant); font-size: 1rem; line-height: 1.75; margin: 0;">SaaS platform for beauty studios — built solo from zero to production and validated by a real user today. Replaces fragmented WhatsApp + Google Sheets workflows with a structured operating system for beauty businesses.</p>
                  
                  <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <div class="project-highlight-chip"><span style="color: var(--primary-container); font-weight: 700; font-size: 1rem; font-family: var(--font-display);">20+</span><span>features in prod</span></div>
                    <div class="project-highlight-chip"><span style="color: var(--primary-container); font-weight: 700; font-size: 1rem; font-family: var(--font-display);">45+</span><span>unit tests</span></div>
                    <div class="project-highlight-chip"><span style="color: var(--primary-container); font-weight: 700; font-size: 1rem; font-family: var(--font-display);">1</span><span>solo builder</span></div>
                  </div>
                  
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="font-size: 0.875rem; color: var(--on-surface-variant); line-height: 1.7; padding: 0.2rem 0 0.2rem 1.1rem; position: relative;"><span style="position: absolute; left: 0; color: var(--primary-container); font-weight: 700;">›</span>Full management system: multi-tenant auth, client CRM, Google Calendar sync, assisted messaging (WhatsApp), loyalty system, checkout & finances, multi-staff with roles, KPI dashboards, automated reminders, and mobile-first UX.</li>
                    <li style="font-size: 0.875rem; color: var(--on-surface-variant); line-height: 1.7; padding: 0.2rem 0 0.2rem 1.1rem; position: relative;"><span style="position: absolute; left: 0; color: var(--primary-container); font-weight: 700;">›</span>Full product ownership: definition, UX decisions, implementation, backlog management, debugging, and continuous iteration.</li>
                    <li style="font-size: 0.875rem; color: var(--on-surface-variant); line-height: 1.7; padding: 0.2rem 0 0.2rem 1.1rem; position: relative;"><span style="position: absolute; left: 0; color: var(--primary-container); font-weight: 700;">›</span>Production monitoring with Sentry, 45+ unit tests, strict TypeScript and ESLint — no shortcuts.</li>
                  </ul>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem;">
                    <span class="project-stack-badge">Next.js App Router</span>
                    <span class="project-stack-badge">TypeScript</span>
                    <span class="project-stack-badge">Firebase Auth</span>
                    <span class="project-stack-badge">Firestore</span>
                    <span class="project-stack-badge">Cloud Functions</span>
                    <span class="project-stack-badge">Google Calendar API</span>
                    <span class="project-stack-badge">OAuth2</span>
                    <span class="project-stack-badge">Twilio</span>
                    <span class="project-stack-badge">SendGrid</span>
                    <span class="project-stack-badge">Sentry</span>
                  </div>
                </div>

                <div class="project-visual" style="position: relative; width: 100%; aspect-ratio: 16/9; border: 1px solid var(--outline-variant); background-color: var(--surface-lowest); overflow: hidden;">
                  <div style="position: absolute; top: -1px; left: -1px; width: 10px; height: 10px; border-top: 2px solid var(--primary-container); border-left: 2px solid var(--primary-container); z-index: 2;"></div>
                  <div style="position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px; border-bottom: 2px solid var(--primary-container); border-right: 2px solid var(--primary-container); z-index: 2;"></div>
                  <img src="/project-beauty.png" alt="Beauty Studio Copilot project screenshot" translate="no" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(15%) contrast(1.1) brightness(0.9); mix-blend-mode: lighten;" />
                </div>
              </div>

              <div class="project-item" style="position: relative; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; align-items: start; align-content: start; padding-left: 2rem; border-left: 2px solid var(--outline-variant);">
                <div style="position: absolute; top: 0; left: -6px; width: 10px; height: 10px; background-color: #f59e0b;"></div>
                
                <div class="project-copy" style="display: flex; flex-direction: column; gap: 1.5rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
                    <div>
                      <h3 style="margin: 0 0 0.3rem 0; font-size: 1.45rem;">Viajero Sediento</h3>
                      <span class="label-text" style="font-size: 0.68rem; color: var(--on-surface-variant);">Product Builder · Real client · 2026</span>
                    </div>
                    <a href="https://sitioviajerosediento--sitioviajerosediento.us-central1.hosted.app" target="_blank" rel="noopener noreferrer" class="project-live-badge"><span class="project-live-dot" style="background-color: #f59e0b;"></span>Live — View project →</a>
                  </div>
                  
                  <p style="color: var(--on-surface-variant); font-size: 1rem; line-height: 1.75; margin: 0;">Mobile-first digital catalog and admin platform for a real tap room — Nordic aesthetic, individual beer sheets, full CRUD with image upload and state management. Staff uses the admin panel daily in operations.</p>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem;">
                    <span class="project-stack-badge">Next.js</span>
                    <span class="project-stack-badge">TypeScript</span>
                    <span class="project-stack-badge">Firebase Auth</span>
                    <span class="project-stack-badge">Firestore</span>
                    <span class="project-stack-badge">Firebase Storage</span>
                    <span class="project-stack-badge">App Hosting</span>
                  </div>
                </div>

                <div class="project-visual" style="position: relative; width: 100%; aspect-ratio: 16/9; border: 1px solid var(--outline-variant); background-color: var(--surface-lowest); overflow: hidden;">
                  <div style="position: absolute; top: -1px; left: -1px; width: 10px; height: 10px; border-top: 2px solid #f59e0b; border-left: 2px solid #f59e0b; z-index: 2;"></div>
                  <div style="position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px; border-bottom: 2px solid #f59e0b; border-right: 2px solid #f59e0b; z-index: 2;"></div>
                  <img src="/project-viajero.png" alt="Viajero Sediento project screenshot" translate="no" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(15%) contrast(1.1) brightness(0.9); mix-blend-mode: lighten;" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section id="experience" class="section-spacing bg-surface">
        <div class="container" style="display: grid; gap: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="label-text" style="color: var(--primary-container);">04 // Selected Experience</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <div style="display: grid; gap: 1.25rem; max-width: 980px;">
            <article style="padding-left: 1.25rem; border-left: 2px solid var(--outline-variant);">
              <h3 style="margin: 0 0 0.5rem;">TRYP Mexico</h3>
              <p style="margin: 0; color: var(--on-surface-variant);">Operations and process standardization across three distribution centers, with reporting workflows, vendor onboarding, automation, and quality/compliance coordination.</p>
            </article>
            <article style="padding-left: 1.25rem; border-left: 2px solid var(--outline-variant);">
              <h3 style="margin: 0 0 0.5rem;">TraceLab Consulting</h3>
              <p style="margin: 0; color: var(--on-surface-variant);">Business strategy, operations, compliance, and market readiness for early-stage and growth-stage brands translating technical and regulatory needs into practical systems.</p>
            </article>
            <article style="padding-left: 1.25rem; border-left: 2px solid var(--outline-variant);">
              <h3 style="margin: 0 0 0.5rem;">Urbn Leaves</h3>
              <p style="margin: 0; color: var(--on-surface-variant);">AgTech venture focused on urban agriculture, hydroponics, controlled-environment systems, traceability, and decentralized food production.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="timeline" class="section-spacing bg-low">
        <div class="container" style="display: grid; gap: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="label-text" style="color: var(--primary-container);">05 // Historical Timeline</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <p style="max-width: 820px; margin: 0; color: var(--on-surface-variant);">Recent timeline highlights include TraceLab Consulting, Tryp Mexico, Urbn Leaves, Baja Biotech, academic research, and INC Research / Syneos Health.</p>
        </div>
      </section>

      <section id="credibility" class="section-spacing bg-surface grid-blueprint">
        <div class="container" style="display: grid; gap: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="label-text" style="color: var(--primary-container);">06 // Credibility & Substance</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <p style="max-width: 860px; margin: 0; color: var(--on-surface-variant);">Core themes across the work include AI-native product development, vibe coding & multi-model orchestration, solo builder — zero to production, context engineering & structured AI workflows, operations & process standardization, compliance & regulatory systems, traceability & documentation, AgTech & urban agriculture, and startup & high-growth environments.</p>
        </div>
      </section>

      <section id="blog" class="section-spacing bg-lowest grid-blueprint">
        <div class="container" style="display: grid; gap: 3rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="label-text" style="color: var(--primary-container);">06 // Field Notes</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <div style="display: grid; gap: 1rem; max-width: 760px;">
            <h2 style="margin: 0;">A space to publish ideas, curiosities, and things I genuinely like.</h2>
            <p style="margin: 0; color: var(--on-surface-variant); font-size: 1.05rem;">This section is more open: essays, notes, references, personal interests, work reflections, and whatever feels worth sharing at the moment.</p>
          </div>
          <section class="blog-index-grid" aria-label="Latest blog posts">${latestPosts}</section>
        </div>
      </section>

      <section id="contact" class="section-spacing bg-lowest contact-section" style="border-top: 1px solid var(--outline-variant);">
        <div class="container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div style="width: 40px; height: 2px; background-color: var(--primary-container); margin-bottom: 2rem;"></div>
          <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Ready to build something real?</h2>
          <p style="color: var(--on-surface-variant); font-size: 1.125rem; max-width: 600px; margin-bottom: 3rem;">Whether you need an AI-native product built from scratch, want to structure an early-stage startup with solid operational systems, or want to explore how vibe coding can accelerate your execution. Let&#39;s work.</p>
          <div class="contact-actions" style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
            <a href="https://linktr.ee/delkoman" target="_blank" rel="noopener noreferrer" class="btn-primary">Connect via Linktree</a>
            <a href="mailto:delkoman@gmail.com" class="btn-secondary">Send an Email</a>
          </div>
        </div>
      </section>
    </main>`;

  injectPage({ outputPath: 'index.html', head, body });
  console.log('✓ prerendered /');
}

function buildBlogIndexPage(posts) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Field Notes',
    url: `${SITE_URL}/blog`,
    description: 'Essays, notes, ideas, projects, and general interests by Edgar Mancilla Sanchez.',
    author: {
      '@type': 'Person',
      name: SITE_NAME
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.publishedAt,
      articleSection: post.category,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`
    }))
  };

  const head = buildHead({
    title: `Blog | ${SITE_NAME}`,
    description: 'Read essays, notes, ideas, projects, and general interests by Edgar Mancilla Sanchez.',
    pathName: '/blog',
    image: '/blog/cover-ideas.svg',
    keywords: ['blog', 'essays', 'ideas', 'writing', 'Edgar Mancilla Sanchez'],
    structuredData
  });

  const cards = posts.map((post) => `
            <article class="blog-index-card">
              <a href="/blog/${escapeHtml(post.slug)}" class="blog-card-cover-link" aria-label="Open article ${escapeHtml(post.title)}">
                <img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.coverAlt)}" class="blog-card-cover" />
              </a>
              <div class="blog-article-eyebrow">
                <span class="label-text" style="color: var(--primary-container)">${escapeHtml(post.category)}</span>
                <time class="label-text" dateTime="${escapeHtml(post.publishedAt)}" style="color: var(--outline)">${escapeHtml(post.date)} // ${escapeHtml(post.readTime)}</time>
              </div>
              <div style="display: grid; gap: 0.75rem;">
                <h2 style="margin: 0; font-size: 1.6rem;">${wrapNoTranslateStatic(escapeHtml(post.title))}</h2>
                <p style="color: var(--on-surface-variant); margin: 0.5rem 0 0; font-size: 1.1rem; line-height: 1.6;">
                  ${wrapNoTranslateStatic(escapeHtml(post.excerpt))}</p>
              </div>
              <div class="blog-index-tags">${post.keywords.slice(0, 3).map((keyword) => `<span class="blog-keyword-chip">${escapeHtml(keyword)}</span>`).join('')}</div>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="/blog/${escapeHtml(post.slug)}" class="btn-primary">Read article</a>
                <a href="/#blog" class="btn-secondary">Home</a>
              </div>
            </article>`).join('');

  const body = `
    <main class="section-spacing bg-lowest grid-blueprint" style="min-height: 100vh; padding-top: 8rem;">
      <div class="container" style="display: grid; gap: 3rem;">
        <div style="display: grid; gap: 1rem; max-width: 760px;">
          <span class="label-text" style="color: var(--primary-container);">Field Notes</span>
          <h1 style="margin: 0;">A running collection of essays, notes, interests, and observations.</h1>
          <p style="margin: 0; color: var(--on-surface-variant); font-size: 1.05rem;">This is the full blog index: a place for practical thinking, personal curiosities, projects, references, and whatever feels worth publishing.</p>
        </div>
        <section class="blog-index-grid" aria-label="Blog posts index">${cards}
        </section>
      </div>
    </main>`;

  injectPage({ outputPath: 'blog/index.html', head, body });
  console.log('✓ prerendered /blog');
}

function buildBlogPostPages(posts) {
  posts.forEach((post) => {
    const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 2);
    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      articleSection: post.category,
      keywords: post.keywords,
      image: `${SITE_URL}${post.coverImage}`,
      author: {
        '@type': 'Person',
        name: SITE_NAME
      },
      publisher: {
        '@type': 'Person',
        name: SITE_NAME
      },
      mainEntityOfPage: canonicalUrl
    };

    const head = buildHead({
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      pathName: `/blog/${post.slug}`,
      keywords: post.keywords,
      type: 'article',
      image: post.coverImage,
      structuredData
    });

    const relatedMarkup = relatedPosts.map((item) => `
                <a href="/blog/${escapeHtml(item.slug)}" class="blog-related-link">
                  <span class="label-text" style="color: var(--outline)">${escapeHtml(item.category)}</span>
                  <strong>${wrapNoTranslateStatic(escapeHtml(item.title))}</strong>
                  <span style="color: var(--on-surface-variant); font-size: 0.95rem;">${wrapNoTranslateStatic(escapeHtml(item.excerpt))}</span>
                </a>`).join('');

    const body = `
      <main class="section-spacing bg-lowest grid-blueprint" style="min-height: 100vh; padding-top: 8rem;">
        <div class="container blog-article-layout">
          <article class="blog-article-main">
            <div class="blog-article-eyebrow">
              <span class="label-text" style="color: var(--primary-container)">${escapeHtml(post.category)}</span>
              <time class="label-text" dateTime="${escapeHtml(post.publishedAt)}" style="color: var(--outline)">${escapeHtml(post.date)} // ${escapeHtml(post.readTime)}</time>
            </div>
            <h1 style="margin-bottom: 1rem;">${wrapNoTranslateStatic(escapeHtml(post.title))}</h1>
            <p class="blog-article-lead">${wrapNoTranslateStatic(escapeHtml(post.excerpt))}</p>
            <figure class="blog-cover-frame">
              <img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.coverAlt)}" class="blog-cover-image" />
            </figure>
            <div class="blog-article-actions">
              <a href="/blog" class="btn-secondary">Back to blog</a>
              <a href="mailto:delkoman@gmail.com?subject=I%20read%20your%20article" class="btn-primary">Share feedback</a>
            </div>
            <div class="blog-article-body">${mdToHtml(post.content)}</div>
            <section class="blog-insights-grid" aria-label="Key ideas from article">${post.insights.map((insight) => `
                <div class="blog-insight-card">
                  <span class="label-text" style="color: var(--primary-container)">Key idea</span>
                  <p>${wrapNoTranslateStatic(escapeHtml(insight))}</p>
                </div>`).join('')}
            </section>
          </article>
          <aside class="blog-article-sidebar">
            <div class="blog-sidebar-card">
              <span class="label-text" style="color: var(--secondary-container)">More writing</span>
              <div style="display: grid; gap: 1rem;">${relatedMarkup}
              </div>
            </div>
          </aside>
        </div>
      </main>`;

    injectPage({ outputPath: `blog/${post.slug}/index.html`, head, body });
    console.log(`✓ prerendered /blog/${post.slug}`);
  });
}

const posts = readPosts(POSTS_DIR);
buildHomePage(posts);
buildBlogIndexPage(posts);
buildBlogPostPages(posts);

console.log('\n✔ Prerender complete.');
