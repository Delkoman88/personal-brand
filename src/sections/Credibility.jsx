import React from 'react';

const highlights = [
  'Operations and Process Standardization',
  'Reporting Workflows and Quality Systems',
  'Operational Problem Solving',
  'Traceability and Documentation Processes',
  'AgTech and Urban Agriculture',
  'Client-Facing Communication & Strategy',
  'Startup and High-Growth Environments',
  'Python & AI Tools for Automation',
  'AI Tools for Workflow Optimization and Research'
];

export default function Credibility() {
  return (
    <section id="credibility" className="section-spacing bg-surface grid-blueprint">
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span className="label-text" style={{ color: 'var(--primary-container)' }}>05 // Credibility & Substance</span>
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
