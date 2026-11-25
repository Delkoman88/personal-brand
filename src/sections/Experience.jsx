import { experienceGroups } from '../content/experience';

function ExperienceGroup({ id, title, items: experiences }) {
  return (
    <section id={id} className="section-spacing bg-surface" aria-labelledby={`${id}-heading`}>
      <div className="container">
        <div className="section-heading">
          <h2 id={`${id}-heading`} className="label-text">{title}</h2>
        </div>

        <div className="experience-list">
          {experiences.map((exp) => (
            <article key={exp.id} className="experience-item">
              <div className="experience-marker" aria-hidden="true" />

              <div className="experience-copy">
                <div>
                  <span className="label-text experience-meta">{exp.role}</span>
                  <h3 translate="no" className="notranslate experience-title">
                    {exp.company}
                  </h3>
                </div>

                <p className="experience-desc">{exp.description}</p>

                {exp.highlights ? (
                  <ul className="experience-highlights">
                    {exp.highlights.map((hlt) => (
                      <li key={hlt}>{hlt}</li>
                    ))}
                  </ul>
                ) : null}

                {exp.links ? (
                  <div className="experience-links">
                    {exp.links.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                ) : null}

                <div className="experience-tag-list">
                  {exp.tags.map((tag) =>
                    tag === '@urbanbeautygarden' ? (
                      <a
                        key={tag}
                        href="https://www.tiktok.com/@urbanbeautygarden"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="experience-tag experience-tag--link"
                      >
                        {tag}
                      </a>
                    ) : (
                      <span key={tag} className="experience-tag">
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="experience-visual">
                <img
                  src={exp.image}
                  alt={`${exp.company} visualization`}
                  translate="no"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Experience() {
  return (
    <>
      {experienceGroups.map((group) => (
        <ExperienceGroup key={group.id} {...group} />
      ))}
    </>
  );
}
