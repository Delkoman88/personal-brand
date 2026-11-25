import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_NAME } from '../config/site';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title={`Page not found | ${SITE_NAME}`}
        description="The page you requested does not exist on edgarmancilla.com."
        path="/404"
      />
      <main className="not-found-page bg-lowest grid-blueprint">
        <div className="container not-found-shell">
          <span className="label-text text-accent-cyan">404 · Route not found</span>
          <h1>This page does not exist.</h1>
          <p className="not-found-copy">
            The link may be outdated or mistyped. You can head back to the portfolio, explore AI agent services, or read Field Notes.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn-primary">Back to home</Link>
            <Link to="/servicios" className="btn-secondary">Ver servicios</Link>
            <Link to="/blog" className="btn-secondary">Field Notes</Link>
            <Link to="/cv/en" className="hero-cv-link">Read CV</Link>
          </div>
        </div>
      </main>
    </>
  );
}
