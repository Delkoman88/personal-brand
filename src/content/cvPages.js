import cvEnglishRaw from '../../edgar-vibe-coder-portfolio.html?raw';
import cvSpanishRaw from '../../edgar-vibe-coder-portfolio-es.html?raw';
import { buildCvBodyHtml } from '../utils/cvHtml';
import {
  buildCvStructuredData,
  cvPageConfig,
  getCvAlternateLinks,
} from './cvPageConfig';

const cvRawSources = {
  en: cvEnglishRaw,
  es: cvSpanishRaw,
};

export const cvPages = Object.fromEntries(
  Object.entries(cvPageConfig).map(([locale, page]) => [
    locale,
    {
      ...page,
      alternates: getCvAlternateLinks(),
      bodyHtml: buildCvBodyHtml(cvRawSources[locale]),
      structuredData: buildCvStructuredData(locale),
    },
  ]),
);

export function getCvPage(locale) {
  return cvPages[locale] ?? cvPages.en;
}
