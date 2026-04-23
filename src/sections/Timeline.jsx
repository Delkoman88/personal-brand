import React from 'react';

const timelineData = [
  { year: '2025–Present', title: 'TraceLab Consulting' },
  { year: '2022–2025', title: 'Tryp México' },
  { year: '2017–2022', title: 'Urbn Leaves' },
  { year: '2014–2017', title: 'Baja Biotech' },
  { year: '2013–2019', title: 'Academic Research' },
  { year: '2011–2013', title: 'INC Research / Syneos Health' }
];

export default function Timeline() {
  return (
    <section id="timeline" className="section-spacing bg-low">
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span className="label-text" style={{ color: 'var(--primary-container)' }}>05 // Historical Timeline</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
        </div>

        <div className="mobile-scroll-shell">
          <div className="mobile-scroll-indicator">
            <span className="label-text">Swipe through the timeline</span>
          </div>

          <div className="mobile-scroll-cue" aria-hidden="true">
            <span className="mobile-scroll-arrow">&larr;</span>
            <span className="mobile-scroll-arrow">&rarr;</span>
          </div>

          <div className="timeline-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item" style={{
               display: 'flex',
                alignItems: 'baseline',
               padding: '1.5rem',
              backgroundColor: 'var(--surface-high)', // card elevated basically without hover effects
              border: '1px solid rgba(58, 73, 74, 0.15)',
              gap: '2rem'
            }}>
              <span className="label-text" style={{ flex: '0 0 150px', color: 'var(--outline)' }}>{item.year}</span>
              <span translate="no" className="notranslate" style={{ fontSize: '1.125rem', fontFamily: 'var(--font-display)', fontWeight: 500 }}>{item.title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
