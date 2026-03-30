import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Seo from '../components/Seo';
import Comments from '../components/Comments';
import { blogPosts, getPostBySlug } from '../content/blogPosts';
import { SITE_NAME, SITE_URL } from '../config/site';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    keywords: post.keywords,
    image: `${SITE_URL}${post.coverImage}`,
    author: {
      '@type': 'Person',
      name: SITE_NAME
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`
  };

  return (
    <>
      <Seo
        title={post.seoTitle}
        description={post.seoDescription}
        path={`/blog/${post.slug}`}
        keywords={post.keywords}
        type="article"
        image={post.coverImage}
        structuredData={structuredData}
      />

      <main className="section-spacing bg-lowest grid-blueprint" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
        <div className="container blog-article-layout">
          <article className="blog-article-main">
            <div className="blog-article-eyebrow">
              <span className="label-text" style={{ color: 'var(--primary-container)' }}>
                {post.category}
              </span>
              <time className="label-text" dateTime={post.publishedAt} style={{ color: 'var(--outline)' }}>
                {post.date} // {post.readTime}
              </time>
            </div>

            <h1 style={{ marginBottom: '1rem' }}>{post.title}</h1>
            <p className="blog-article-lead">{post.excerpt}</p>

            <figure className="blog-cover-frame">
              <img src={post.coverImage} alt={post.coverAlt} className="blog-cover-image" />
            </figure>

            <div className="blog-article-actions">
              <Link to="/blog" className="btn-secondary">Back to blog</Link>
              <a href="mailto:delkoman@gmail.com?subject=I%20read%20your%20article" className="btn-primary">
                Share feedback
              </a>
            </div>

            <div className="blog-article-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>

            <section className="blog-insights-grid" aria-label="Key ideas from article">
              {post.insights.map((insight) => (
                <div key={insight} className="blog-insight-card">
                  <span className="label-text" style={{ color: 'var(--primary-container)' }}>Key idea</span>
                  <p>{insight}</p>
                </div>
              ))}
            </section>
            
            <Comments />
          </article>

          <aside className="blog-article-sidebar">
            <div className="blog-sidebar-card">
              <span className="label-text" style={{ color: 'var(--secondary-container)' }}>More writing</span>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {relatedPosts.map((item) => (
                  <Link key={item.slug} to={`/blog/${item.slug}`} className="blog-related-link">
                    <span className="label-text" style={{ color: 'var(--outline)' }}>{item.category}</span>
                    <strong>{item.title}</strong>
                    <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem' }}>{item.excerpt}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
