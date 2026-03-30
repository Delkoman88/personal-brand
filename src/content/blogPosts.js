const rawPosts = Object.values(import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}));

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripLeadingTitleHeading(content, title) {
  if (!title) {
    return content.trim();
  }

  const headingPattern = new RegExp(`^#\\s+${escapeRegex(title)}\\s*\\n+`, 'i');
  return content.replace(headingPattern, '').trim();
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

export const blogPosts = rawPosts
  .map((rawPost) => {
    const { data, content } = parseFrontmatter(rawPost);
    const normalizedContent = stripLeadingTitleHeading(content.trim(), data.title);
    const body = normalizedContent
      .split('\n\n')
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    const previewBody = body.filter((paragraph) => !paragraph.startsWith('#')).slice(0, 2);

    return {
      ...data,
      body,
      previewBody,
      content: normalizedContent
    };
  })
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
