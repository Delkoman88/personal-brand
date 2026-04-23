const BODY_TAG_PATTERN = /<body[^>]*>([\s\S]*?)<\/body>/i;

function ensureSafeBlankTargets(html) {
  return html.replace(/<a\b([^>]*?)target="_blank"([^>]*)>/gi, (match, before, after) => {
    if (/\brel\s*=/.test(match)) {
      return match;
    }

    return `<a${before}target="_blank" rel="noopener noreferrer"${after}>`;
  });
}

export function extractBodyHtml(rawHtml) {
  const match = rawHtml.match(BODY_TAG_PATTERN);
  return (match ? match[1] : rawHtml).trim();
}

export function buildCvBodyHtml(rawHtml) {
  return ensureSafeBlankTargets(extractBodyHtml(rawHtml));
}
