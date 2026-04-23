import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-lowest grid-blueprint hero-section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle ambient light from top left */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, rgba(19, 19, 19, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div className="container hero-layout" style={{ 
        position: 'relative', 
        zIndex: 1, 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4rem',
        flexWrap: 'wrap'
      }}>
        {/* Left Column: Text */}
        <div className="hero-copy" style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-container)' }}></div>
            <span className="label-text" style={{ color: 'var(--on-surface-variant)' }}>Vibe Coder · AI-Native Builder · Ops Architect</span>
          </div>

          <h1 style={{ marginBottom: '1.5rem' }}>
            Biotech PhD. Building <span className="text-accent-cyan" style={{ display: 'inline-block' }}>AI-native products</span> for complex environments.
          </h1>

          <p style={{
            fontSize: '1.125rem',
            color: 'var(--on-surface-variant)',
            marginBottom: '2rem',
            maxWidth: '600px'
          }}>
            Operating at the intersection of science, product, and execution. I use AI as an execution engine to turn ambiguous problems into real, shipped software — fast.
          </p>

          {/* Stat bar */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--outline-variant)'
          }}>
            {[
              { num: '3', label: 'Products in production' },
              { num: '10+', label: 'AI models in workflow' },
              { num: '12+', label: 'Years building ventures' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--primary-container)',
                  lineHeight: 1
                }}>{s.num}</span>
                <span className="label-text" style={{ fontSize: '0.68rem', color: 'var(--on-surface-variant)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-signal-grid">
            <span className="hero-signal-pill">Vibe Coder</span>
            <span className="hero-signal-pill">AI Builder</span>
            <span className="hero-signal-pill">AgTech</span>
            <span className="hero-signal-pill">Compliance</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/cv/es" className="btn-primary">Ver CV en español</Link>
            <Link to="/cv/en" className="btn-secondary">Read CV in English</Link>
          </div>
        </div>

        {/* Right Column: Photo Integration */}
        <div className="hero-visual" style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div className="hero-portrait" style={{
             position: 'relative',
             width: '100%',
             maxWidth: '400px',
             aspectRatio: '3/4',
             backgroundColor: 'var(--surface-high)',
             border: '1px solid var(--outline-variant)'
          }}>
            {/* Corner Accents (Technical look) */}
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '10px', height: '10px', borderTop: '2px solid var(--primary-container)', borderLeft: '2px solid var(--primary-container)', zIndex: 2}}></div>
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', borderBottom: '2px solid var(--primary-container)', borderRight: '2px solid var(--primary-container)', zIndex: 2}}></div>
            
            <img 
              src="/profile.jpg" 
              alt="Edgar Mancilla Sánchez" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(60%) contrast(1.1) brightness(0.9)', /* Cold/dark treatment */
                mixBlendMode: 'lighten' /* Blends with dark background */
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback if image doesn't load */}
            <div style={{
              display: 'none',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'var(--outline-variant)'
            }}>
              <span className="label-text">IMAGE DATA NOT FOUND</span>
              <span style={{fontSize: '0.7rem', opacity: 0.5}}>src/assets/profile.jpg</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
