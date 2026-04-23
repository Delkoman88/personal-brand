/**
 * generate-feeds.mjs
 *
 * Generates sitemap.xml and feed.xml (RSS 2.0) at build time.
 * Reads all blog posts from src/content/posts/ and produces:
 *   - dist/sitemap.xml  — for search engines
 *   - dist/feed.xml     — RSS feed for readers and aggregators
 *
 * Run as part of the postbuild step (after prerender, before validate).
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { cvPageConfig } from './src/content/cvPageConfig.js';
import { readPosts } from './src/utils/markdown.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const POSTS_DIR = path.join(__dirname, 'src/content/posts');
const SITE_URL = 'https://edgarmancilla.com';
const SITE_NAME = 'Edgar Mancilla Sanchez';
const SITE_DESCRIPTION = 'Biotech PhD designing operational systems for complex and regulated environments. Strategy and operations, compliance and market readiness, traceability, quality systems, automation, and AgTech.';



// ---------------------------------------------------------------------------
// XML helpers
// ---------------------------------------------------------------------------

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(value) {
  return value.toISOString().split('T')[0];
}

function getFileLastModified(filePath) {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return null;
  }
}

function getGitLastModified(filePath) {
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', filePath], {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'ignore']
    }).toString().trim();

    return output ? new Date(output) : null;
  } catch {
    return null;
  }
}

function resolveLastModified(filePaths, fallback = new Date()) {
  const timestamps = filePaths
    .map((filePath) => {
      const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
      return [getFileLastModified(absolutePath), getGitLastModified(absolutePath)];
    })
    .flat()
    .filter(Boolean)
    .map((date) => date.getTime());

  return formatDate(timestamps.length ? new Date(Math.max(...timestamps)) : fallback);
}

// ---------------------------------------------------------------------------
// Sitemap generation
// ---------------------------------------------------------------------------

function generateSitemap(posts) {
  const sectionFiles = fs.readdirSync(path.join(__dirname, 'src/sections'))
    .filter((file) => file.endsWith('.jsx'))
    .map((file) => path.join('src/sections', file));
  const sharedSeoFiles = [
    'src/components/Seo.jsx',
    'src/config/site.js'
  ];
  const cvSharedFiles = [
    'src/pages/CvPage.jsx',
    'src/content/cvPageConfig.js',
    'src/content/cvPages.js',
    'src/utils/cvHtml.js'
  ];
  const homeLastmod = resolveLastModified([
    'src/pages/HomePage.jsx',
    'src/content/blogPosts.js',
    ...sharedSeoFiles,
    ...sectionFiles
  ]);
  const blogIndexLastmod = resolveLastModified([
    'src/pages/BlogIndexPage.jsx',
    'src/content/blogPosts.js',
    ...sharedSeoFiles,
    ...posts.map((post) => post.sourcePath)
  ]);

  const staticPages = [
    { loc: '/', lastmod: homeLastmod },
    { loc: '/blog', lastmod: blogIndexLastmod },
    ...Object.values(cvPageConfig).map((page) => ({
      loc: page.path,
      lastmod: resolveLastModified([
        page.sourceFile,
        ...cvSharedFiles,
        ...sharedSeoFiles
      ])
    }))
  ];

  const postEntries = posts.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: resolveLastModified([
      post.sourcePath,
      'src/pages/BlogPostPage.jsx',
      'src/content/blogPosts.js',
      ...sharedSeoFiles
    ], new Date(post.publishedAt))
  }));

  const allEntries = [...staticPages, ...postEntries];

  const urls = allEntries.map((entry) => `  <url>
    <loc>${escapeXml(SITE_URL + entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

// ---------------------------------------------------------------------------
// RSS feed generation
// ---------------------------------------------------------------------------

function generateRssFeed(posts) {
  const buildDate = new Date().toUTCString();
  const latestPubDate = posts.length
    ? new Date(posts[0].publishedAt).toUTCString()
    : buildDate;

  const items = posts.map((post) => {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.publishedAt).toUTCString();
    const categories = (post.keywords || [])
      .map((keyword) => `      <category>${escapeXml(keyword)}</category>`)
      .join('\n');

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <description>${escapeXml(post.seoDescription || post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Field Notes</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${latestPubDate}</pubDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const posts = readPosts(POSTS_DIR);

const sitemap = generateSitemap(posts);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');
console.log(`✓ generated sitemap.xml (${posts.length} posts + ${Object.keys(cvPageConfig).length + 2} static pages)`);

const feed = generateRssFeed(posts);
fs.writeFileSync(path.join(DIST, 'feed.xml'), feed, 'utf8');
console.log(`✓ generated feed.xml (${posts.length} items)`);
