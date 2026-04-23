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
              <span class="label-text" style="color: var(--on-surface-variant);">Systems Operator & Architect</span>
            </div>
            <h1 style="margin-bottom: 1.5rem;">Biotech PhD. Designing <span class="text-accent-cyan" style="display: inline-block;">operational systems</span> for complex and regulated environments.</h1>
            <p style="font-size: 1.125rem; color: var(--on-surface-variant); margin-bottom: 3rem; max-width: 600px;">Operating at the intersection of science, operations, compliance, traceability, process design, and execution. I translate technical and regulatory requirements into adoptable, market-ready architectures.</p>
            <div class="hero-signal-grid">
              <span class="hero-signal-pill">Ops systems</span>
              <span class="hero-signal-pill">Compliance</span>
              <span class="hero-signal-pill">AgTech</span>
              <span class="hero-signal-pill">Field notes</span>
            </div>
            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
              <a href="https://linktr.ee/delkoman" target="_blank" rel="noopener noreferrer" class="btn-primary">Connect on Linktree</a>
              <a href="#about" class="btn-secondary">View Profile</a>
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
              <p style="font-size: 1.125rem; color: var(--on-surface-variant);">I focus on <span style="color: var(--on-surface);">process design, operational implementation, quality systems, documentation, workflow design, and automation</span> within complex and regulated environments. My approach centers on turning chaos into functioning, scalable architectures that enable strong decision-making and cross-functional alignment.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" class="section-spacing bg-low">
        <div class="container" style="display: grid; gap: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="label-text" style="color: var(--primary-container);">02 // Core Capabilities</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <p style="max-width: 800px; margin: 0; color: var(--on-surface-variant); font-size: 1.05rem;">Strategy and operations, compliance and market readiness, traceability, documentation, quality systems, automation, AgTech, and cross-functional implementation.</p>
        </div>
      </section>

      <section id="experience" class="section-spacing bg-surface">
        <div class="container" style="display: grid; gap: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="label-text" style="color: var(--primary-container);">03 // Selected Experience</span>
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
            <span class="label-text" style="color: var(--primary-container);">04 // Historical Timeline</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <p style="max-width: 820px; margin: 0; color: var(--on-surface-variant);">Recent timeline highlights include TraceLab Consulting, Tryp Mexico, Urbn Leaves, Baja Biotech, academic research, and INC Research / Syneos Health.</p>
        </div>
      </section>

      <section id="credibility" class="section-spacing bg-surface grid-blueprint">
        <div class="container" style="display: grid; gap: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="label-text" style="color: var(--primary-container);">05 // Credibility & Substance</span>
            <div style="flex: 1; height: 1px; background-color: var(--outline-variant);"></div>
          </div>
          <p style="max-width: 860px; margin: 0; color: var(--on-surface-variant);">Core themes across the work include operations and process standardization, reporting workflows, quality systems, traceability, AgTech, startup execution, client-facing strategy, and automation with Python and AI tools.</p>
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
          <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Ready to architect the next system?</h2>
          <p style="color: var(--on-surface-variant); font-size: 1.125rem; max-width: 600px; margin-bottom: 3rem;">Whether you need to structure an early-stage startup, require deep traceability systems, or want to explore AgTech implementation. Let&#39;s build the framework.</p>
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
