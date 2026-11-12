import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  servicesSeo,
  servicesCopy,
  packages,
  proofCases,
  methodSteps,
  pricing,
  clientNeeds,
  faqs,
} from '../content/servicesContent';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '../config/site';

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

      <main lang="es" className="services-page section-spacing bg-lowest grid-blueprint" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
        <div className="container" style={{ display: 'grid', gap: '3rem' }}>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '760px' }}>
            <span className="label-text" style={{ color: 'var(--primary-container)' }}>{servicesCopy.eyebrow}</span>
            <h1 style={{ margin: 0 }}>{servicesCopy.headline}</h1>
            <p style={{ margin: 0, color: 'var(--on-surface-variant)', fontSize: '1.05rem' }}>
              {servicesCopy.intro}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${CONTACT_EMAIL}?subject=Llamada de descubrimiento: agente o copiloto operativo`} className="btn-primary">Agenda una llamada de descubrimiento</a>
              <Link to="/#projects" className="btn-secondary">Ver los casos</Link>
            </div>
          </div>

          <section aria-labelledby="prueba-heading">
            <div className="section-heading"><h2 id="prueba-heading" className="label-text">{servicesCopy.proofTitle}</h2></div>
            <p style={{ color: 'var(--on-surface-variant)', maxWidth: '760px' }}>{servicesCopy.proofIntro}</p>
            <div className="capabilities-grid">
              {proofCases.map((proof) => (
                <div key={proof.name} className="card-elevated capability-card">
                  <h3>{proof.name}</h3>
                  <p>{proof.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="paquetes" aria-labelledby="paquetes-heading">
            <div className="section-heading"><h2 id="paquetes-heading" className="label-text">{servicesCopy.packagesTitle}</h2></div>
            <div className="capabilities-grid">
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
            <p style={{ color: 'var(--on-surface-variant)', maxWidth: '760px' }}>{servicesCopy.audience}</p>
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
            <p style={{ color: 'var(--on-surface-variant)', maxWidth: '760px' }}>{pricing.note}</p>
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
            <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '760px' }}>
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
            <p style={{ color: 'var(--on-surface-variant)', maxWidth: '760px' }}>{servicesCopy.ctaText}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${CONTACT_EMAIL}?subject=Llamada de descubrimiento: agente o copiloto operativo`} className="btn-primary">{CONTACT_EMAIL}</a>
              <Link to="/#projects" className="btn-secondary">Ver los casos</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
