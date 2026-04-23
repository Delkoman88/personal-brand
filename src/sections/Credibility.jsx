import React from 'react';

const highlights = [
  'AI-Native Product Development',
  'Vibe Coding & Multi-Model Orchestration',
  'Solo Builder — Zero to Production',
  'Context Engineering & Structured AI Workflows',
  'Operations & Process Standardization',
  'Compliance & Regulatory Systems',
  'Traceability & Documentation',
  'AgTech & Urban Agriculture',
  'Startup & High-Growth Environments',
];

export default function Credibility() {
  return (
    <section id="credibility" className="section-spacing bg-surface grid-blueprint">
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span className="label-text" style={{ color: 'var(--primary-container)' }}>06 // Credibility & Substance</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
        </div>

        <div className="mobile-scroll-shell">
          <div className="mobile-scroll-indicator">
            <span className="label-text">Swipe for more highlights</span>
          </div>

          <div className="mobile-scroll-cue" aria-hidden="true">
            <span className="mobile-scroll-arrow">&larr;</span>
            <span className="mobile-scroll-arrow">&rarr;</span>
          </div>

          <div className="credibility-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1rem' 
          }}>
            {highlights.map((text, idx) => (
              <div key={idx} className="credibility-item" style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(28, 27, 27, 0.4)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--outline-variant)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ width: '4px', height: '4px', backgroundColor: 'var(--primary-dim)' }}></div>
                <span style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
