import React from 'react';

const experiences = [
  {
    id: 'TRP',
    company: 'TRYP México',
    role: 'Operations & Process Standardization',
    description: 'An accelerated growth marketplace environment where I led operational improvement, reporting workflows, process standardization, and vendor onboarding structure. Directed coordination across three distribution centers in Mexico, integrating quality and compliance initiatives with actionable automation.',
    tags: ['Operational Improvement', 'Workflow Design', 'Automation', 'Logistics'],
    image: '/tryp.png'
  },
  {
    id: 'TRC',
    company: 'TRACELAB CONSULTING',
    role: 'Business Strategy Consultant | Operations, Compliance & Market Readiness',
    description: 'I support early-stage and growth-stage brands with business strategy, process design, and operational structuring. My work focuses on translating technical, regulatory, and commercial needs into practical systems, clear documentation, and actionable execution frameworks. Our approach helps transform science, compliance, and strong brand positioning into real competitive advantages.',
    tags: ['Business Strategy', 'Market Readiness', 'Regulatory Discipline'],
    image: '/tracelab.png'
  },
  {
    id: 'URL',
    company: 'URBN LEAVES',
    role: 'AgTech Venture — Founder / Operations',
    description: 'A Mexican AgTech venture focused on urban agriculture, hydroponics, and controlled-environment systems. The vision was to decentralize food production by enabling people to use available home space to grow and generate income. Explored modular production systems, traceability, sustainability, and blockchain integration.',
    tags: ['AgTech', 'Hydroponics', 'Sustainability', 'Top 20 Green Innovation'],
    highlights: [
      'Selected by Entrepreneur magazine (2019) as one of the "60 rockstars de los emprendedores"',
      'Invited to Shark Tank (2020)'
    ],
    image: '/urbn.png'
  },
  {
    id: 'BJB',
    company: 'Baja Biotech',
    role: 'Biotech Consultant / Co-Founder (2014-2017)',
    description:
      'At Baja Biotech, I designed and commercialized tailored R&D solutions for biotechnology and molecular biology laboratories across Mexico and the United States. My work focused on genetics and molecular biology, helping connect research institutions in La Jolla, California, with laboratories in Mexico to support technology transfer and applied scientific innovation. I led technical sales, client training, and laboratory setup projects, contributing to cross-border collaboration and practical implementation in life sciences research environments.',
    tags: ['Biotech Consulting', 'Molecular Biology', 'Technology Transfer', 'Lab Setup'],
    image: '/baja-biotech.svg'
  },
  {
    id: 'UBG',
    company: 'URBAN BEAUTY GARDEN',
    role: 'Experimental Urban Agriculture',
    description: 'A living, experimental project combining urban agriculture, practical cultivation, and content creation. I am exploring how to integrate 3D printing into localized food systems through the design and testing of tools and growing solutions for small spaces. The long-term ambition is to establish a restaurant chain centered entirely on locally cultivated ingredients.',
    tags: ['3D Printing', 'Maker Culture', 'Localized Food Systems', '@urbanbeautygarden'],
    image: '/ubg.png'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-spacing bg-surface">
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span className="label-text" style={{ color: 'var(--primary-container)' }}>04 // Selected Experience</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
        </div>

        <div className="mobile-scroll-shell">
          <div className="mobile-scroll-indicator">
            <span className="label-text">Swipe to see more work</span>
          </div>

          <div className="mobile-scroll-cue" aria-hidden="true">
            <span className="mobile-scroll-arrow">&larr;</span>
            <span className="mobile-scroll-arrow">&rarr;</span>
          </div>

          <div className="experience-list" style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item" style={{
               display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
              alignItems: 'start',
              paddingLeft: '2rem',
              borderLeft: '2px solid var(--outline-variant)',
              position: 'relative'
            }}>
              {/* Timeline marker */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-6px',
                width: '10px',
                height: '10px',
                backgroundColor: 'var(--primary-container)'
              }}></div>
              
              {/* Text Side */}
              <div className="experience-copy" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <span className="label-text" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--secondary-container)' }}>
                    [{exp.id}] // {exp.role}
                  </span>
                  <h3 translate="no" className="notranslate" style={{ fontSize: '2rem', margin: 0 }}>{exp.company}</h3>
                </div>

                <p style={{ maxWidth: '800px', fontSize: '1.125rem', color: 'var(--on-surface-variant)', margin: 0 }}>
                  {exp.description}
                </p>

                {exp.highlights && (
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '1.5rem', 
                    color: 'var(--on-surface-variant)',
                    fontSize: '0.95rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {exp.highlights.map((hlt, i) => <li key={i}>{hlt}</li>)}
                  </ul>
                )}

                <div className="experience-tag-list" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {exp.tags.map((tag, i) => (
                    tag === '@urbanbeautygarden' ? (
                      <a
                        key={i}
                        href="https://www.tiktok.com/@urbanbeautygarden"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="experience-tag"
                        style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: 'var(--surface-high)',
                          border: '1px solid rgba(0, 245, 255, 0.3)',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-label)',
                          textTransform: 'uppercase',
                          color: 'var(--primary-container)',
                          textDecoration: 'none',
                          cursor: 'pointer'
                        }}
                      >{tag}</a>
                    ) : (
                      <span key={i} className="experience-tag" style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: 'var(--surface-high)',
                        border: '1px solid rgba(58, 73, 74, 0.3)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-label)',
                        textTransform: 'uppercase',
                        color: 'var(--outline)'
                      }}>{tag}</span>
                    )
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div className="experience-visual" style={{ 
                position: 'relative', 
                width: '100%', 
                aspectRatio: '16/9', 
                border: '1px solid var(--outline-variant)',
                backgroundColor: 'var(--surface-lowest)',
                overflow: 'hidden'
              }}>
                {/* Corner Accents */}
                <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '10px', height: '10px', borderTop: '2px solid var(--primary-container)', borderLeft: '2px solid var(--primary-container)', zIndex: 2}}></div>
                <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', borderBottom: '2px solid var(--primary-container)', borderRight: '2px solid var(--primary-container)', zIndex: 2}}></div>
                
                  <img 
                    src={exp.image} 
                    alt={`${exp.company} visualization`}
                    translate="no"
                    style={{
                      width: '100%',
                      height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(30%) contrast(1.1) brightness(0.8)',
                    mixBlendMode: 'lighten'
                  }}
                />
              </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
