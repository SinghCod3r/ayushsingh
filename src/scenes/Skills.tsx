import React, { useEffect, useRef } from 'react';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';
import { skillOrbitEngine } from '../components/SkillOrbit';

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frontContentRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const categoryContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryNumRef = useRef<HTMLSpanElement | null>(null);
  const categoryLabelRef = useRef<HTMLSpanElement | null>(null);
  const categoryTaglineRef = useRef<HTMLSpanElement | null>(null);
  const activeSkillTagRef = useRef<HTMLSpanElement | null>(null);

  const { toolkit } = PORTFOLIO_DATA;

  useEffect(() => {
    if (sectionRef.current) {
      director.registerSection('skills', sectionRef.current);
    }

    // Subscribe to category transitions from the orbit engine
    skillOrbitEngine.registerCategoryCallback((stage) => {
      if (categoryNumRef.current) categoryNumRef.current.textContent = stage.num;
      if (categoryLabelRef.current) categoryLabelRef.current.textContent = stage.label;
      if (categoryTaglineRef.current) categoryTaglineRef.current.textContent = `— ${stage.tagline}`;
      if (activeSkillTagRef.current) {
        activeSkillTagRef.current.textContent = `NODE / ${stage.activeSkill.toUpperCase()}`;
      }
    });

    const unsubscribe = director.subscribe((state) => {
      const prog = state.scenesProgress['skills'];
      if (!prog) return;

      if (frontContentRef.current) {
        // Heading reveals smoothly with enter, fades on exit
        const enterFade = Math.min(1, Math.max(0, prog.enter * 2.2));
        const exitFade = Math.max(0, 1 - prog.exit);
        frontContentRef.current.style.opacity = String(enterFade * exitFade);
        const yOffset = (1 - enterFade) * 24;
        frontContentRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }

      // Marquee tape moves horizontally with scroll
      if (marqueeTrackRef.current) {
        const xOffset = -prog.p * 600;
        marqueeTrackRef.current.style.transform = `translate3d(${xOffset}px, 0, 0)`;
      }
    });

    return () => {
      director.unregisterSection('skills');
      skillOrbitEngine.unregisterCategoryCallback();
      unsubscribe();
    };
  }, []);

  const marqueeText = toolkit.marquee.join(' ✦ ');

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="scene-section"
      style={{
        height: '280vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div className="section-outer">
        <div className="section-inner">
          {/* Top-left Title & Editorial Category Tracker */}
          <div
            ref={frontContentRef}
            className="skills-front-content"
            style={{
              position: 'absolute',
              left: '5vw',
              top: '11vh',
              zIndex: 10,
              willChange: 'opacity, transform',
              maxWidth: 'min(90vw, 680px)',
            }}
          >
            <div className="section-label">
              <span className="num">({toolkit.sectionNum})</span>
              <span className="title">— {toolkit.sectionTitle}</span>
            </div>

            <h2
              className="font-anton"
              style={{
                fontSize: 'clamp(44px, 5.8vw, 96px)',
                lineHeight: 0.88,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}
            >
              <div>EVERYTHING</div>
              <div style={{ color: 'var(--red)' }}>IN ORBIT.</div>
            </h2>

            {/* Editorial Category Transition Indicator: 01 / CORE */}
            <div
              ref={categoryContainerRef}
              className="toolkit-category-indicator font-mono"
              style={{
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                padding: '7px 16px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 31, 31, 0.32)',
                boxShadow: '0 4px 18px rgba(13, 13, 13, 0.06)',
                willChange: 'opacity',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span
                  ref={categoryNumRef}
                  style={{
                    color: 'var(--red)',
                    fontWeight: 700,
                    fontSize: '11px',
                  }}
                >
                  01
                </span>
                <span style={{ color: 'rgba(13, 13, 13, 0.35)' }}>/</span>
                <span
                  ref={categoryLabelRef}
                  style={{
                    color: 'var(--ink)',
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                  }}
                >
                  CORE
                </span>
              </div>

              <span
                ref={categoryTaglineRef}
                className="toolkit-cat-tagline"
                style={{
                  color: 'var(--ink-secondary)',
                  fontSize: '10px',
                  letterSpacing: '0.04em',
                }}
              >
                — FOUNDATIONAL RUNTIMES & TYPE SYSTEMS
              </span>

              <span
                ref={activeSkillTagRef}
                className="toolkit-active-node-tag"
                style={{
                  display: 'inline-block',
                  marginLeft: '4px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: 'rgba(255, 31, 31, 0.10)',
                  color: 'var(--red)',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                NODE / PYTHON
              </span>
            </div>
          </div>

          {/* Bottom: Signature Red Marquee Tape */}
          <div
            className="skills-marquee-tape"
            style={{
              position: 'absolute',
              bottom: '4vh',
              left: '-5vw',
              right: '-5vw',
              height: '10vh',
              background: 'var(--red)',
              transform: 'rotate(-2deg)',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(255, 31, 31, 0.25)',
              zIndex: 15,
            }}
          >
            <div
              ref={marqueeTrackRef}
              style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                color: '#ffffff',
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(28px, 3.8vh, 48px)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                willChange: 'transform',
              }}
            >
              <span style={{ paddingRight: '40px' }}>
                {marqueeText} ✦ {marqueeText} ✦ {marqueeText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
