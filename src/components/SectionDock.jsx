import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const sections = [
  { id: 'top', label: 'Top' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'Profile' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'experience', label: 'Experience' },
  { id: 'biotech-agtech', label: 'Biotech' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionDock() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState('projects');

  useEffect(() => {
    if (!isHome) return undefined;

    const handleScroll = () => {
      setVisible(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return undefined;

    const observed = sections
      .filter((section) => section.id !== 'top')
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (!observed.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (best[0]) {
          setActiveId(best[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  if (!isHome) {
    return null;
  }

  return (
    <nav className={`section-dock${visible ? ' is-visible' : ''}`} aria-label="Quick section navigation">
      {sections.map((section) => {
        if (section.id === 'top') {
          return (
            <button
              key={section.id}
              type="button"
              className="section-dock-link"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {section.label}
            </button>
          );
        }

        const isActive = activeId === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`section-dock-link${isActive ? ' is-active' : ''}`}
            aria-current={isActive ? 'location' : undefined}
          >
            {section.label}
          </a>
        );
      })}
    </nav>
  );
}
