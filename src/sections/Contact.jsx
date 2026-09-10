import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../config/site';
import { homeCopy } from '../content/homeContent';

export default function Contact() {
  return (
    <section id="contact" className="section-spacing bg-lowest contact-section">
      <div className="container contact-content">
        <h2>{homeCopy.contactTitle}</h2><p>{homeCopy.contact}</p>
        <div className="contact-actions">
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">{CONTACT_EMAIL}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
        <div className="contact-links">
          <Link to="/cv/en">Read CV in English</Link>
          <Link to="/cv/es" lang="es">Ver CV en español</Link>
          <a href="https://linktr.ee/delkoman" target="_blank" rel="noopener noreferrer">More links</a>
        </div>
        <div className="contact-footer">© {new Date().getFullYear()} EDGAR MANCILLA SÁNCHEZ // APPLICATIONS · AUTOMATION · OPERATIONS</div>
      </div>
    </section>
  );
}
