import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HOME_SECTION_IDS = ['projects', 'about', 'capabilities', 'experience', 'biotech-agtech', 'timeline', 'credibility', 'blog', 'contact'];

export default function Navigation() {
  const header = useRef(null);
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === '/';
  const sectionHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const updateHeight = () => {
      if (!header.current) return;
      document.documentElement.style.setProperty('--header-height', `${header.current.getBoundingClientRect().height}px`);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (header.current) {
      observer.observe(header.current);
    }
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--header-height');
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const elements = HOME_SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-22% 0px -58% 0px', threshold: [0.1, 0.3, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const isSectionActive = (id) => isHome && activeSection === id;

  return (
    <nav ref={header} className={`site-navigation${isScrolled ? ' is-scrolled' : ''}`} aria-label="Main navigation">
      <div className="site-navigation-inner">
        <Link to="/" className="site-brand">
          <span className="site-brand-name">EDGAR MANCILLA SANCHEZ</span>
          <span className="label-text">Applied AI · Operations · Biotech</span>
        </Link>
        <div className="site-nav-links">
          <a
            href={sectionHref('projects')}
            className={`site-nav-link${isSectionActive('projects') ? ' is-active' : ''}`}
            aria-current={isSectionActive('projects') ? 'location' : undefined}
          >
            Projects
          </a>
          <a
            href={sectionHref('biotech-agtech')}
            className={`site-nav-link${isSectionActive('biotech-agtech') ? ' is-active' : ''}`}
            aria-current={isSectionActive('biotech-agtech') ? 'location' : undefined}
          >
            Biotech &amp; AgTech
          </a>
          <a
            href={sectionHref('about')}
            className={`site-nav-link${isSectionActive('about') ? ' is-active' : ''}`}
            aria-current={isSectionActive('about') ? 'location' : undefined}
          >
            Profile
          </a>
          <a
            href={sectionHref('experience')}
            className={`site-nav-link${isSectionActive('experience') ? ' is-active' : ''}`}
            aria-current={isSectionActive('experience') ? 'location' : undefined}
          >
            Experience
          </a>
          <Link
            to="/blog"
            className={`site-nav-link${pathname.startsWith('/blog') ? ' is-active' : ''}`}
            aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
          >
            Blog
          </Link>
          <Link
            to="/servicios"
            className={`site-nav-link${pathname === '/servicios' ? ' is-active' : ''}`}
            aria-current={pathname === '/servicios' ? 'page' : undefined}
          >
            Servicios
          </Link>
          <a
            href={sectionHref('contact')}
            className={`site-nav-link${isSectionActive('contact') ? ' is-active' : ''}`}
            aria-current={isSectionActive('contact') ? 'location' : undefined}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
