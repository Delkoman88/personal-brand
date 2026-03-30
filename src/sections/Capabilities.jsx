import React from 'react';

const capabilities = [
  { id: '01', title: 'Strategy & Operations', desc: 'Translating high-level company goals into executable operational frameworks and robust daily systems.' },
  { id: '02', title: 'Compliance & Market Readiness', desc: 'Navigating regulatory requirements to build compliance into operational workflows from day one.' },
  { id: '03', title: 'Traceability & Documentation', desc: 'Designing clear records and standard operating procedures (SOPs) for total operational visibility.' },
  { id: '04', title: 'Quality Systems & Process Design', desc: 'Methodological structuring of workflows to guarantee consistency and minimize systemic risks.' },
  { id: '05', title: 'Lab / Technical Operations', desc: 'Hands-on management of complex technical facilities, assuring scientific rigor meets operational output.' },
  { id: '06', title: 'Automation & Workflow Design', desc: 'Implementing technical solutions and AI-driven tools to eliminate operational bottlenecks.' },
  { id: '07', title: 'AgTech & Controlled Environment', desc: 'Building modular production systems and hydroponic workflows for decentralized, localized agriculture.' },
  { id: '08', title: 'Cross-Functional Implementation', desc: 'Aligning business, technical, and regulatory teams toward unified, coherent execution strategies.' }
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-spacing bg-low">
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span className="label-text" style={{ color: 'var(--primary-container)' }}>02 // Core Capabilities</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
        </div>

        <div className="mobile-scroll-shell">
          <div className="mobile-scroll-indicator">
            <span className="label-text">Swipe to explore more cards</span>
          </div>

          <div className="mobile-scroll-cue" aria-hidden="true">
            <span className="mobile-scroll-arrow">&larr;</span>
            <span className="mobile-scroll-arrow">&rarr;</span>
          </div>

          <div className="capabilities-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {capabilities.map(cap => (
              <div key={cap.id} className="card-elevated capability-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span className="label-text" style={{ color: 'var(--secondary-container)' }}>SYS_{cap.id}</span>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{cap.title}</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', margin: 0 }}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
