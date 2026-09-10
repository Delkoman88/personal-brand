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
      'English CV of Edgar Mancilla Sanchez, AI-assisted product builder working on applications, automation, and operational tools, with a background in biotechnology.',
    keywords: [
      'Edgar Mancilla Sanchez CV',
      'CV in English',
      'AI-assisted development resume',
      'product engineer',
      'operations',
      'AgTech',
      'biotechnology',
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
      'CV en español de Edgar Mancilla Sanchez, desarrollador de productos asistido por IA, con experiencia en aplicaciones, automatización, operaciones y biotecnología.',
    keywords: [
      'Edgar Mancilla Sanchez CV',
      'CV en español',
      'desarrollo asistido por IA',
      'product engineer',
      'operaciones',
      'AgTech',
      'biotechnology',
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
