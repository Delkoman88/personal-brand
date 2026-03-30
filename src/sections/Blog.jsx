import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../content/blogPosts';

export default function Blog() {
  const [activePostId, setActivePostId] = useState(blogPosts[0].id);
  const navigate = useNavigate();

  const activePost = useMemo(
    () => blogPosts.find((post) => post.id === activePostId) ?? blogPosts[0],
    [activePostId]
  );

  return (
    <section id="blog" className="section-spacing bg-lowest grid-blueprint">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span className="label-text" style={{ color: 'var(--primary-container)' }}>06 // Field Notes</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--outline-variant)' }}></div>
        </div>

        <div className="blog-shell">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span className="label-text" style={{ color: 'var(--secondary-container)' }}>Editorial Feed</span>
            <h2 style={{ maxWidth: '14ch', margin: 0 }}>
              A space to publish ideas, curiosities, and things I genuinely like.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--on-surface-variant)', maxWidth: '62ch', margin: 0 }}>
              This section is more open: essays, notes, references, personal interests, work reflections,
              and whatever feels worth sharing at the moment.
            </p>

            <article id={activePost.slug} className="blog-featured-card blog-featured-desktop">
              <header className="blog-featured-header" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="label-text" style={{ color: 'var(--primary-container)' }}>
                  [{activePost.id}] // {activePost.category}
                </span>
                <time className="label-text" dateTime={activePost.publishedAt} style={{ color: 'var(--outline)' }}>
                  {activePost.date} // {activePost.readTime}
                </time>
              </header>

              <div className="blog-featured-intro" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 className="blog-featured-title" style={{ margin: 0, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>{activePost.title}</h3>
                <p className="blog-featured-excerpt" style={{ margin: 0, color: 'var(--on-surface-variant)', fontSize: '1.05rem' }}>
                  {activePost.excerpt}
                </p>
              </div>

              <img src={activePost.coverImage} alt={activePost.coverAlt} className="blog-card-cover" />

              <div className="blog-featured-preview" style={{ display: 'grid', gap: '1rem' }}>
                {activePost.previewBody.map((paragraph) => (
                  <p key={paragraph} style={{ margin: 0, color: 'var(--on-surface-variant)' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="blog-featured-insights" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {activePost.insights.map((insight) => (
                  <section key={insight} className="blog-featured-insight" aria-label="Key insight" style={{
                    padding: '1rem',
                    border: '1px solid var(--outline-variant)',
                    backgroundColor: 'rgba(28, 27, 27, 0.72)'
                  }}>
                    <span className="label-text" style={{ color: 'var(--primary-container)', display: 'block', marginBottom: '0.5rem' }}>
                      Note
                    </span>
                    <p style={{ margin: 0, color: 'var(--on-surface)', fontSize: '0.95rem' }}>{insight}</p>
                  </section>
                ))}
              </div>

              <div className="blog-featured-mobile-meta">
                <span className="label-text" style={{ color: 'var(--outline)' }}>
                  {activePost.readTime} // {activePost.category}
                </span>
              </div>

              <div className="blog-featured-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`/blog/${activePost.slug}`} className="btn-primary">Read full article</Link>
                <Link to="/blog" className="btn-secondary">Browse all posts</Link>
                <a href="#contact" className="btn-secondary">Share an idea</a>
              </div>
            </article>

            <article className="blog-featured-mobile-card">
              <img src={activePost.coverImage} alt={activePost.coverAlt} className="blog-featured-mobile-cover" />

              <div className="blog-featured-mobile-copy">
                <span className="label-text" style={{ color: 'var(--primary-container)' }}>
                  [{activePost.id}] // {activePost.category}
                </span>
                <h3 className="blog-featured-mobile-title">{activePost.title}</h3>
                <p className="blog-featured-mobile-excerpt">{activePost.excerpt}</p>
                <time className="label-text" dateTime={activePost.publishedAt} style={{ color: 'var(--outline)' }}>
                  {activePost.date} // {activePost.readTime}
                </time>
              </div>

              <div className="blog-featured-mobile-actions">
                <Link to={`/blog/${activePost.slug}`} className="btn-primary">Read full post</Link>
                <Link to="/blog" className="btn-secondary">All posts</Link>
              </div>
            </article>
          </div>

          <aside className="blog-list-panel">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span className="label-text" style={{ color: 'var(--outline)' }}>Latest Posts</span>
              <p style={{ margin: 0, color: 'var(--on-surface-variant)', fontSize: '0.95rem' }}>
                Select an entry to preview the full note inside the page.
              </p>
            </div>

            <div className="mobile-scroll-shell mobile-scroll-shell-blog">
              <div className="mobile-scroll-cue mobile-scroll-cue-blog" aria-hidden="true">
                <span className="mobile-scroll-arrow">&larr;</span>
                <span className="mobile-scroll-arrow">&rarr;</span>
              </div>

              <div className="blog-scroll-track" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {blogPosts.map((post) => {
                const isActive = post.id === activePost.id;

                const handlePostClick = () => {
                  if (window.innerWidth <= 768) {
                    navigate(`/blog/${post.slug}`);
                  }
                };

                const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 768;

                return (
                  <article key={post.id}>
                    <div
                      className={`blog-list-item${isActive ? ' active' : ''}`}
                      onClick={isMobileViewport ? handlePostClick : undefined}
                      aria-pressed={isActive}
                      aria-label={`Open post: ${post.title}`}
                    >
                      <img src={post.coverImage} alt={post.coverAlt} className="blog-list-cover" />
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                        <span className="label-text" style={{ color: isActive ? 'var(--primary-container)' : 'var(--outline)' }}>
                          {post.category}
                        </span>
                        <time className="label-text" dateTime={post.publishedAt} style={{ color: 'var(--outline)' }}>
                          {post.readTime}
                        </time>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{post.title}</h3>
                      <p style={{ margin: 0, color: 'var(--on-surface-variant)', fontSize: '0.92rem' }}>{post.excerpt}</p>

                      <div className="blog-list-actions">
                        <button
                          type="button"
                          className="blog-inline-action"
                          onClick={(event) => {
                            event.stopPropagation();
                            setActivePostId(post.id);
                          }}
                        >
                          Open preview
                        </button>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="blog-inline-action blog-inline-action-primary"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Read full post
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
