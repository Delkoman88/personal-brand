import React from 'react';

const projects = [
  {
    id: 'BSC',
    name: 'Beauty Studio Copilot',
    meta: 'Solo Builder · Product Engineer · LATAM · 2026 — Present',
    status: 'live',
    url: 'https://beauty-studio-copilot--beauty-studio-copilot.us-east4.hosted.app',
    description:
      'SaaS platform for beauty studios — built solo from zero to production and validated by a real user today. Replaces fragmented WhatsApp + Google Sheets workflows with a structured operating system for beauty businesses.',
    highlights: [
      { num: '20+', label: 'features in prod' },
      { num: '45+', label: 'unit tests' },
      { num: '1', label: 'solo builder' },
    ],
    bullets: [
      'Full management system: multi-tenant auth, client CRM, Google Calendar sync, assisted messaging (WhatsApp), loyalty system, checkout & finances, multi-staff with roles, KPI dashboards, automated reminders, and mobile-first UX.',
      'Full product ownership: definition, UX decisions, implementation, backlog management, debugging, and continuous iteration.',
      'Production monitoring with Sentry, 45+ unit tests, strict TypeScript and ESLint — no shortcuts.',
    ],
    stack: [
      'Next.js App Router', 'TypeScript', 'Firebase Auth', 'Firestore',
      'Cloud Functions', 'Google Calendar API', 'OAuth2', 'Twilio', 'SendGrid', 'Sentry',
    ],
    accentColor: 'linear-gradient(90deg, var(--primary-container), var(--secondary-container))',
  },
  {
    id: 'VS',
    name: 'Viajero Sediento',
    meta: 'Product Builder · Real client · 2026',
    status: 'live',
    url: 'https://sitioviajerosediento--sitioviajerosediento.us-central1.hosted.app',
    description:
      'Mobile-first digital catalog and admin platform for a real tap room — Nordic aesthetic, individual beer sheets, full CRUD with image upload and state management. Staff uses the admin panel daily in operations.',
    highlights: [],
    bullets: [],
    stack: ['Next.js', 'TypeScript', 'Firebase Auth', 'Firestore', 'Firebase Storage', 'App Hosting'],
    accentColor: 'linear-gradient(90deg, #f59e0b, #f97316)',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-spacing bg-low">
      <div className="container">

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span className="label-text" style={{ color: 'var(--primary-container)' }}>03 // Vibe Coding - Shipped Projects</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map(proj => (
            <div
              key={proj.id}
              style={{
                position: 'relative',
                backgroundColor: 'var(--surface-high)',
                border: '1px solid var(--outline-variant)',
                padding: '2rem',
                overflow: 'hidden',
              }}
            >
              {/* Colored top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: proj.accentColor,
              }} />

              {/* Header row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1rem',
                flexWrap: 'wrap',
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', marginBottom: '0.3rem' }}>{proj.name}</h3>
                  <span className="label-text" style={{ fontSize: '0.68rem', color: 'var(--on-surface-variant)' }}>
                    {proj.meta}
                  </span>
                </div>

                {proj.status === 'live' && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-badge"
                  >
                    <span className="project-live-dot" />
                    Live — View project →
                  </a>
                )}
              </div>

              {/* Description */}
              <p style={{
                color: 'var(--on-surface-variant)',
                fontSize: '0.95rem',
                lineHeight: 1.75,
                marginBottom: proj.highlights.length > 0 ? '1.25rem' : '1rem',
              }}>
                {proj.description}
              </p>

              {/* Highlights chips */}
              {proj.highlights.length > 0 && (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {proj.highlights.map(h => (
                    <div key={h.label} className="project-highlight-chip">
                      <span style={{
                        color: 'var(--primary-container)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        fontFamily: 'var(--font-display)',
                      }}>{h.num}</span>
                      <span>{h.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullets */}
              {proj.bullets.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.25rem' }}>
                  {proj.bullets.map((b, i) => (
                    <li key={i} style={{
                      fontSize: '0.875rem',
                      color: 'var(--on-surface-variant)',
                      lineHeight: 1.7,
                      padding: '0.2rem 0 0.2rem 1.1rem',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute', left: 0,
                        color: 'var(--primary-container)', fontWeight: 700,
                      }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* Stack badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {proj.stack.map(s => (
                  <span key={s} className="project-stack-badge">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
