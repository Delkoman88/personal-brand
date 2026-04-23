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
import { fileURLToPath } from 'url';
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

// ---------------------------------------------------------------------------
// Sitemap generation
// ---------------------------------------------------------------------------

function generateSitemap(posts) {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0', lastmod: today },
    { loc: '/blog', changefreq: 'weekly', priority: '0.9', lastmod: today }
  ];

  const postEntries = posts.map((post) => ({
    loc: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: post.publishedAt
  }));

  const allEntries = [...staticPages, ...postEntries];

  const urls = allEntries.map((entry) => `  <url>
    <loc>${escapeXml(SITE_URL + entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
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
console.log(`✓ generated sitemap.xml (${posts.length} posts + 2 static pages)`);

const feed = generateRssFeed(posts);
fs.writeFileSync(path.join(DIST, 'feed.xml'), feed, 'utf8');
console.log(`✓ generated feed.xml (${posts.length} items)`);
