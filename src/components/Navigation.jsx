import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const header = useRef(null);
  const { pathname } = useLocation();
  const sectionHref = (id) => pathname === '/' ? `#${id}` : `/#${id}`;

  useEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.current.getBoundingClientRect().height}px`);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--header-height');
    };
  }, []);

  return (
    <nav ref={header} className="site-navigation" aria-label="Main navigation">
      <div className="site-navigation-inner">
        <Link to="/" className="site-brand">
          <span>EDGAR MANCILLA SANCHEZ</span>
          <span className="label-text">Applications · Automation · Operations</span>
        </Link>
        <div className="site-nav-links">
          <a href={sectionHref('projects')} className="nav-projects">Projects</a>
          <a href={sectionHref('biotech-agtech')}>Biotech & AgTech</a>
          <a href={sectionHref('about')}>Profile</a>
          <a href={sectionHref('experience')}>Experience</a>
          <Link to="/blog">Blog</Link>
          <Link to="/servicios">Servicios</Link>
          <a href={sectionHref('contact')}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
