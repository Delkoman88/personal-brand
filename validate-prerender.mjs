import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

function validateHomePage(failures) {
  const html = readFile(path.join(DIST, 'index.html'));
  validateSharedSeo(html, '/', failures);
  expectIncludes(html, 'Biotech PhD. Designing', '/: missing hero headline in initial HTML', failures);
  expectIncludes(html, 'Operating at the intersection of science, operations, compliance, traceability', '/: missing hero intro copy in initial HTML', failures);
  expectIncludes(html, '03 // Selected Experience', '/: missing selected experience section in initial HTML', failures);
  expectIncludes(html, 'TRYP Mexico', '/: missing selected experience content in initial HTML', failures);
  expectIncludes(html, '05 // Credibility & Substance', '/: missing credibility section in initial HTML', failures);
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
    const html = readFile(path.join(DIST, 'blog', post.slug, 'index.html'));
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

const posts = listPosts();
const failures = [];

if (!posts.length) {
  failures.push('No markdown posts were found in src/content/posts.');
}

validateHomePage(failures);
validateBlogIndex(posts, failures);
validatePostPages(posts, failures);

if (failures.length) {
  console.error('\nPrerender validation failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`✓ prerender validation passed for /, /blog, and ${posts.length} blog post routes`);
