import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SectionDock from './components/SectionDock';
import ScrollToTop from './components/ScrollToTop';
import BlogIndexPage from './pages/BlogIndexPage';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <SectionDock />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </>
  );
}

export default App;
