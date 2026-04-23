import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../config/site.js';

export const cvPageConfig = {
  en: {
    locale: 'en',
    lang: 'en',
    path: '/cv/en',
    sourceFile: 'edgar-vibe-coder-portfolio.html',
    buttonLabel: 'Read CV in English',
    pageTitle: 'CV in English',
    seoTitle: `CV in English | ${SITE_NAME}`,
    seoDescription:
      'English CV of Edgar Mancilla Sanchez, AI-native builder and product engineer working across SaaS, operations, compliance, AgTech, and execution systems.',
    keywords: [
      'Edgar Mancilla Sanchez CV',
      'CV in English',
      'AI-native builder resume',
      'product engineer',
      'operations',
      'AgTech',
      'vibe coder',
    ],
    headingChecks: ['Professional Summary', 'Selected Projects', 'AI Toolchain'],
  },
  es: {
    locale: 'es',
    lang: 'es-MX',
    path: '/cv/es',
    sourceFile: 'edgar-vibe-coder-portfolio-es.html',
    buttonLabel: 'Ver CV en español',
    pageTitle: 'CV en español',
    seoTitle: `CV en español | ${SITE_NAME}`,
    seoDescription:
      'CV en español de Edgar Mancilla Sanchez, AI-native builder y product engineer con experiencia en SaaS, operaciones, compliance, AgTech y sistemas de ejecución.',
    keywords: [
      'Edgar Mancilla Sanchez CV',
      'CV en español',
      'AI-native builder',
      'product engineer',
      'operaciones',
      'AgTech',
      'vibe coder',
    ],
    headingChecks: ['Resumen Profesional', 'Proyectos Destacados', 'Toolchain de IA'],
  },
};

export function getCvPageConfig(locale) {
  return cvPageConfig[locale] ?? cvPageConfig.en;
}

export function getCvAlternateLinks() {
  return [
    { hrefLang: 'en', href: `${SITE_URL}${cvPageConfig.en.path}` },
    { hrefLang: 'es-MX', href: `${SITE_URL}${cvPageConfig.es.path}` },
    { hrefLang: 'x-default', href: `${SITE_URL}${cvPageConfig.en.path}` },
  ];
}

export function buildCvStructuredData(locale) {
  const page = getCvPageConfig(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.pageTitle,
    url: `${SITE_URL}${page.path}`,
    description: page.seoDescription,
    inLanguage: page.lang,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
  };
}
