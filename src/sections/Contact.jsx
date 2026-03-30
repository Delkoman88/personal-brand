import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="section-spacing bg-lowest contact-section" style={{ 
      borderTop: '1px solid var(--outline-variant)'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <div style={{ 
          width: '40px', 
          height: '2px', 
          backgroundColor: 'var(--primary-container)',
          marginBottom: '2rem'
        }}></div>

        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to architect the next system?</h2>
        
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.125rem', maxWidth: '600px', marginBottom: '3rem' }}>
          Whether you need to structure an early-stage startup, require deep traceability systems, or want to explore AgTech implementation. Let's build the framework.
        </p>

        <div className="contact-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://linktr.ee/delkoman" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Connect via Linktree
          </a>
          <a href="mailto:delkoman@gmail.com" className="btn-secondary">
            Send an Email
          </a>
        </div>

        <div className="contact-footer" style={{ marginTop: '6rem', color: 'var(--outline)', fontSize: '0.8rem', fontFamily: 'var(--font-label)', letterSpacing: '0.05em' }}>
          © {new Date().getFullYear()} EDGAR MANCILLA SÁNCHEZ // SYSTEMS & OPERATIONS
        </div>
      </div>
    </section>
  );
}
