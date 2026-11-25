import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SectionDock from './components/SectionDock';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';

const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const CvPage = lazy(() => import('./pages/CvPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteFallback() {
  return (
    <main className="route-fallback bg-lowest" aria-busy="true">
      <div className="container">
        <span className="label-text text-accent-cyan">Loading…</span>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <SectionDock />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cv/en" element={<CvPage locale="en" />} />
          <Route path="/cv/es" element={<CvPage locale="es" />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
