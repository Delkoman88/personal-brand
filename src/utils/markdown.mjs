import fs from 'fs';
import path from 'path';

export function normalizeValue(value) {
  if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
    return value.slice(1, -1);
  }

  return value;
}

export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function stripLeadingTitleHeading(content, title) {
  if (!title) {
    return content.trim();
  }

  const headingPattern = new RegExp(`^#\\s+${escapeRegex(title)}\\s*\\n+`, 'i');
  return content.replace(headingPattern, '').trim();
}

export function parseFrontmatter(rawPost) {
  const match = rawPost.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: rawPost.trim() };
  }

  const [, frontmatter, rawContent] = match;
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
    content: stripLeadingTitleHeading(rawContent.trim(), data.title)
  };
}

export function readPosts(postsDir) {
  return fs.readdirSync(postsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const rawPost = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const { data, content } = parseFrontmatter(rawPost);
      const body = content
        .split('\n\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

      return {
        ...data,
        content,
        body,
        previewBody: body.filter((paragraph) => !paragraph.startsWith('#')).slice(0, 2)
      };
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}
