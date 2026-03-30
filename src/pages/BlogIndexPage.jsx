import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { blogPosts } from '../content/blogPosts';
import { SITE_NAME, SITE_URL } from '../config/site';

export default function BlogIndexPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Field Notes',
    url: `${SITE_URL}/blog`,
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
  };

  return (
    <>
      <Seo
        title={`Blog | ${SITE_NAME}`}
        description="Read essays, notes, ideas, projects, and general interests by Edgar Mancilla Sanchez."
        path="/blog"
        image="/blog/cover-ideas.svg"
        keywords={['blog', 'essays', 'ideas', 'writing', 'Edgar Mancilla Sanchez']}
        structuredData={structuredData}
      />

      <main className="section-spacing bg-lowest grid-blueprint" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
        <div className="container" style={{ display: 'grid', gap: '3rem' }}>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '760px' }}>
            <span className="label-text" style={{ color: 'var(--primary-container)' }}>Field Notes</span>
            <h1 style={{ margin: 0 }}>A running collection of essays, notes, interests, and observations.</h1>
            <p style={{ margin: 0, color: 'var(--on-surface-variant)', fontSize: '1.05rem' }}>
              This is the full blog index: a place for practical thinking, personal curiosities, projects,
              references, and whatever feels worth publishing.
            </p>
          </div>

          <section className="blog-index-grid" aria-label="Blog posts index">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-index-card">
                <Link to={`/blog/${post.slug}`} className="blog-card-cover-link" aria-label={`Open article ${post.title}`}>
                  <img src={post.coverImage} alt={post.coverAlt} className="blog-card-cover" />
                </Link>
                <div className="blog-article-eyebrow">
                  <span className="label-text" style={{ color: 'var(--primary-container)' }}>{post.category}</span>
                  <time className="label-text" dateTime={post.publishedAt} style={{ color: 'var(--outline)' }}>
                    {post.date} // {post.readTime}
                  </time>
                </div>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <h2 style={{ margin: 0, fontSize: '1.6rem' }}>{post.title}</h2>
                  <p style={{ margin: 0, color: 'var(--on-surface-variant)' }}>{post.excerpt}</p>
                </div>

                <div className="blog-index-tags">
                  {post.keywords.slice(0, 3).map((keyword) => (
                    <span key={keyword} className="blog-keyword-chip">{keyword}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to={`/blog/${post.slug}`} className="btn-primary">Read article</Link>
                  <Link to="/#blog" className="btn-secondary">Home</Link>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
