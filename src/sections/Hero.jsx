import { Link } from 'react-router-dom';
import { homeCopy } from '../content/homeContent';

export default function Hero() {
  return (
    <section id="top" className="bg-lowest grid-blueprint hero-section">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="label-text hero-eyebrow hero-stagger-1">{homeCopy.eyebrow}</p>
          <h1 className="hero-stagger-2">{homeCopy.headline}</h1>
          <p className="hero-intro hero-stagger-3">{homeCopy.intro}</p>
          <div className="hero-actions hero-stagger-4">
            <a href="#projects" className="btn-primary">
              View projects <span aria-hidden="true">↗</span>
            </a>
            <Link to="/cv/en" className="btn-secondary">Read CV in English</Link>
            <Link to="/cv/es" className="hero-cv-link" lang="es">Ver CV en español</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-portrait">
            <div className="hero-portrait-frame">
              <picture>
                <source srcSet="/profile.webp" type="image/webp" />
                <img
                  src="/profile.jpg"
                  alt="Edgar Mancilla Sánchez"
                  width="400"
                  height="533"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
