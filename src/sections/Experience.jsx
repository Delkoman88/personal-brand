import React from 'react';

import { experienceGroups } from '../content/experience';

function ExperienceGroup({ id, title, items: experiences }) {
  return (
    <section id={id} className="section-spacing bg-surface" aria-labelledby={`${id}-heading`}>
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <h2 id={`${id}-heading`} className="label-text" style={{ color: 'var(--primary-container)', margin: 0 }}>{title}</h2>
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
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
                  <span className="label-text" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--on-surface-variant)' }}>
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

                {exp.links && (
                  <div className="experience-links">
                    {exp.links.map(link => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
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

export default function Experience() {
  return <>{experienceGroups.map(group => <ExperienceGroup key={group.id} {...group} />)}</>;
}
