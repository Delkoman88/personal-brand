import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ImageLightbox from '../components/ImageLightbox';
import { projects, projectFields } from '../content/homeContent';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROJECT_ACCENTS = {
  videovibe: 'var(--primary-container)',
  aqvarivs: 'var(--secondary-on-dark)',
  'beauty-studio-copilot': 'var(--primary-container)',
  'viajero-sediento': 'var(--project-warm)',
};

function getProjectMedia(project) {
  const base = [
    {
      image: project.image,
      imageWidth: project.imageWidth ?? 1280,
      imageHeight: project.imageHeight ?? 800,
      imageAlt: project.imageAlt,
      caption: project.caption,
    },
  ];

  if (!project.gallery?.length) {
    return base;
  }

  return [
    ...base,
    ...project.gallery.map((item) => ({
      image: item.image,
      imageWidth: item.imageWidth ?? 1280,
      imageHeight: item.imageHeight ?? 800,
      imageAlt: item.imageAlt,
      caption: item.caption,
    })),
  ];
}

export default function Projects() {
  const sectionRef = useRef(null);
  const showcaseRef = useRef(null);
  const stageRef = useRef(null);
  const stageMediaRef = useRef(null);
  const railProgressRef = useRef(null);
  const caseRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isDesktopShowcase, setIsDesktopShowcase] = useState(false);
  const [lightboxState, setLightboxState] = useState({ items: [], index: null });

  const openProjectLightbox = (project, initialIndex = 0) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    const items = getProjectMedia(project).map((item) => ({
      src: item.image,
      alt: item.imageAlt,
      caption: item.caption,
    }));
    setLightboxState({ items, index: initialIndex });
  };

  const activeProject = projects[activeIndex] ?? projects[0];
  const activeMediaList = getProjectMedia(activeProject);
  const currentMedia = activeMediaList[activeMediaIndex] ?? activeMediaList[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const showcaseEl = showcaseRef.current;
        const stageEl = stageRef.current;
        const railEl = railProgressRef.current;

        if (!showcaseEl || !stageEl) return undefined;

        showcaseEl.classList.add('is-showcase-active');
        setIsDesktopShowcase(true);

        const getHeaderOffset = () => {
          const raw = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--header-height')
          );
          return (Number.isFinite(raw) ? raw : 88) + 28;
        };

        ScrollTrigger.create({
          trigger: showcaseEl,
          start: () => `top ${getHeaderOffset()}px`,
          end: () => {
            const showcaseHeight = showcaseEl.offsetHeight;
            const stageHeight = stageEl.offsetHeight;
            return `+=${Math.max(0, showcaseHeight - stageHeight)}`;
          },
          pin: stageEl,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        if (railEl) {
          gsap.fromTo(
            railEl,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: showcaseEl,
                start: () => `top ${getHeaderOffset()}px`,
                end: 'bottom 70%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        caseRefs.current.forEach((caseEl, idx) => {
          if (!caseEl) return;
          ScrollTrigger.create({
            trigger: caseEl,
            start: 'top 52%',
            end: 'bottom 48%',
            onEnter: () => {
              setActiveIndex(idx);
              setActiveMediaIndex(0);
            },
            onEnterBack: () => {
              setActiveIndex(idx);
              setActiveMediaIndex(0);
            },
          });
        });

        let cancelled = false;
        if (document.fonts?.ready) {
          document.fonts.ready.then(() => {
            if (!cancelled) {
              ScrollTrigger.refresh();
            }
          });
        }

        return () => {
          cancelled = true;
          showcaseEl.classList.remove('is-showcase-active');
          setIsDesktopShowcase(false);
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    if (!isDesktopShowcase || !stageMediaRef.current) return;

    const tween = gsap.fromTo(
      stageMediaRef.current,
      { opacity: 0.25, scale: 0.985 },
      { opacity: 1, scale: 1, duration: 0.34, ease: 'power3.out', overwrite: 'auto' }
    );

    return () => tween.kill();
  }, [activeIndex, activeMediaIndex, isDesktopShowcase]);

  const stageAccent = PROJECT_ACCENTS[activeProject.id] ?? 'var(--primary-container)';

  return (
    <section ref={sectionRef} id="projects" className="section-spacing bg-low" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-heading">
          <h2 id="projects-heading" className="label-text">Selected projects</h2>
        </div>

        <div ref={showcaseRef} className="projects-showcase">
          <div className="projects-rail-track" aria-hidden="true">
            <div ref={railProgressRef} className="projects-rail-progress" />
          </div>

          <div className="projects-list">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              const formattedIndex = `${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;

              return (
                <article
                  key={project.id}
                  ref={(el) => {
                    caseRefs.current[index] = el;
                  }}
                  className={`project-item project-case project-case--${project.id}${isActive ? ' is-active' : ''}`}
                >
                  <div className="project-copy">
                    <div>
                      <span className="project-case-index">{formattedIndex}</span>
                      <p className="label-text project-meta">{project.meta}</p>
                      <h3>{project.name}</h3>
                    </div>
                    <dl className="project-details">
                      {projectFields.map(([field, label]) => (
                        <div key={field}>
                          <dt>{label}</dt>
                          <dd>{project[field]}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="project-stack" aria-label={`${project.name} technologies`}>
                      {project.stack.map((item) => (
                        <li key={item} className="project-stack-badge">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="project-actions">
                      {project.url && project.internalLink ? (
                        <Link to={project.url} className="btn-secondary">
                          {project.linkLabel} <span aria-hidden="true">→</span>
                        </Link>
                      ) : project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          {project.linkLabel} <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                      <span className="project-access">{project.accessNote}</span>
                    </div>
                  </div>

                  <figure className="project-evidence">
                    <a
                      href={project.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-visual"
                      onClick={openProjectLightbox(project, 0)}
                      aria-label={`Open full image: ${project.imageAlt}`}
                    >
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        width={project.imageWidth ?? 1280}
                        height={project.imageHeight ?? 800}
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                    <figcaption>{project.caption}</figcaption>
                    {project.gallery ? (
                      <div className="project-gallery">
                        {project.gallery.map((item, galleryIdx) => (
                          <figure key={item.image} className="project-gallery-item">
                            <a
                              href={item.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-visual"
                              onClick={openProjectLightbox(project, galleryIdx + 1)}
                              aria-label={`Open full image: ${item.imageAlt}`}
                            >
                              <img
                                src={item.image}
                                alt={item.imageAlt}
                                width={item.imageWidth ?? 1280}
                                height={item.imageHeight ?? 800}
                                loading="lazy"
                                decoding="async"
                              />
                            </a>
                            <figcaption>{item.caption}</figcaption>
                          </figure>
                        ))}
                      </div>
                    ) : null}
                  </figure>
                </article>
              );
            })}
          </div>

          <div className="projects-stage-col" aria-live="polite">
            <div ref={stageRef} className="projects-stage" style={{ '--stage-accent': stageAccent }}>
              <div className="projects-stage-header">
                <span className="projects-stage-counter">
                  {`${String(activeIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
                </span>
                <span className="projects-stage-name">{activeProject.name}</span>
              </div>

              <a
                ref={stageMediaRef}
                href={currentMedia.image}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-stage-media"
                onClick={openProjectLightbox(activeProject, activeMediaIndex)}
                aria-label={`Open full image: ${currentMedia.imageAlt}`}
              >
                <img
                  src={currentMedia.image}
                  alt={currentMedia.imageAlt}
                  width={currentMedia.imageWidth}
                  height={currentMedia.imageHeight}
                  decoding="async"
                />
              </a>

              {activeMediaList.length > 1 ? (
                <div className="projects-stage-thumbs" role="group" aria-label={`${activeProject.name} gallery`}>
                  {activeMediaList.map((item, idx) => (
                    <button
                      key={item.image}
                      type="button"
                      className={`project-stage-thumb${idx === activeMediaIndex ? ' is-selected' : ''}`}
                      onClick={() => setActiveMediaIndex(idx)}
                      aria-label={`View screenshot ${idx + 1}: ${item.caption}`}
                      aria-pressed={idx === activeMediaIndex}
                    >
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="projects-stage-footer">
                <p className="project-stage-caption">{currentMedia.caption}</p>
                <button
                  type="button"
                  className="projects-stage-open"
                  onClick={openProjectLightbox(activeProject, activeMediaIndex)}
                >
                  Zoom <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        items={lightboxState.items}
        activeIndex={lightboxState.index}
        onClose={() => setLightboxState({ items: [], index: null })}
        onNavigate={(nextIndex) => setLightboxState((prev) => ({ ...prev, index: nextIndex }))}
      />
    </section>
  );
}
