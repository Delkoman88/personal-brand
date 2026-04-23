import React from 'react';

export default function About() {
  return (
    <section id="about" className="section-spacing bg-surface">
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <span className="label-text" style={{ color: 'var(--primary-container)' }}>01 // Profile</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--on-surface)' }}>
            I build AI-native products and operational systems. Two capabilities, one execution mindset.
          </h2>

          <div style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--outline-variant)' }}>
            <p style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>
              The Biotech PhD gave me analytical rigor and systems thinking. The years in high-growth, regulated environments gave me operational judgment. And AI became the execution engine that connects both — letting me build complete digital products, fast, without cutting corners.
            </p>
            <p style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)' }}>
              I work at the intersection of <span style={{ color: 'var(--on-surface)' }}>product, operations, and AI execution</span> — using vibe coding and multi-model workflows to turn ambiguous problems into real, shipped software while keeping the process discipline that complex environments demand.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
