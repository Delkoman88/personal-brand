import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  buildCvStructuredData,
  cvPageConfig,
  getCvAlternateLinks,
} from './src/content/cvPageConfig.js';
import { buildCvBodyHtml } from './src/utils/cvHtml.js';
import { readPosts } from './src/utils/markdown.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const POSTS_DIR = path.join(__dirname, 'src/content/posts');
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, HOME_TITLE, HOME_KEYWORDS, CONTACT_EMAIL, LINKEDIN_URL } from './src/config/site.js';
import { experienceGroups } from './src/content/experience.js';
import { homeCopy, projects, projectFields, capabilities, toolGroups, credibilityHighlights } from './src/content/homeContent.js';
import { servicesSeo, servicesCopy, packages, proofCases, methodSteps, pricing, clientNeeds, faqs } from './src/content/servicesContent.js';



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

function injectPage({ outputPath, head, body, lang = 'en' }) {
  let html = stripDefaultHead(BASE_HTML);
  html = html.replace(/<html([^>]*)lang="[^"]*"([^>]*)>/i, `<html$1lang="${escapeHtml(lang)}"$2>`);
  html = html.replace('</head>', `${head}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const fullOutputPath = path.join(DIST, outputPath);
  fs.mkdirSync(path.dirname(fullOutputPath), { recursive: true });
  fs.writeFileSync(fullOutputPath, html, 'utf8');
}

function buildHead({
  title,
  description,
  pathName,
  keywords = [],
  type = 'website',
  image = '/og-image.png',
  twitterSite,
  structuredData,
  alternates = [],
}) {
  const canonicalUrl = `${SITE_URL}${pathName}`;
  const imageUrl = `${SITE_URL}${image}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const twitterSiteTag = twitterSite
    ? `\n    <meta name="twitter:site" content="${escapeHtml(twitterSite)}" />`
    : '';
  const alternateTags = alternates
    .map(
      (alternate) =>
        `\n    <link rel="alternate" hreflang="${escapeHtml(alternate.hrefLang)}" href="${escapeHtml(alternate.href)}" />`,
    )
    .join('');

  return `
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords.join(', '))}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />${alternateTags}

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
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    pathName: '/',
    image: '/og-image.png',
    twitterSite: '@urbanbeautygarden',
    keywords: HOME_KEYWORDS,
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
    <nav class="site-navigation" aria-label="Main navigation">
      <div class="site-navigation-inner">
        <a href="/" class="site-brand"><span>EDGAR MANCILLA SANCHEZ</span><span class="label-text">Applications · Automation · Operations</span></a>
        <div class="site-nav-links">
          <a href="#projects" class="nav-projects">Projects</a><a href="#biotech-agtech">Biotech &amp; AgTech</a><a href="#about">Profile</a>
          <a href="#experience">Experience</a><a href="/blog">Blog</a><a href="/servicios">Servicios</a><a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
    <main>
      <section class="bg-lowest grid-blueprint hero-section">
        <div class="container hero-layout">
          <div class="hero-copy">
            <p class="label-text hero-eyebrow">${escapeHtml(homeCopy.eyebrow)}</p>
            <h1>I turn business challenges into <span class="text-accent-cyan">growth strategies and useful tools</span> with AI.</h1>
            <p class="hero-intro">${escapeHtml(homeCopy.intro)}</p>
            <div class="hero-actions">
              <a href="#projects" class="btn-primary">View projects <span aria-hidden="true">↗</span></a>
              <a href="/cv/en" class="btn-secondary">Read CV in English</a>
              <a href="/cv/es" class="hero-cv-link" lang="es">Ver CV en español</a>
            </div>
          </div>
          <div class="hero-visual"><div class="hero-portrait"><img src="/profile.jpg" alt="Edgar Mancilla Sánchez" width="400" height="533" /></div></div>
        </div>
      </section>
      <section id="projects" class="section-spacing bg-low" aria-labelledby="projects-heading">
        <div class="container">
          <div class="section-heading"><h2 id="projects-heading" class="label-text">01 // Selected projects</h2></div>
          <div class="projects-list">
            ${projects.map(project => `
              <article class="project-item project-case project-case--${escapeHtml(project.id)}">
                <div class="project-copy">
                  <div><p class="label-text project-meta">${escapeHtml(project.meta)}</p><h3>${escapeHtml(project.name)}</h3></div>
                  <dl class="project-details">${projectFields.map(([field, label]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(project[field])}</dd></div>`).join('')}</dl>
                  <ul class="project-stack" aria-label="${escapeHtml(project.name)} technologies">${project.stack.map(item => `<li class="project-stack-badge">${escapeHtml(item)}</li>`).join('')}</ul>
                  <div class="project-actions">
                    ${project.url ? `<a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" class="btn-secondary">${escapeHtml(project.linkLabel)} <span aria-hidden="true">↗</span></a>` : ''}
                    <span class="project-access">${escapeHtml(project.accessNote)}</span>
                  </div>
                </div>
                <figure class="project-evidence">
                  <a href="${escapeHtml(project.image)}" target="_blank" rel="noopener noreferrer" class="project-visual" aria-label="Open full image: ${escapeHtml(project.imageAlt)}">
                    <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="1280" height="800" loading="lazy" />
                  </a>
                  <figcaption>${escapeHtml(project.caption)}</figcaption>
                  ${project.gallery ? `<div class="project-gallery">${project.gallery.map(item => `
                      <figure class="project-gallery-item">
                        <a href="${escapeHtml(item.image)}" target="_blank" rel="noopener noreferrer" class="project-visual" aria-label="Open full image: ${escapeHtml(item.imageAlt)}">
                          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt)}" width="1280" height="800" loading="lazy" />
                        </a>
                        <figcaption>${escapeHtml(item.caption)}</figcaption>
                      </figure>`).join('')}</div>` : ''}
                </figure>
              </article>`).join('')}
          </div>
        </div>
      </section>
      <section id="about" class="section-spacing bg-surface">
        <div class="container">
          <div class="section-heading"><span class="label-text">02 // Profile</span></div>
          <div class="profile-copy"><h2>${escapeHtml(homeCopy.profileTitle)}</h2>${homeCopy.profile.map(text => `<p>${escapeHtml(text)}</p>`).join('')}</div>
        </div>
      </section>
      <section id="capabilities" class="section-spacing bg-low" aria-labelledby="capabilities-heading">
        <div class="container">
          <div class="section-heading"><h2 id="capabilities-heading" class="label-text">03 // Capabilities &amp; tools</h2></div>
          <div class="mobile-scroll-shell">
            <div class="mobile-scroll-indicator"><span class="label-text">Swipe to explore more cards</span></div>
            <div class="capabilities-grid">${capabilities.map(cap => `<div class="card-elevated capability-card"><h3>${escapeHtml(cap.title)}</h3><p>${escapeHtml(cap.desc)}</p></div>`).join('')}</div>
          </div>
          <div class="tools-summary"><h3>How I build</h3><p>${escapeHtml(homeCopy.workflow)}</p>
            <dl class="tools-list">${toolGroups.map(group => `<div><dt>${escapeHtml(group.label)}</dt><dd>${escapeHtml(group.tools)}</dd></div>`).join('')}</dl>
          </div>
        </div>
      </section>
      ${experienceGroups.map(group => `
        <section id="${group.id}" class="section-spacing bg-surface" aria-labelledby="${group.id}-heading">
          <div class="container">
            <div class="section-heading"><h2 id="${group.id}-heading" class="label-text">${escapeHtml(group.title)}</h2></div>
            <div class="mobile-scroll-shell">
              <div class="mobile-scroll-indicator"><span class="label-text">Swipe to see more work</span></div>
              <div class="experience-list" style="display:flex;flex-direction:column;gap:5rem;">
                ${group.items.map(exp => `<article class="experience-item" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:3rem;align-items:start;padding-left:2rem;border-left:2px solid var(--outline-variant);">
                  <div class="experience-copy">
                    <p class="label-text">${escapeHtml(exp.role)}</p><h3>${escapeHtml(exp.company)}</h3>
                    <p>${escapeHtml(exp.description)}</p>
                    ${exp.highlights ? `<ul>${exp.highlights.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
                    ${exp.links ? `<div class="experience-links">${exp.links.map(link => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ↗</a>`).join('')}</div>` : ''}
                    <div class="experience-tag-list">${exp.tags.map(tag => `<span class="experience-tag">${escapeHtml(tag)}</span>`).join(' · ')}</div>
                  </div>
                  <div class="experience-visual"><img src="${escapeHtml(exp.image)}" alt="${escapeHtml(exp.company)} visualization" loading="lazy" /></div>
                </article>`).join('')}
              </div>
            </div>
          </div>
        </section>`).join('')}

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
          <p style="max-width: 860px; margin: 0; color: var(--on-surface-variant);">${escapeHtml(credibilityHighlights.join('; '))}.</p>
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

      <section id="contact" class="section-spacing bg-lowest contact-section">
        <div class="container contact-content">
          <h2>${escapeHtml(homeCopy.contactTitle)}</h2><p>${escapeHtml(homeCopy.contact)}</p>
          <div class="contact-actions">
            <a href="mailto:${CONTACT_EMAIL}" class="btn-primary">${CONTACT_EMAIL}</a>
            <a href="${LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" class="btn-secondary">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
          <div class="contact-links"><a href="/cv/en">Read CV in English</a><a href="/cv/es" lang="es">Ver CV en español</a><a href="https://linktr.ee/delkoman" target="_blank" rel="noopener noreferrer">More links</a></div>
          <div class="contact-footer">© ${new Date().getFullYear()} EDGAR MANCILLA SÁNCHEZ // APPLICATIONS · AUTOMATION · OPERATIONS</div>
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

function buildServicesPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: servicesSeo.title,
      description: servicesSeo.description,
      url: `${SITE_URL}/servicios`,
      provider: {
        '@type': 'Person',
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: {
        '@type': 'Country',
        name: 'México',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Agentes y copilotos operativos',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Diagnóstico',
            description: 'Reviso un proceso y te digo con franqueza si un agente te sirve.',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'MXN',
              price: 0,
            },
          },
          {
            '@type': 'Offer',
            name: 'Agente a la medida',
            description: 'Agente con sus propias fuentes, memoria y documentos de control. Precio desde, según alcance.',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'MXN',
              price: 10000,
            },
          },
          {
            '@type': 'Offer',
            name: 'Copiloto operativo',
            description: 'Un asistente diario para tu operación. Precio desde, según alcance.',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'MXN',
              price: 10000,
            },
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  const head = buildHead({
    title: servicesSeo.title,
    description: servicesSeo.description,
    pathName: '/servicios',
    image: '/og-image.png',
    twitterSite: '@urbanbeautygarden',
    keywords: servicesSeo.keywords,
    structuredData
  });

  const body = `
    <main lang="es" class="section-spacing bg-lowest grid-blueprint" style="min-height: 100vh; padding-top: 8rem;">
      <div class="container" style="display: grid; gap: 3rem;">
        <div style="display: grid; gap: 1rem; max-width: 760px;">
          <span class="label-text" style="color: var(--primary-container)">${escapeHtml(servicesCopy.eyebrow)}</span>
          <h1 style="margin: 0;">${escapeHtml(servicesCopy.headline)}</h1>
          <p style="margin: 0; color: var(--on-surface-variant); font-size: 1.05rem;">
            ${escapeHtml(servicesCopy.intro)}
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="mailto:${CONTACT_EMAIL}?subject=Llamada de descubrimiento: agente o copiloto operativo" class="btn-primary">Agenda una llamada de descubrimiento</a>
            <a href="/#projects" class="btn-secondary">Ver los casos</a>
          </div>
        </div>

        <section aria-labelledby="prueba-heading">
          <div class="section-heading"><h2 id="prueba-heading" class="label-text">${escapeHtml(servicesCopy.proofTitle)}</h2></div>
          <p style="color: var(--on-surface-variant); max-width: 760px;">${escapeHtml(servicesCopy.proofIntro)}</p>
          <div class="capabilities-grid">${proofCases.map((proof) => `
            <div class="card-elevated capability-card">
              <h3>${escapeHtml(proof.name)}</h3>
              <p>${escapeHtml(proof.desc)}</p>
            </div>`).join('')}
          </div>
        </section>

        <section id="paquetes" aria-labelledby="paquetes-heading">
          <div class="section-heading"><h2 id="paquetes-heading" class="label-text">${escapeHtml(servicesCopy.packagesTitle)}</h2></div>
          <div class="capabilities-grid">${packages.map((pkg) => `
            <article class="card-elevated capability-card">
              <h3>${escapeHtml(pkg.name)}</h3>
              <p><strong>${escapeHtml(pkg.tagline)}</strong></p>
              <p>${escapeHtml(pkg.desc)}</p>
              <p class="services-price">${escapeHtml(pkg.price)}</p>
              <p>Ideal para: ${escapeHtml(pkg.ideal)}</p>
            </article>`).join('')}
          </div>
        </section>

        <section aria-labelledby="para-quien-heading">
          <div class="section-heading"><h2 id="para-quien-heading" class="label-text">${escapeHtml(servicesCopy.audienceTitle)}</h2></div>
          <p style="color: var(--on-surface-variant); max-width: 760px;">${escapeHtml(servicesCopy.audience)}</p>
        </section>

        <section id="metodo" aria-labelledby="metodo-heading">
          <div class="section-heading"><h2 id="metodo-heading" class="label-text">${escapeHtml(servicesCopy.methodTitle)}</h2></div>
          <ol class="services-steps">${methodSteps.map((step) => `
            <li>
              <h3>${escapeHtml(step.title)}</h3>
              <p>${escapeHtml(step.desc)}</p>
            </li>`).join('')}
          </ol>
        </section>

        <section id="inversion" aria-labelledby="inversion-heading">
          <div class="section-heading"><h2 id="inversion-heading" class="label-text">${escapeHtml(servicesCopy.pricingTitle)}</h2></div>
          <ul>${pricing.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}
          </ul>
          <p style="color: var(--on-surface-variant); max-width: 760px;">${escapeHtml(pricing.note)}</p>
        </section>

        <section aria-labelledby="necesito-heading">
          <div class="section-heading"><h2 id="necesito-heading" class="label-text">${escapeHtml(servicesCopy.needsTitle)}</h2></div>
          <ul>${clientNeeds.map((need) => `<li>${escapeHtml(need)}</li>`).join('')}
          </ul>
        </section>

        <section id="faq" aria-labelledby="faq-heading">
          <div class="section-heading"><h2 id="faq-heading" class="label-text">${escapeHtml(servicesCopy.faqTitle)}</h2></div>
          <div style="display: grid; gap: 1.5rem; max-width: 760px;">${faqs.map((faq) => `
            <div class="services-faq-item">
              <h3>${escapeHtml(faq.q)}</h3>
              <p>${escapeHtml(faq.a)}</p>
            </div>`).join('')}
          </div>
        </section>

        <section aria-labelledby="cta-heading">
          <div class="section-heading"><h2 id="cta-heading" class="label-text">${escapeHtml(servicesCopy.ctaTitle)}</h2></div>
          <p style="color: var(--on-surface-variant); max-width: 760px;">${escapeHtml(servicesCopy.ctaText)}</p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="mailto:${CONTACT_EMAIL}?subject=Llamada de descubrimiento: agente o copiloto operativo" class="btn-primary">${CONTACT_EMAIL}</a>
            <a href="/#projects" class="btn-secondary">Ver los casos</a>
          </div>
        </section>
      </div>
    </main>`;

  injectPage({ outputPath: 'servicios/index.html', head, body, lang: 'es' });
  console.log('✓ prerendered /servicios');
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

function buildCvPages() {
  Object.values(cvPageConfig).forEach((page) => {
    const sourcePath = path.join(__dirname, page.sourceFile);
    const bodyHtml = buildCvBodyHtml(fs.readFileSync(sourcePath, 'utf8'));
    const head = buildHead({
      title: page.seoTitle,
      description: page.seoDescription,
      pathName: page.path,
      keywords: page.keywords,
      image: '/og-image.png',
      twitterSite: '@urbanbeautygarden',
      alternates: getCvAlternateLinks(),
      structuredData: buildCvStructuredData(page.locale)
    });
    const body = `
      <main class="cv-page cv-page--${escapeHtml(page.locale)}">
        <div class="cv-page__content">${bodyHtml}</div>
      </main>`;

    injectPage({
      outputPath: `${page.path.replace(/^\//, '')}/index.html`,
      head,
      body,
      lang: page.lang
    });
    console.log(`✓ prerendered ${page.path}`);
  });
}

const posts = readPosts(POSTS_DIR);
buildHomePage(posts);
buildCvPages();
buildBlogIndexPage(posts);
buildBlogPostPages(posts);
buildServicesPage();

console.log('\n✔ Prerender complete.');
