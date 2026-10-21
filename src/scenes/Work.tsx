import React, { useEffect, useRef, useState } from 'react';
import { director } from '../engine/director';
import { PORTFOLIO_DATA, Project } from '../data';

export const Work: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const counterTextRef = useRef<HTMLSpanElement | null>(null);
  const progressBarFillRef = useRef<HTMLDivElement | null>(null);

  const { work } = PORTFOLIO_DATA;
  const numProjects = work.projects.length;

  useEffect(() => {
    if (sectionRef.current) {
      director.registerSection('work', sectionRef.current);
    }

    const unsubscribe = director.subscribe((state) => {
      const prog = state.scenesProgress['work'];
      if (!prog) return;

      const p = prog.p; // 0 to 1 across the 460vh height
      const activeFloat = p * (numProjects - 0.05);
      const activeIdx = Math.min(numProjects - 1, Math.floor(activeFloat));

      // Update counter (e.g. 01 / 03) and progress bar
      if (counterTextRef.current) {
        counterTextRef.current.textContent = `0${activeIdx + 1} / 0${numProjects}`;
      }
      if (progressBarFillRef.current) {
        progressBarFillRef.current.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
      }

      // Scroll mapping for project cards:
      // Desktop: 3D deck with depth, tilt, and perspective
      // Mobile: In-place vertical fade and soft translation to avoid horizontal clipping
      const isMobile = window.innerWidth < 820;
      const exitFade = Math.max(0, 1 - prog.exit * 2.4);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const d = activeFloat - i; // relative distance

        if (isMobile) {
          // On mobile: single card at a time, smooth vertical fade & soft shift
          const isNear = Math.abs(d) < 0.95;
          const cardOp = isNear ? Math.max(0, 1 - Math.abs(d) * 1.6) * exitFade : 0;
          const shiftY = d * -20; // gentle vertical motion

          card.style.transform = `translate3d(0, ${shiftY}px, 0)`;
          card.style.opacity = String(cardOp);
          card.style.visibility = cardOp <= 0.01 ? 'hidden' : 'visible';
          card.style.pointerEvents = Math.abs(d) < 0.4 ? 'auto' : 'none';
          card.style.zIndex = String(10 - Math.round(Math.abs(d) * 5));
        } else {
          // Desktop 3D deck
          let z = 0;
          let y = 0;
          let rotX = 0;
          let rotY = 0;
          let opacity = 1;

          if (d >= 0) {
            // Leaving (active or moving away)
            z = d * 450;
            y = -d * 12; // in vh
            rotX = d * 24;
            opacity = Math.max(0, 1 - d * 1.5);
            rotY = 0;
          } else {
            // Upcoming
            const upcomingDist = -d;
            z = -upcomingDist * 200;
            y = upcomingDist * 4; // in vh
            rotX = 0;
            rotY = Math.min(25, upcomingDist * 15);
            opacity = Math.max(0, 1 - upcomingDist * 0.8);
          }

          opacity *= exitFade;
          card.style.transform = `translate3d(0, ${y}vh, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
          card.style.opacity = String(opacity);
          card.style.visibility = opacity <= 0.02 ? 'hidden' : 'visible';
          card.style.pointerEvents = Math.abs(d) < 0.4 ? 'auto' : 'none';
          card.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
        }
      });
    });

    return () => {
      director.unregisterSection('work');
      unsubscribe();
    };
  }, [numProjects]);

  // Visual showcase using real project preview screenshots from files/
  const renderCardVisual = (project: Project) => {
    const mainImg = project.images && project.images[0];
    const secondaryImg = project.images && project.images[1];

    const displayUrl = project.liveUrl
      ? project.liveUrl.replace(/^https?:\/\//, '')
      : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.local`;

    return (
      <div
        className="work-card-visual-wrapper"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: '#0e0e11',
          border: '1px solid rgba(13, 13, 13, 0.12)',
          boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Mockup window header */}
        <div
          style={{
            height: '34px',
            padding: '0 14px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.6)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <div
            style={{
              padding: '2px 10px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.06)',
              letterSpacing: '0.04em',
              maxWidth: '65%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {displayUrl}
          </div>
          <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: '9px' }}>[PREVIEW]</span>
        </div>

        {/* Mockup viewport container */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            width: '100%',
            overflow: 'hidden',
            background: '#141418',
          }}
        >
          {mainImg ? (
            <img
              src={mainImg}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
              loading="lazy"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 30% 30%, #ff3b3b, #d90f0f)',
              }}
            />
          )}

          {/* Secondary floating preview if exists */}
          {secondaryImg && (
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                width: '46%',
                aspectRatio: '16/10',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                src={secondaryImg}
                alt={`${project.title} detail`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  left: '6px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: '#ffffff',
                  fontSize: '8px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                }}
              >
                VIEW 2
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="scene-section"
      style={{
        height: '460vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div className="section-outer">
        <div className="section-inner">
          {/* FRONT Header: Section label, Anton counter (01 / 03), progress bar (140px) */}
          <div
            style={{
              position: 'absolute',
              left: '5vw',
              top: '12vh',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              zIndex: 10,
            }}
          >
            <div>
              <div className="section-label" style={{ marginBottom: 0 }}>
                <span className="num">({work.sectionNum})</span>
                <span className="title">— {work.sectionTitle}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                ref={counterTextRef}
                className="font-anton"
                style={{
                  fontSize: '20px',
                  color: 'var(--ink)',
                  letterSpacing: '0.04em',
                }}
              >
                01 / 03
              </span>
              <div
                style={{
                  width: '140px',
                  height: '2px',
                  background: 'var(--line)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  ref={progressBarFillRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '33%',
                    background: 'var(--red)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 3D Card Deck: left: 5vw, top: 23vh, width: min(56vw,940px), height: 55vh, perspective: 1500px */}
          <div
            ref={cardsContainerRef}
            className="work-deck-container"
            style={{
              position: 'absolute',
              left: '5vw',
              top: '23vh',
              width: 'min(56vw, 940px)',
              height: '55vh',
              perspective: '1500px',
              transformStyle: 'preserve-3d',
            }}
          >
            {work.projects.map((proj, idx) => {
              const isFirst = idx === 0;
              return (
                <div
                  key={proj.number}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="work-project-card"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '30px',
                    background: '#ffffff',
                    boxShadow: '0 25px 60px -15px rgba(13, 13, 13, 0.14), 0 0 1px 1px rgba(13, 13, 13, 0.05)',
                    display: 'grid',
                    gridTemplateColumns: '1.15fr 0.85fr',
                    padding: '36px',
                    gap: '32px',
                    transformOrigin: '50% 100%',
                    willChange: 'transform, opacity',
                    transition: 'transform 0.08s linear, opacity 0.08s linear',
                    opacity: isFirst ? 1 : 0,
                    visibility: isFirst ? 'visible' : 'hidden',
                    zIndex: isFirst ? 10 : 1,
                  }}
                >
                {/* LEFT Side: Number, category, title, description, 4 tech chips, GitHub link */}
                <div
                  className="work-card-info"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2vh' }}>
                      <span className="font-anton" style={{ fontSize: '24px', color: 'var(--red)' }}>
                        {proj.number}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          color: 'var(--mute)',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                        }}
                      >
                        // {proj.category}
                      </span>
                    </div>

                    <h2
                      className="font-anton"
                      style={{
                        fontSize: 'clamp(24px, 2.5vw, 40px)',
                        lineHeight: 1.05,
                        color: 'var(--ink)',
                        marginBottom: '1.2vh',
                      }}
                    >
                      {proj.title}
                    </h2>

                    <p
                      style={{
                        fontSize: 'clamp(13px, 1.05vw, 15px)',
                        lineHeight: 1.45,
                        color: 'var(--mute)',
                        marginBottom: '1.8vh',
                      }}
                    >
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    {/* Four Tech Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2vh' }}>
                      {proj.techChips.map((chip, cIdx) => (
                        <span
                          key={cIdx}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '5px 10px',
                            borderRadius: '999px',
                            background: 'rgba(13, 13, 13, 0.04)',
                            color: 'var(--ink)',
                            border: '1px solid rgba(13, 13, 13, 0.08)',
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill-btn primary"
                        data-cursor="Open"
                        style={{ height: '42px', padding: '0 20px', fontSize: '11px' }}
                      >
                        <div className="btn-text-roll">
                          <span>View on GitHub ↗</span>
                          <span>View on GitHub ↗</span>
                        </div>
                      </a>

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pill-btn outline"
                          data-cursor="Live"
                          style={{ height: '42px', padding: '0 20px', fontSize: '11px' }}
                        >
                          <div className="btn-text-roll">
                            <span>Live Demo ↗</span>
                            <span>Live Demo ↗</span>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT Side: Red Visual Panel */}
                <div className="work-card-visual" style={{ width: '100%', height: '100%' }}>
                  {renderCardVisual(proj)}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};
