import { Link } from 'react-router-dom';
import { capabilities, homeCopy, toolGroups } from '../content/homeContent';

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-spacing bg-low" aria-labelledby="capabilities-heading">
      <div className="container">
        <div className="section-heading"><h2 id="capabilities-heading" className="label-text">03 // Capabilities & tools</h2></div>
        <div className="mobile-scroll-shell">
          <div className="mobile-scroll-indicator"><span className="label-text">Swipe to explore more cards</span></div>
          <div className="capabilities-grid">
            {capabilities.map(cap => (
              <div key={cap.title} className="card-elevated capability-card">
                <h3>{cap.title}</h3><p>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="tools-summary">
          <h3>How I build</h3><p>{homeCopy.workflow}</p>
          <dl className="tools-list">
            {toolGroups.map(group => <div key={group.label}><dt>{group.label}</dt><dd>{group.tools}</dd></div>)}
          </dl>
        </div>
        <div className="services-promo">
          <p>¿Necesitas un agente para un proceso concreto?</p>
          <Link to="/servicios">Ver servicios de agentes de IA <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
