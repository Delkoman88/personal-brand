import { projects, projectFields } from '../content/homeContent';

export default function Projects() {
  return (
    <section id="projects" className="section-spacing bg-low" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-heading">
          <h2 id="projects-heading" className="label-text">01 // Selected projects</h2>
        </div>
        <div className="projects-list">
          {projects.map(project => (
            <article key={project.id} className={`project-item project-case project-case--${project.id}`}>
              <div className="project-copy">
                <div>
                  <p className="label-text project-meta">{project.meta}</p>
                  <h3>{project.name}</h3>
                </div>
                <dl className="project-details">
                  {projectFields.map(([field, label]) => (
                    <div key={field}><dt>{label}</dt><dd>{project[field]}</dd></div>
                  ))}
                </dl>
                <ul className="project-stack" aria-label={`${project.name} technologies`}>
                  {project.stack.map(item => <li key={item} className="project-stack-badge">{item}</li>)}
                </ul>
                <div className="project-actions">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">{project.linkLabel} <span aria-hidden="true">↗</span></a>
                  ) : null}
                  <span className="project-access">{project.accessNote}</span>
                </div>
              </div>
              <figure className="project-evidence">
                <a href={project.image} target="_blank" rel="noopener noreferrer" className="project-visual" aria-label={`Open full image: ${project.imageAlt}`}>
                  <img src={project.image} alt={project.imageAlt} width="1280" height="800" loading="lazy" />
                </a>
                <figcaption>{project.caption}</figcaption>
                {project.gallery ? (
                  <div className="project-gallery">
                    {project.gallery.map(item => (
                      <figure key={item.image} className="project-gallery-item">
                        <a href={item.image} target="_blank" rel="noopener noreferrer" className="project-visual" aria-label={`Open full image: ${item.imageAlt}`}>
                          <img src={item.image} alt={item.imageAlt} width="1280" height="800" loading="lazy" />
                        </a>
                        <figcaption>{item.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
