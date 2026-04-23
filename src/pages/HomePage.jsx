import React from 'react';
import About from '../sections/About';
import Blog from '../sections/Blog';
import Capabilities from '../sections/Capabilities';
import Contact from '../sections/Contact';
import Credibility from '../sections/Credibility';
import Hero from '../sections/Hero';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Timeline from '../sections/Timeline';
import Seo from '../components/Seo';
import { blogPosts } from '../content/blogPosts';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../config/site';

export default function HomePage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Field Notes',
      url: `${SITE_URL}/#blog`,
      description: 'Essays, notes, ideas, projects, and general interests by Edgar Mancilla Sanchez.',
      author: {
        '@type': 'Person',
        name: SITE_NAME
      },
      blogPost: blogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.publishedAt,
        articleSection: post.category,
        description: post.excerpt,
        url: `${SITE_URL}/blog/${post.slug}`
      }))
    }
  ];

  return (
    <>
      <Seo
        title="Edgar Mancilla Sanchez | Vibe Coder · AI-Native Builder · Biotech PhD"
        description={SITE_DESCRIPTION}
        path="/"
        image="/og-image.png"
        twitterSite="@urbanbeautygarden"
        keywords={['Edgar Mancilla Sanchez', 'vibe coder', 'AI-native builder', 'biotech phd', 'systems', 'compliance', 'AgTech', 'strategy and operations', 'traceability', 'quality systems', 'automation', 'vibe coding']}
        structuredData={structuredData}
      />
      <Hero />
      <About />
      <Capabilities />
      <Projects />
      <Experience />
      <Timeline />
      <Credibility />
      <Blog />
      <Contact />
    </>
  );
}
