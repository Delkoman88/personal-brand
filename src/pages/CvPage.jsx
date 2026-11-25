import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getCvPage } from '../content/cvPages';
import '../styles/cv-page.css';

export default function CvPage({ locale }) {
  const page = getCvPage(locale);
  const isEs = page.locale === 'es';
  const alternatePath = isEs ? '/cv/en' : '/cv/es';
  const alternateLabel = isEs ? 'View in English' : 'Ver en español';
  const printLabel = isEs ? 'Imprimir / Guardar PDF' : 'Print / Save PDF';
  const backLabel = isEs ? 'Volver al portafolio' : 'Back to portfolio';

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
        <div className="cv-page__content">
          <div className="cv-toolbar" role="region" aria-label={isEs ? 'Acciones del CV' : 'CV actions'}>
            <Link to="/" className="cv-toolbar-link">
              <span aria-hidden="true">←</span> {backLabel}
            </Link>
            <div className="cv-toolbar-actions">
              <Link to={alternatePath} className="cv-toolbar-btn" lang={isEs ? 'en' : 'es'}>
                {alternateLabel}
              </Link>
              <button
                type="button"
                className="cv-toolbar-btn cv-toolbar-btn--primary"
                onClick={() => window.print()}
              >
                {printLabel}
              </button>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        </div>
      </main>
    </>
  );
}
