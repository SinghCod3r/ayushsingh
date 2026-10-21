import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, Project } from '../data';
import { initProjectsAnimation } from '../animations/projects';

export const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!projectsRef.current) return;
    const cleanup = initProjectsAnimation(projectsRef.current);
    return cleanup;
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="projects-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">
            <svg className="reticle-glyph-svg" viewBox="0 0 14 14" aria-hidden="true">
              <path id="projects-reticle-path" d="M7 2a5 5 0 1 0 0.01 0" />
            </svg>
            {PORTFOLIO_DATA.projects.sectionNum} // PRODUCTION
          </div>
          <h2 className="section-title-large">SELECTED WORK</h2>
          <p className="section-lead-text">
            SYSTEM-LEVEL TOOLS, INTERPRETERS, AND SCALABLE WEB PLATFORMS.
          </p>
        </div>

        {/* Production Conduit Receiver (Handoff from Skills Topology) */}
        <div className="projects-conduit-receiver" aria-hidden="true">
          <svg className="conduit-receiver-svg" viewBox="0 0 2 48" preserveAspectRatio="none">
            <path id="projects-conduit-line" d="M1 0 L1 48" className="conduit-receiver-line" />
          </svg>
          <div className="conduit-target-cross">+</div>
        </div>

        {/* Project Showcase List */}
        <div className="projects-list-wrap">
          {PORTFOLIO_DATA.projects.list.map((proj: Project) => (
            <article key={proj.number} className="project-showcase-card">
              <div className="project-card-grid">
                {/* Visual Preview Side */}
                <div className="project-preview-wrap project-anim-in">
                  <div className="project-preview-frame">
                    <img
                      src={proj.images[0]}
                      alt={`${proj.title} Preview`}
                      className="project-preview-visual"
                      loading="lazy"
                    />
                    <div className="project-preview-overlay" />
                    {proj.metrics && (
                      <div className="project-metrics-badge">
                        <span className="metrics-dot" />
                        <span>{proj.metrics}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Side */}
                <div className="project-details-wrap">
                  <div className="project-num-row project-anim-in">
                    <span className="project-index">PROJ // {proj.number}</span>
                    <span className="project-category-tag">{proj.category}</span>
                  </div>

                  <h3 className="project-title project-anim-in">{proj.title}</h3>

                  <p className="project-oneliner project-anim-in">{proj.oneLiner}</p>

                  <p className="project-description project-anim-in">{proj.description}</p>

                  {/* Tech Chips */}
                  <div className="project-tech-chips project-anim-in">
                    {proj.techChips.map((tech) => (
                      <span key={tech} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="project-actions-row project-anim-in">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-project-code"
                    >
                      <span>VIEW CODE</span>
                      <span className="btn-arrow">→</span>
                    </a>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-project-live"
                      >
                        <span>LIVE RUNTIME</span>
                        <span className="btn-arrow">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

