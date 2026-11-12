import React from 'react';
import Seo from '../components/Seo';
import {
  servicesSeo,
  servicesCopy,
  serviceCases,
  packages,
  methodSteps,
  pricing,
  clientNeeds,
  faqs,
} from '../content/servicesContent';
import { BOOKING_URL, CONTACT_EMAIL, SITE_NAME, SITE_URL } from '../config/site';

export default function ServicesPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: servicesSeo.title,
      description: servicesSeo.description,
      url: `${SITE_URL}/servicios`,
      provider: {
        '@type': 'Person',
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: {
        '@type': 'Country',
        name: 'México',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Agentes y copilotos operativos',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Diagnóstico',
            description: 'Reviso un proceso contigo y te digo si un agente puede hacerse cargo de una parte.',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'MXN',
              price: 0,
            },
          },
          {
            '@type': 'Offer',
            name: 'Agente a la medida',
            description: 'Un solo proceso, a fondo: un sistema con sus propias fuentes, memoria y documentos de control. Precio desde, según alcance.',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'MXN',
              price: 10000,
            },
          },
          {
            '@type': 'Offer',
            name: 'Copiloto operativo',
            description: 'Vive en tu operación diaria: confirma citas, manda recordatorios, reacomoda cancelaciones y lleva la cuenta de lealtad. Precio desde, según alcance.',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'MXN',
              price: 10000,
            },
          },
        ],
      },
      potentialAction: {
        '@type': 'ReserveAction',
        name: 'Agenda una llamada de 30 minutos',
        target: BOOKING_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <>
      <Seo
        title={servicesSeo.title}
        description={servicesSeo.description}
        path="/servicios"
        image="/og-image.png"
        twitterSite="@urbanbeautygarden"
        keywords={servicesSeo.keywords}
        structuredData={structuredData}
        htmlLang="es"
      />

      <main lang="es" className="services-page bg-lowest grid-blueprint">
        <div className="container services-layout">
          <header className="services-hero">
            <span className="label-text services-eyebrow">{servicesCopy.eyebrow}</span>
            <h1>{servicesCopy.headline}</h1>
            <p className="services-lead">
              {servicesCopy.intro}
            </p>
            <p className="services-lead">
              {servicesCopy.introSecond}
            </p>
            <div className="services-actions">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Agenda una llamada de 30 minutos</a>
              <a href="#casos" className="btn-secondary">Ver los casos</a>
            </div>
          </header>

          <section id="casos" aria-labelledby="prueba-heading">
            <div className="section-heading"><h2 id="prueba-heading" className="label-text">{servicesCopy.proofTitle}</h2></div>
            <p className="services-section-intro">{servicesCopy.proofIntro}</p>
            <div className="services-cases-list">
              {serviceCases.map((caseItem) => (
                <details key={caseItem.id} id={caseItem.id} className="services-case-disclosure">
                  <summary>
                    <span>
                      <span className="label-text services-eyebrow">{caseItem.eyebrow}</span>
                      <span className="services-case-summary-title" role="heading" aria-level="3">{caseItem.title}</span>
                      <span className="services-case-summary-description">{caseItem.collapsedSummary}</span>
                      <span className="services-case-badges" aria-label="Indicadores del caso">
                        {caseItem.badges.map((badge) => <span key={badge}>{badge}</span>)}
                      </span>
                      {caseItem.url ? (
                        <a
                          href={caseItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="services-case-summary-link"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {caseItem.summaryLinkLabel ?? 'Ver landing'} <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </span>
                    <span className="services-case-toggle" aria-hidden="true" />
                  </summary>
                  <div className="services-case">
                    <div className="services-case-copy">
                      <p className="services-case-intro">{caseItem.intro}</p>
                      <div className="services-case-details">
                        <div>
                          <h3>{caseItem.problemTitle}</h3>
                          <p>{caseItem.problem}</p>
                        </div>
                        <div>
                          <h3>{caseItem.solutionTitle}</h3>
                          <p>{caseItem.solution}</p>
                        </div>
                      </div>
                      <div className="services-evidence" aria-label={caseItem.evidenceLabel ?? 'Evidencia de uso'}>
                        <strong>{caseItem.usageValue}</strong>
                        <div>
                          <p>{caseItem.usageLabel}</p>
                          <small>{caseItem.usageNote}</small>
                        </div>
                      </div>
                      <p className="services-launch-note">{caseItem.launchNote}</p>
                      <ul className="services-capability-list">
                        {caseItem.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                      </ul>
                      {caseItem.url ? (
                        <a href={caseItem.url} target="_blank" rel="noopener noreferrer" className="btn-secondary services-case-link">
                          {caseItem.linkLabel} <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                    <div className="services-case-gallery" aria-label={`Demostración de ${caseItem.eyebrow.replace('Caso en uso · ', '')}`}>
                      {caseItem.images.map((image, index) => (
                        <figure key={image.src} className={index === 0 ? 'services-case-image services-case-image--primary' : 'services-case-image'}>
                          <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Abrir imagen completa: ${image.alt}`}>
                            <img
                              src={image.src}
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                              loading="lazy"
                            />
                          </a>
                          <figcaption>{image.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="paquetes" aria-labelledby="paquetes-heading">
            <div className="section-heading"><h2 id="paquetes-heading" className="label-text">{servicesCopy.packagesTitle}</h2></div>
            <div className="services-packages-grid">
              {packages.map((pkg) => (
                <article key={pkg.id} className="card-elevated capability-card">
                  <h3>{pkg.name}</h3>
                  <p><strong>{pkg.tagline}</strong></p>
                  <p>{pkg.desc}</p>
                  <p className="services-price">{pkg.price}</p>
                  <p>{`Ideal para: ${pkg.ideal}`}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="para-quien-heading">
            <div className="section-heading"><h2 id="para-quien-heading" className="label-text">{servicesCopy.audienceTitle}</h2></div>
            <p className="services-section-intro">{servicesCopy.audience}</p>
          </section>

          <section id="metodo" aria-labelledby="metodo-heading">
            <div className="section-heading"><h2 id="metodo-heading" className="label-text">{servicesCopy.methodTitle}</h2></div>
            <ol className="services-steps">
              {methodSteps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="inversion" aria-labelledby="inversion-heading">
            <div className="section-heading"><h2 id="inversion-heading" className="label-text">{servicesCopy.pricingTitle}</h2></div>
            <ul>
              {pricing.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="services-section-intro">{pricing.note}</p>
          </section>

          <section aria-labelledby="necesito-heading">
            <div className="section-heading"><h2 id="necesito-heading" className="label-text">{servicesCopy.needsTitle}</h2></div>
            <ul>
              {clientNeeds.map((need) => (
                <li key={need}>{need}</li>
              ))}
            </ul>
          </section>

          <section id="faq" aria-labelledby="faq-heading">
            <div className="section-heading"><h2 id="faq-heading" className="label-text">{servicesCopy.faqTitle}</h2></div>
            <div className="services-faq-list">
              {faqs.map((faq) => (
                <div key={faq.q} className="services-faq-item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="cta-heading">
            <div className="section-heading"><h2 id="cta-heading" className="label-text">{servicesCopy.ctaTitle}</h2></div>
            <p className="services-section-intro">{servicesCopy.ctaText}</p>
            <div className="services-actions">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Agenda una llamada de 30 minutos</a>
              <a href="#casos" className="btn-secondary">Ver los casos</a>
            </div>
            <p className="services-email-fallback">¿Prefieres escribir? <a href={`mailto:${CONTACT_EMAIL}?subject=Llamada de descubrimiento: agente o copiloto operativo`}>{CONTACT_EMAIL}</a></p>
          </section>
        </div>
      </main>
    </>
  );
}
