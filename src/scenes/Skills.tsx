import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { initSkillsAnimation } from '../animations/skills';

export const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    if (!skillsRef.current) return;
    const cleanup = initSkillsAnimation(skillsRef.current);
    return cleanup;
  }, []);

  const coreNodes = [
    {
      id: 'systems',
      title: 'SYSTEMS & LINUX',
      sub: 'GTK, GLib, CUPS, D-Bus, IPP',
      skills: ['Python', 'GTK / GLib', 'CUPS / PPD', 'D-Bus', 'DNS-SD', 'IPP-over-USB'],
      coords: { x: 50, y: 15 },
      lineCoords: { x1: 50, y1: 50, x2: 50, y2: 24 },
    },
    {
      id: 'fullstack',
      title: 'FULL STACK & APIS',
      sub: 'React, Next.js, TypeScript, REST APIs',
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'FastAPI', 'REST APIs'],
      coords: { x: 85, y: 50 },
      lineCoords: { x1: 50, y1: 50, x2: 74, y2: 50 },
    },
    {
      id: 'upstream',
      title: 'UPSTREAM & OPEN SOURCE',
      sub: 'OpenPrinting, Regression Testing, Code Review',
      skills: ['OpenPrinting', 'Git Upstream', 'Alexander Pevzner Collab', 'Bug Triage', 'Foomatic DB'],
      coords: { x: 50, y: 85 },
      lineCoords: { x1: 50, y1: 50, x2: 50, y2: 76 },
    },
    {
      id: 'toolchain',
      title: 'RUNTIME & TOOLCHAINS',
      sub: 'Interpreters, AST, SQLite, Linux',
      skills: ['Linux Kernel', 'AST / Interpreters', 'SQLite', 'Docker', 'PyTest', 'CLI Tooling'],
      coords: { x: 15, y: 50 },
      lineCoords: { x1: 50, y1: 50, x2: 26, y2: 50 },
    },
  ];

  return (
    <section id="skills" ref={skillsRef} className="skills-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">
            <svg className="reticle-glyph-svg" viewBox="0 0 14 14" aria-hidden="true">
              <path id="skills-reticle-path" d="M7 2a5 5 0 1 0 0.01 0" />
            </svg>
            {PORTFOLIO_DATA.skills.sectionNum} // ARCHITECTURE
          </div>
          <h2 className="section-title-large">TOOLKIT &amp; SYSTEMS</h2>
          <p className="section-lead-text">{PORTFOLIO_DATA.skills.tagline}</p>
        </div>

        {/* Visual Technology System Grid */}
        <div className="skills-system-wrapper">
          {/* Desktop SVG Circuit System */}
          <div className="skills-circuit-canvas">
            <svg
              className="skills-circuit-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Incoming feeder bus line from About datum root */}
              <line
                x1="50%"
                y1="0%"
                x2="50%"
                y2="50%"
                pathLength="100"
                className="skills-feeder-line"
              />

              {/* 4 Architectural Branch Buses */}
              {coreNodes.map((node, i) => (
                <line
                  key={node.id}
                  x1={`${node.lineCoords.x1}%`}
                  y1={`${node.lineCoords.y1}%`}
                  x2={`${node.lineCoords.x2}%`}
                  y2={`${node.lineCoords.y2}%`}
                  pathLength="100"
                  className={`skills-bus-path skills-bus-${node.id} ${
                    activeCategory === i ? 'path-active' : ''
                  }`}
                />
              ))}

              {/* Outgoing resolution conduit line toward Selected Work */}
              <path
                id="skills-resolution-line"
                d="M50 86 L50 100"
                className="skills-resolution-line"
              />
            </svg>

            {/* Central Node: AYUSH */}
            <div className="skills-hub-center">
              <div className="hub-core-avatar">
                <img
                  src="./assets/ayush-hero.webp"
                  alt="Ayush Singh Core"
                  className="hub-avatar-img"
                />
              </div>
              <div className="hub-core-label">
                <span className="hub-name">AYUSH</span>
                <span className="hub-sub">SYSTEM HUB</span>
              </div>
            </div>

            {/* Orbiting / Peripheral Technology Clusters */}
            {coreNodes.map((node, i) => (
              <div
                key={node.id}
                className={`skills-node node-pos-${node.id} ${
                  activeCategory === i ? 'node-active' : ''
                }`}
                onMouseEnter={() => setActiveCategory(i)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="skills-node-box">
                  <div className="skills-node-header">
                    <span className="node-indicator" />
                    <span className="node-title">{node.title}</span>
                  </div>
                  <div className="skills-node-sub">{node.sub}</div>
                  <div className="skills-pills-list">
                    {node.skills.map((skill) => (
                      <span key={skill} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / Responsive Linear Skill Cards */}
          <div className="skills-mobile-cards">
            {coreNodes.map((node) => (
              <div key={node.id} className="skills-mobile-card">
                <div className="skills-node-header">
                  <span className="node-indicator" />
                  <span className="node-title">{node.title}</span>
                </div>
                <div className="skills-node-sub">{node.sub}</div>
                <div className="skills-pills-list">
                  {node.skills.map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Bridge (Toolkit & Systems → Selected Work Transformation) */}
        <div className="skills-resolution-bridge" aria-hidden="true">
          <svg className="resolution-stem-svg" viewBox="0 0 2 64" preserveAspectRatio="none">
            <path id="skills-projects-line" d="M1 0 L1 64" className="resolution-stem-line" />
          </svg>
          <div className="resolution-node-anchor">
            <span className="resolution-arrow">↓</span>
            <span className="resolution-label">EXEC // RUNTIME_PIPELINE</span>
            <span className="resolution-dot" />
          </div>
          <div className="connector-tracer-dot skills-projects-tracer" />
        </div>
      </div>
    </section>
  );
};
