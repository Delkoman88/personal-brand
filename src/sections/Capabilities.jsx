import React from 'react';

const capabilities = [
  { id: '01', title: 'AI-Native Product Development', desc: 'Using AI as an execution engine — not autocomplete. Context engineering, model orchestration, and structured debugging to ship complete products fast without cutting corners.' },
  { id: '02', title: 'Strategy & Operations', desc: 'Translating high-level company goals into executable operational frameworks and robust daily systems.' },
  { id: '03', title: 'Compliance & Market Readiness', desc: 'Navigating regulatory requirements to build compliance into operational workflows from day one.' },
  { id: '04', title: 'Traceability & Documentation', desc: 'Designing clear records and standard operating procedures (SOPs) for total operational visibility.' },
  { id: '05', title: 'Quality Systems & Process Design', desc: 'Methodological structuring of workflows to guarantee consistency and minimize systemic risks.' },
  { id: '06', title: 'Lab / Technical Operations', desc: 'Hands-on management of complex technical facilities, assuring scientific rigor meets operational output.' },
  { id: '07', title: 'Automation & Workflow Design', desc: 'Implementing technical solutions and AI-driven tools to eliminate operational bottlenecks.' },
  { id: '08', title: 'AgTech & Controlled Environment', desc: 'Building modular production systems and hydroponic workflows for decentralized, localized agriculture.' },
  { id: '09', title: 'Cross-Functional Implementation', desc: 'Aligning business, technical, and regulatory teams toward unified, coherent execution strategies.' },
];

const aiToolGroups = [
  {
    label: 'Anthropic / Claude',
    tools: [
      { icon: '🟣', name: 'Claude Sonnet', role: 'Architecture · Complex code · QA' },
      { icon: '🟣', name: 'Claude Code', role: 'Agentic CLI coding' },
      { icon: '🟣', name: 'Claude Cowork', role: 'Agent orchestration' },
    ],
  },
  {
    label: 'OpenAI',
    tools: [
      { icon: '🟢', name: 'ChatGPT', role: 'Ideation · Drafts · Second opinion' },
      { icon: '🟢', name: 'Codex', role: 'Code generation' },
    ],
  },
  {
    label: 'Google & Local',
    tools: [
      { icon: '🔵', name: 'Gemini', role: 'Cross-review · Long context' },
      { icon: '🟠', name: 'Google Antigravity', role: 'Cloud execution' },
      { icon: '🔵', name: 'NotebookLM', role: 'Research synthesis · Knowledge base' },
      { icon: '🎨', name: 'Stitch', role: 'UI design & prototyping' },
      { icon: '⚙️', name: 'Qwen Code 2.5 7B', role: 'Local inference · Offline tasks' },
    ],
  },
  {
    label: 'Context & Knowledge',
    tools: [
      { icon: '🪨', name: 'Obsidian', role: 'Context management · Knowledge base' },
      { icon: '📋', name: 'Notion', role: 'Product HQ · Documentation' },
    ],
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-spacing-top bg-low">
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

        {/* AI Toolchain block */}
        <div style={{
          marginTop: '3.5rem',
          paddingTop: '3rem',
          borderTop: '1px solid var(--outline-variant)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span className="label-text" style={{ color: 'var(--primary-container)', whiteSpace: 'nowrap' }}>AI Toolchain</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--on-surface-variant)',
            lineHeight: 1.8,
            borderLeft: '2px solid rgba(0, 245, 255, 0.3)',
            paddingLeft: '1rem',
            fontStyle: 'italic',
            marginBottom: '1.5rem',
            maxWidth: '640px',
          }}>
            "I use AI as an execution system, not autocomplete. My workflow includes persistent briefing files per model
            and context systems that guide implementation, debugging, and architectural decisions."
          </p>

          <div className="mobile-scroll-shell">
            <div className="mobile-scroll-indicator">
              <span className="label-text">Swipe to see more tools</span>
            </div>

            <div className="mobile-scroll-cue" aria-hidden="true">
              <span className="mobile-scroll-arrow">&larr;</span>
              <span className="mobile-scroll-arrow">&rarr;</span>
            </div>

            <div className="ai-toolchain-grid">
              {aiToolGroups.map(group => (
                <div key={group.label} className="project-item" style={{
                  padding: '1.5rem',
                  border: '1px solid var(--outline-variant)',
                  backgroundColor: 'rgba(28, 27, 27, 0.4)'
                }}>
                  <span className="label-text" style={{ fontSize: '0.65rem', color: 'var(--outline)', display: 'block', marginBottom: '0.6rem' }}>
                    {group.label}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {group.tools.map(tool => (
                      <div key={tool.name} className="ai-tool-chip">
                        <span style={{ fontSize: '0.9rem' }}>{tool.icon}</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                          <span style={{ fontSize: '0.82rem', color: 'var(--on-surface)', fontWeight: 500 }}>{tool.name}</span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{tool.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
