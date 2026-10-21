import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { initAboutAnimation } from '../animations/about';

export const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!aboutRef.current) return;
    const cleanup = initAboutAnimation(aboutRef.current);
    return cleanup;
  }, []);

  return (
    <section id="about" ref={aboutRef} className="about-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">
            <svg className="reticle-glyph-svg" viewBox="0 0 14 14" aria-hidden="true">
              <path id="about-reticle-path" d="M7 1L13 7L7 13L1 7Z" />
            </svg>
            {PORTFOLIO_DATA.about.sectionNum} // PHILOSOPHY
          </div>
          <h2 className="section-title-large">ABOUT ME</h2>
        </div>

        {/* Big Editorial Manifesto */}
        <div className="about-manifesto-wrap">
          <p className="about-manifesto">
            &ldquo;{PORTFOLIO_DATA.about.manifesto}&rdquo;
          </p>
        </div>

        {/* Asymmetric Editorial Grid: Narrative & Expansive Visual */}
        <div className="about-editorial-grid">
          {/* Narrative Column */}
          <div className="about-narrative-col">
            <h3 className="about-subheading">ENGINEERING WITH DETERMINISM</h3>
            {PORTFOLIO_DATA.about.bioParagraphs.map((para, idx) => (
              <p key={idx} className="about-para">
                {para}
              </p>
            ))}

            <div className="about-philosophy-pills">
              {PORTFOLIO_DATA.identity.philosophy.map((item) => (
                <span key={item} className="philosophy-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Large Editorial Visual Column */}
          <div className="about-visual-col">
            <div className="about-editorial-visual">
              <div className="about-editorial-frame">
                {/* Architectural registration marks */}
                <div className="about-editorial-meta top-right">
                  <span className="coord-cross">+</span>
                  <span className="coord-text">[ 28°24&prime;N // 79°24&prime;E ]</span>
                </div>
                <div className="about-editorial-meta bottom-left">
                  <span className="coord-cross">+</span>
                  <span className="coord-text">[ UPSTREAM // OPENPRINTING ]</span>
                </div>

                {/* Cinematic Image Mask */}
                <div className="about-editorial-mask">
                  <img
                    src="./assets/ayush-about.webp"
                    alt="Ayush Singh - Systems & Open Source Engineer"
                    className="about-editorial-img"
                    loading="lazy"
                  />
                  <div className="about-editorial-grain" aria-hidden="true" />
                  <div className="about-editorial-vignette" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Stats Grid */}
        <div className="about-stats-grid">
          {PORTFOLIO_DATA.about.stats.map((stat, idx) => (
            <div key={idx} className="about-stat-card">
              <div className="stat-card-value">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-card-label">{stat.label}</div>
              <div className="stat-card-meta">{stat.meta}</div>
            </div>
          ))}
        </div>

        {/* Architectural Datum Bridge (About → Toolkit & Systems Transformation) */}
        <div className="about-datum-bridge" aria-hidden="true">
          <div className="datum-node-anchor">
            <span className="datum-cross">+</span>
            <span className="datum-label">SYS_TOPOLOGY_ROOT</span>
            <span className="datum-dot" />
          </div>
          <svg className="datum-stem-svg" viewBox="0 0 2 64" preserveAspectRatio="none">
            <path id="about-skills-line" d="M1 0 L1 64" className="datum-stem-line" />
          </svg>
          <div className="connector-tracer-dot about-skills-tracer" />
        </div>
      </div>
    </section>
  );
};

export default About;
