import React, { useEffect, useRef } from 'react';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sectionRef.current) {
      director.registerSection('hero', sectionRef.current);
    }

    const unsubscribe = director.subscribe((state) => {
      const prog = state.scenesProgress['hero'];
      if (!prog) return;

      // Mutate DOM through refs only - NO React re-renders while scrolling
      if (contentRef.current) {
        const exitFade = Math.max(0, 1 - prog.exit);
        const yOffset = -prog.p * 40;
        contentRef.current.style.opacity = String(exitFade);
        contentRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }

      if (underlineRef.current) {
        // Red highlighter underline grows with scroll progress as though reading
        const widthPercent = Math.min(100, Math.max(0, prog.p * 180));
        underlineRef.current.style.width = `${widthPercent}%`;
      }
    });

    return () => {
      director.unregisterSection('hero');
      unsubscribe();
    };
  }, []);

  const { identity } = PORTFOLIO_DATA;

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    director.scrollToSection(2); // Work scene index
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="scene-section"
      style={{
        height: '230vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div className="section-outer">
        <div className="section-inner">
          {/* FRONT LEFT Content: 5vw, top: 26vh, width: min(47vw,780px) */}
          <div
            ref={contentRef}
            className="hero-front-content"
            style={{
              position: 'absolute',
              left: '5vw',
              top: '26vh',
              width: 'min(47vw, 780px)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
              willChange: 'transform, opacity',
            }}
          >
            {/* Greeting */}
            <div
              style={{
                fontSize: 'clamp(14px, 1.2vw, 18px)',
                letterSpacing: '-0.01em',
                marginBottom: '1.2vh',
                color: 'var(--mute)',
                fontWeight: 500,
              }}
            >
              Hi, I'm <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{identity.fullName}</strong> —
            </div>

            {/* Title: SOFTWARE ENGINEER. Second line red */}
            <h1
              className="font-anton"
              style={{
                fontSize: 'clamp(54px, 7.4vw, 148px)',
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
                marginBottom: '2.5vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: 'var(--ink)' }}>SOFTWARE</span>
              <span style={{ color: 'var(--red)' }}>ENGINEER.</span>
            </h1>

            {/* Description: Three lines with red highlighter underline */}
            <div
              style={{
                position: 'relative',
                maxWidth: '31em',
                fontSize: 'clamp(16px, 1.35vw, 22px)',
                lineHeight: 1.45,
                color: 'var(--ink)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                marginBottom: '4vh',
              }}
            >
              <p>{identity.heroDescription}</p>
              {/* Red highlighter underline that grows with scroll */}
              <div
                ref={underlineRef}
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  height: '3px',
                  background: 'var(--red)',
                  width: '0%',
                  transition: 'width 0.1s ease-out',
                }}
              />
            </div>

            {/* Action Buttons: See my work / Download resume */}
            <div
              className="hero-cta-group"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="#work"
                onClick={handleScrollToWork}
                className="pill-btn primary magnetic-btn"
                data-cursor="Go"
              >
                <div className="btn-text-roll">
                  <span>See my work ↘</span>
                  <span aria-hidden="true">See my work ↘</span>
                </div>
              </a>

              <a
                href={identity.links.resume}
                download="Ayush_Singh_Resume.pdf"
                className="pill-btn outline magnetic-btn"
                data-cursor="PDF"
              >
                <div className="btn-text-roll">
                  <span>Download résumé</span>
                  <span aria-hidden="true">Download résumé</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

