import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    // Wait for the route content and header height before restoring its anchor.
    const frame = requestAnimationFrame(() => {
      let id = hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Leave malformed hashes literal. */ }
      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
