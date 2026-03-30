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
            I am an interdisciplinary professional navigating the complex intersections of science, technology, and operational realities.
          </h2>
          
          <div style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--outline-variant)' }}>
            <p style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>
              My background as a Biotech PhD provided the analytical rigor. My experience in high-growth operational environments and regulated industries built the strategic execution. I am a hands-on builder, systems-oriented, and execution-heavy.
            </p>
            <p style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)' }}>
              I focus on <span style={{ color: 'var(--on-surface)' }}>process design, operational implementation, quality systems, documentation, workflow design, and automation</span> within complex and regulated environments. My approach centers on turning chaos into functioning, scalable architectures that enable strong decision-making and cross-functional alignment.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
