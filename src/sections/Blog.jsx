import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../content/blogPosts';

export default function Blog() {
  const [activePostId, setActivePostId] = useState(blogPosts[0].id);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const syncViewport = () => setIsMobileViewport(media.matches);
    syncViewport();
    media.addEventListener('change', syncViewport);
    return () => media.removeEventListener('change', syncViewport);
  }, []);

  const activePost = useMemo(
    () => blogPosts.find((post) => post.id === activePostId) ?? blogPosts[0],
    [activePostId]
  );

  return (
    <section id="blog" className="section-spacing bg-lowest grid-blueprint" aria-labelledby="blog-heading">
      <div className="container">
        <div className="section-heading">
          <h2 id="blog-heading" className="label-text">Field Notes</h2>
        </div>

        <div className="blog-shell">
          <div className="blog-lead-col">
            <span className="label-text blog-editorial-tag">Editorial Feed</span>
            <h2 className="blog-section-title">
              A space to publish ideas, curiosities, and things I genuinely like.
            </h2>
            <p className="blog-section-intro">
              This section is more open: essays, notes, references, personal interests, work reflections,
              and whatever feels worth sharing at the moment.
            </p>

            <article id={activePost.slug} className="blog-featured-card blog-featured-desktop">
              <div key={activePost.id} className="blog-featured-content">
                <header className="blog-featured-header">
                  <span className="label-text text-accent-cyan">{activePost.category}</span>
                  <time className="label-text" dateTime={activePost.publishedAt}>
                    {activePost.date} · {activePost.readTime}
                  </time>
                </header>

                <div className="blog-featured-intro">
                  <h3 className="blog-featured-title">{activePost.title}</h3>
                  <p className="blog-featured-excerpt">{activePost.excerpt}</p>
                </div>

                <img
                  src={activePost.coverImage}
                  alt={activePost.coverAlt}
                  className="blog-card-cover"
                  style={{ viewTransitionName: `blog-cover-${activePost.slug}` }}
                  loading="lazy"
                  decoding="async"
                />

                <div className="blog-featured-preview">
                  {activePost.previewBody.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="blog-featured-insights">
                  {activePost.insights.map((insight) => (
                    <section key={insight} className="blog-featured-insight" aria-label="Key insight">
                      <span className="label-text">Note</span>
                      <p>{insight}</p>
                    </section>
                  ))}
                </div>

                <div className="blog-featured-actions">
                  <Link to={`/blog/${activePost.slug}`} viewTransition className="btn-primary">
                    Read full article
                  </Link>
                  <Link to="/blog" className="btn-secondary">
                    Browse all posts
                  </Link>
                  <a href="#contact" className="btn-secondary">
                    Share an idea
                  </a>
                </div>
              </div>
            </article>

            <article className="blog-featured-mobile-card">
              <img
                src={activePost.coverImage}
                alt={activePost.coverAlt}
                className="blog-featured-mobile-cover"
                loading="lazy"
                decoding="async"
              />

              <div className="blog-featured-mobile-copy">
                <span className="label-text text-accent-cyan">{activePost.category}</span>
                <h3 className="blog-featured-mobile-title">{activePost.title}</h3>
                <p className="blog-featured-mobile-excerpt">{activePost.excerpt}</p>
                <time className="label-text" dateTime={activePost.publishedAt}>
                  {activePost.date} · {activePost.readTime}
                </time>
              </div>

              <div className="blog-featured-mobile-actions">
                <Link to={`/blog/${activePost.slug}`} viewTransition className="btn-primary">
                  Read full post
                </Link>
                <Link to="/blog" className="btn-secondary">
                  All posts
                </Link>
              </div>
            </article>
          </div>

          <aside className="blog-list-panel">
            <div className="blog-list-panel-head">
              <span className="label-text">Latest Posts</span>
              <p>Select an entry to preview the note inside the page.</p>
            </div>

            <div className="blog-scroll-track">
              {blogPosts.map((post) => {
                const isActive = post.id === activePost.id;

                return (
                  <article key={post.id}>
                    <div
                      className={`blog-list-item${isActive ? ' active' : ''}`}
                      onClick={isMobileViewport ? () => navigate(`/blog/${post.slug}`) : undefined}
                      role={isMobileViewport ? 'button' : undefined}
                      tabIndex={isMobileViewport ? 0 : undefined}
                      onKeyDown={
                        isMobileViewport
                          ? (event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                navigate(`/blog/${post.slug}`);
                              }
                            }
                          : undefined
                      }
                    >
                      <img
                        src={post.coverImage}
                        alt={post.coverAlt}
                        className="blog-list-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="blog-list-meta">
                        <span className={`label-text${isActive ? ' text-accent-cyan' : ''}`}>
                          {post.category}
                        </span>
                        <time className="label-text" dateTime={post.publishedAt}>
                          {post.readTime}
                        </time>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>

                      <div className="blog-list-actions">
                        <button
                          type="button"
                          className="blog-inline-action"
                          aria-pressed={isActive}
                          onClick={(event) => {
                            event.stopPropagation();
                            setActivePostId(post.id);
                          }}
                        >
                          {isActive ? 'Previewing' : 'Open preview'}
                        </button>
                        <Link
                          to={`/blog/${post.slug}`}
                          viewTransition
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
          </aside>
        </div>
      </div>
    </section>
  );
}
