import { useEffect } from 'react';
import { SITE_NAME, SITE_URL } from '../config/site';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function Seo({
  title,
  description,
  path = '/',
  keywords = [],
  type = 'website',
  image,
  twitterSite,
  structuredData,
  htmlLang = 'en',
  alternates = [],
}) {
  useEffect(() => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const imageUrl = image ? `${SITE_URL}${image}` : null;

    document.title = fullTitle;
    document.documentElement.lang = htmlLang;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' });

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    if (imageUrl) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    }

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    if (twitterSite) {
      upsertMeta('meta[name="twitter:site"]', { name: 'twitter:site', content: twitterSite });
    }
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    if (imageUrl) {
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    }

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    document.head
      .querySelectorAll('link[data-seo-alternate="true"]')
      .forEach((element) => element.remove());

    alternates.forEach((alternate) => {
      upsertLink(
        `link[rel="alternate"][hreflang="${alternate.hrefLang}"][data-seo-alternate="true"]`,
        {
          rel: 'alternate',
          hreflang: alternate.hrefLang,
          href: alternate.href,
          'data-seo-alternate': 'true',
        },
      );
    });

    const scripts = [];
    const schemas = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : [];

    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      script.dataset.seo = 'true';
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((script) => script.remove());
    };
  }, [alternates, description, htmlLang, image, keywords, path, structuredData, title, twitterSite, type]);

  return null;
}
