import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const getSectionHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      borderBottom: scrolled ? '1px solid var(--outline-variant)' : 'none',
      backgroundColor: scrolled ? 'rgba(19, 19, 19, 0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
      padding: '1.5rem 5%'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <div style={{
          display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center'
        }}>
        {/* Brand/Logo Area */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to="/" style={{ 
            textDecoration: 'none',
            display: 'inline-flex',
            flexDirection: 'column'
          }}>
            <span style={{ 
             fontFamily: 'var(--font-display)', 
             fontWeight: 700, 
             fontSize: '1.25rem',
             letterSpacing: '-0.02em',
             color: 'var(--on-surface)'
            }}>EDGAR MANCILLA SANCHEZ</span>
            <span className="label-text" style={{ fontSize: '0.7rem', color: 'var(--primary-container)' }}>
              BIOTECH PHD // VENTURE BUILDER, BUSINESS STRATEGY & AGTECH
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="nav-links">
          <a href={getSectionHref('about')} className="label-text" style={{ textDecoration: 'none' }}>About</a>
          <a href={getSectionHref('capabilities')} className="label-text" style={{ textDecoration: 'none' }}>Capabilities</a>
          <a href={getSectionHref('experience')} className="label-text" style={{ textDecoration: 'none' }}>Experience</a>
          <Link to="/blog" className="label-text" style={{ textDecoration: 'none' }}>Blog</Link>
          <a href={getSectionHref('contact')} className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>Engage</a>
        </div>
        </div>

        <div className="mobile-nav-row" style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          <a href={getSectionHref('about')} className="mobile-nav-pill">Profile</a>
          <a href={getSectionHref('experience')} className="mobile-nav-pill">Work</a>
          <Link to="/blog" className="mobile-nav-pill">Blog</Link>
          <a href={getSectionHref('contact')} className="mobile-nav-pill">Contact</a>
        </div>
        
        {/* Simple CSS block for nav mobile visibility (in a real app, use CSS modules, but inline is fine for this single component's scoping) */}
        <style dangerouslySetInnerHTML={{__html: `
          .mobile-nav-pill {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
            padding: 0.6rem 0.9rem;
            border: 1px solid rgba(58, 73, 74, 0.5);
            background: rgba(28, 27, 27, 0.72);
            text-decoration: none;
            color: var(--on-surface-variant);
            font-family: var(--font-label);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.72rem;
          }

          @media (min-width: 768px) {
            .nav-links { display: flex !important; }
            .mobile-nav-row { display: none !important; }
          }
        `}} />
      </div>
    </nav>
  );
}
