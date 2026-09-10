import { Link } from 'react-router-dom';
import { homeCopy } from '../content/homeContent';

export default function Hero() {
  return (
    <section className="bg-lowest grid-blueprint hero-section">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="label-text hero-eyebrow">{homeCopy.eyebrow}</p>
          <h1>I build <span className="text-accent-cyan">applications and automations</span> with AI to solve real operational problems.</h1>
          <p className="hero-intro">{homeCopy.intro}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View projects <span aria-hidden="true">↗</span></a>
            <Link to="/cv/en" className="btn-secondary">Read CV in English</Link>
            <Link to="/cv/es" className="hero-cv-link" lang="es">Ver CV en español</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-portrait">
            <img src="/profile.jpg" alt="Edgar Mancilla Sánchez" width="400" height="533" />
          </div>
        </div>
      </div>
    </section>
  );
}
