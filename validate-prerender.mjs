import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cvPageConfig, getCvAlternateLinks } from './src/content/cvPageConfig.js';
import { homeCopy, projects, projectFields } from './src/content/homeContent.js';
import { servicesSeo, servicesCopy, packages, proofCases, methodSteps, pricing, clientNeeds, faqs } from './src/content/servicesContent.js';
import { HOME_TITLE, SITE_DESCRIPTION, CONTACT_EMAIL, LINKEDIN_URL } from './src/config/site.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const POSTS_DIR = path.join(__dirname, 'src/content/posts');
const SITE_URL = 'https://edgarmancilla.com';

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function normalizeValue(value) {
  if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
    return value.slice(1, -1);
  }

  return value;
}

function parseFrontmatter(rawPost) {
  const match = rawPost.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: rawPost.trim() };
  }

  const [, frontmatter, content] = match;
  const data = {};
  let currentListKey = null;

  frontmatter.split('\n').forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return;
    }

    if (trimmedLine.startsWith('- ') && currentListKey) {
      data[currentListKey].push(normalizeValue(trimmedLine.slice(2).trim()));
      return;
    }

    const separatorIndex = trimmedLine.indexOf(':');

    if (separatorIndex === -1) {
      currentListKey = null;
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();

    if (!rawValue) {
      data[key] = [];
      currentListKey = key;
      return;
    }

    data[key] = normalizeValue(rawValue);
    currentListKey = null;
  });

  return {
    data,
    content: content.trim()
  };
}

function listPosts() {
  return fs.readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data, content } = parseFrontmatter(readFile(path.join(POSTS_DIR, file)));
      return {
        file,
        ...data,
        content
      };
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

function expectIncludes(html, fragment, message, failures) {
  if (!html.includes(fragment)) {
    failures.push(message);
  }
}

function expectRegex(html, pattern, message, failures) {
  if (!pattern.test(html)) {
    failures.push(message);
  }
}

function validateSharedSeo(html, routePath, failures) {
  expectRegex(html, /<title>[^<]+<\/title>/, `${routePath}: missing <title>`, failures);
  expectRegex(html, /<meta\s+name="description"\s+content="[^"]+"\s*\/>/, `${routePath}: missing meta description`, failures);
  expectIncludes(html, `<link rel="canonical" href="${SITE_URL}${routePath}" />`, `${routePath}: canonical mismatch`, failures);
  expectRegex(html, /<meta\s+property="og:type"\s+content="[^"]+"\s*\/>/, `${routePath}: missing og:type`, failures);
  expectRegex(html, /<meta\s+property="og:title"\s+content="[^"]+"\s*\/>/, `${routePath}: missing og:title`, failures);
  expectRegex(html, /<meta\s+property="og:description"\s+content="[^"]+"\s*\/>/, `${routePath}: missing og:description`, failures);
}

function validateAlternates(html, routePath, alternates, failures) {
  alternates.forEach((alternate) => {
    expectIncludes(
      html,
      `<link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.href}" />`,
      `${routePath}: missing alternate ${alternate.hrefLang}`,
      failures
    );
  });
}

function validateHomePage(failures) {
  const html = readFile(path.join(DIST, 'index.html'));
  validateSharedSeo(html, '/', failures);
  const text = html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'");
  expectIncludes(text, homeCopy.headline, '/: missing hero headline in initial HTML', failures);
  expectIncludes(text, homeCopy.intro, '/: missing hero intro copy in initial HTML', failures);
  expectIncludes(text, HOME_TITLE, '/: homepage SEO title mismatch', failures);
  expectIncludes(html, SITE_DESCRIPTION, '/: homepage SEO description mismatch', failures);
  expectRegex(html, /href="#projects"[^>]*class="btn-primary"[^>]*>View projects/, '/: missing primary projects CTA', failures);
  expectIncludes(html, 'href="/cv/en"', '/: missing English CV link', failures);
  expectIncludes(html, 'href="/cv/es"', '/: missing Spanish CV link', failures);
  expectIncludes(html, `href="mailto:${CONTACT_EMAIL}"`, '/: missing email link', failures);
  expectIncludes(html, `href="${LINKEDIN_URL}"`, '/: missing LinkedIn link', failures);
  expectIncludes(text, homeCopy.eyebrow, '/: missing scientific profile in hero', failures);
  expectIncludes(html, 'id="biotech-agtech"', '/: missing sector experience section', failures);
  ['URBN LEAVES', 'Baja Biotech', 'URBAN BEAUTY GARDEN'].forEach(name => expectIncludes(text, name, `/: missing sector experience ${name}`, failures));
  const projectPosition = html.indexOf('id="projects"');
  if (projectPosition < 0 || projectPosition > html.indexOf('id="about"') || projectPosition > html.indexOf('id="capabilities"')) {
    failures.push('/: projects must appear before profile and capabilities');
  }
  projects.forEach(project => {
    expectIncludes(text, project.name, `/: missing project ${project.name}`, failures);
    projectFields.forEach(([field]) => expectIncludes(text, project[field], `/: missing ${project.name} ${field}`, failures));
    if (project.url) {
      expectIncludes(html, `href="${project.url}"`, `/: missing ${project.name} link`, failures);
    }
    expectIncludes(html, `src="${project.image}"`, `/: missing ${project.name} image`, failures);
    (project.gallery || []).forEach(item => {
      expectIncludes(html, `src="${item.image}"`, `/: missing ${project.name} gallery image`, failures);
    });
  });
  if (/Products in production|AI models in workflow|AI-native products/i.test(text)) {
    failures.push('/: stale positioning or counters in homepage');
  }
  expectIncludes(html, 'Ver CV en español', '/: missing Spanish CV CTA in initial HTML', failures);
  expectIncludes(html, 'Read CV in English', '/: missing English CV CTA in initial HTML', failures);
  expectIncludes(html, 'href="/servicios"', '/: missing Servicios nav link in initial HTML', failures);
  expectIncludes(html, '04 // Operations &amp; Consulting', '/: missing selected experience section in initial HTML', failures);
  expectIncludes(html, 'TRYP México', '/: missing selected experience content in initial HTML', failures);
  expectIncludes(html, '06 // Credibility & Substance', '/: missing credibility section in initial HTML', failures);
}

function validateBlogIndex(posts, failures) {
  const html = readFile(path.join(DIST, 'blog/index.html'));
  validateSharedSeo(html, '/blog', failures);
  expectIncludes(html, 'A running collection of essays, notes, interests, and observations.', '/blog: missing blog index H1 in initial HTML', failures);
  expectIncludes(html, 'This is the full blog index', '/blog: missing blog index intro in initial HTML', failures);

  posts.forEach((post) => {
    expectIncludes(html, `/blog/${post.slug}`, `/blog: missing link for ${post.slug}`, failures);
    expectIncludes(html, post.title, `/blog: missing title for ${post.slug}`, failures);
    expectIncludes(html, post.excerpt, `/blog: missing excerpt for ${post.slug}`, failures);
  });
}

function validatePostPages(posts, failures) {
  posts.forEach((post) => {
    const routePath = `/blog/${post.slug}`;
    const rawHtml = readFile(path.join(DIST, 'blog', post.slug, 'index.html'));
    // Strip the translation spans so text matching doesn't fail
    const html = rawHtml.replace(/<span translate="no">/g, '').replace(/<\/span>/g, '');
    
    validateSharedSeo(html, routePath, failures);
    expectIncludes(html, '<article class="blog-article-main">', `${routePath}: missing article wrapper`, failures);
    expectIncludes(html, post.title, `${routePath}: missing H1/title content`, failures);
    expectIncludes(html, post.excerpt, `${routePath}: missing lead/excerpt`, failures);

    const firstParagraph = post.content
      .split('\n\n')
      .map((item) => item.trim())
      .find((item) => item && !item.startsWith('#'));

    if (firstParagraph) {
      expectIncludes(html, firstParagraph.slice(0, Math.min(firstParagraph.length, 80)), `${routePath}: missing readable article body in initial HTML`, failures);
    }

    expectRegex(html, /<h2>[^<]+<\/h2>/, `${routePath}: missing article subheadings`, failures);
  });
}

function validateServicesPage(failures) {
  const html = readFile(path.join(DIST, 'servicios', 'index.html'));
  const text = html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'");
  validateSharedSeo(html, '/servicios', failures);
  expectRegex(html, /<html[^>]*lang="es"[^>]*>/, '/servicios: html lang mismatch', failures);
  expectIncludes(text, servicesCopy.headline, '/servicios: missing H1 in initial HTML', failures);
  expectIncludes(html, servicesSeo.description, '/servicios: SEO description mismatch', failures);
  expectIncludes(html, '"@type":"Service"', '/servicios: missing Service structured data', failures);
  expectIncludes(html, '"@type":"FAQPage"', '/servicios: missing FAQPage structured data', failures);
  packages.forEach((pkg) => {
    expectIncludes(text, pkg.name, `/servicios: missing package ${pkg.name}`, failures);
    expectIncludes(text, pkg.price, `/servicios: missing price for ${pkg.name}`, failures);
  });
  expectIncludes(text, 'Diagnóstico: gratis.', '/servicios: missing free diagnosis price line', failures);
  expectIncludes(text, 'Operación y soporte: se cotiza aparte, por proyecto', '/servicios: missing separate operation fee line', failures);
  proofCases.forEach((proof) => {
    expectIncludes(text, proof.name, `/servicios: missing proof case ${proof.name}`, failures);
  });
  methodSteps.forEach((step) => {
    expectIncludes(text, step.title, `/servicios: missing method step ${step.title}`, failures);
  });
  clientNeeds.forEach((need) => {
    expectIncludes(text, need, '/servicios: missing client need', failures);
  });
  faqs.forEach((faq) => {
    expectIncludes(text, faq.q, `/servicios: missing FAQ ${faq.q}`, failures);
  });
  expectIncludes(html, `href="mailto:${CONTACT_EMAIL}`, '/servicios: missing email link', failures);
}

function validateCvPages(failures) {
  Object.values(cvPageConfig).forEach((page) => {
    const html = readFile(path.join(DIST, page.path.replace(/^\//, ''), 'index.html'));
    validateSharedSeo(html, page.path, failures);
    validateAlternates(html, page.path, getCvAlternateLinks(), failures);
    expectRegex(html, new RegExp(`<html[^>]*lang="${page.lang}"[^>]*>`), `${page.path}: html lang mismatch`, failures);
    expectIncludes(html, 'Edgar <span>Mancilla</span>', `${page.path}: missing visible H1/header in initial HTML`, failures);
    page.headingChecks.forEach((heading) => {
      expectIncludes(html, heading, `${page.path}: missing ${heading} in initial HTML`, failures);
    });
  });
}

const posts = listPosts();
const failures = [];

if (!posts.length) {
  failures.push('No markdown posts were found in src/content/posts.');
}

validateHomePage(failures);
validateCvPages(failures);
validateBlogIndex(posts, failures);
validatePostPages(posts, failures);
validateServicesPage(failures);

if (failures.length) {
  console.error('\nPrerender validation failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`✓ prerender validation passed for /, /cv/es, /cv/en, /blog, /servicios, and ${posts.length} blog post routes`);
