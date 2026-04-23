import React from 'react';
import Seo from '../components/Seo';
import { getCvPage } from '../content/cvPages';
import '../styles/cv-page.css';

export default function CvPage({ locale }) {
  const page = getCvPage(locale);

  return (
    <>
      <Seo
        title={page.seoTitle}
        description={page.seoDescription}
        path={page.path}
        keywords={page.keywords}
        image="/og-image.png"
        twitterSite="@urbanbeautygarden"
        htmlLang={page.lang}
        alternates={page.alternates}
        structuredData={page.structuredData}
      />
      <main className={`cv-page cv-page--${page.locale}`}>
        <div
          className="cv-page__content"
          dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
        />
      </main>
    </>
  );
}
