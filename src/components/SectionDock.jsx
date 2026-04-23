import React from 'react';
import { useLocation } from 'react-router-dom';

const sections = [
  { id: '', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Focus' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Work' },
  { id: 'timeline', label: 'Path' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
];

export default function SectionDock() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCvPage = location.pathname.startsWith('/cv/');

  if (isCvPage) {
    return null;
  }

  return (
    <div className="section-dock" aria-label="Quick section navigation">
      {sections.map((section) => {
        const href = section.id ? (isHome ? `#${section.id}` : `/#${section.id}`) : '/';

        return (
          <a key={section.label} href={href} className="section-dock-link">
            {section.label}
          </a>
        );
      })}
    </div>
  );
}
