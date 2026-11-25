import { Link } from 'react-router-dom';
import { capabilities, homeCopy, toolGroups } from '../content/homeContent';

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-spacing bg-low" aria-labelledby="capabilities-heading">
      <div className="container">
        <div className="section-heading">
          <h2 id="capabilities-heading" className="label-text">Capabilities &amp; tools</h2>
        </div>
        <div className="capabilities-grid">
          {capabilities.map((cap) => (
            <div key={cap.title} className="card-elevated capability-card">
              <h3>{cap.title}</h3>
              <p>{cap.desc}</p>
            </div>
          ))}
        </div>
        <div className="tools-summary">
          <h3>How I build</h3>
          {homeCopy.workflow.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="tools-list">
            {toolGroups.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.tools}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="services-promo" lang="es">
          <div className="services-promo-copy">
            <span className="services-promo-badge">ES · México</span>
            <p>¿Necesitas un agente para un proceso concreto?</p>
          </div>
          <Link to="/servicios">
            Ver servicios de agentes de IA <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
