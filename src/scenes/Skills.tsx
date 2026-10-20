import React, { useEffect, useRef } from 'react';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frontContentRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

  const { toolkit } = PORTFOLIO_DATA;

  useEffect(() => {
    if (sectionRef.current) {
      director.registerSection('skills', sectionRef.current);
    }

    const unsubscribe = director.subscribe((state) => {
      const prog = state.scenesProgress['skills'];
      if (!prog) return;

      if (frontContentRef.current) {
        const exitFade = Math.max(0, 1 - prog.exit * 2.4);
        frontContentRef.current.style.opacity = String(exitFade);
      }

      // Marquee tape moves horizontally with scroll
      if (marqueeTrackRef.current) {
        const xOffset = -prog.p * 600;
        marqueeTrackRef.current.style.transform = `translate3d(${xOffset}px, 0, 0)`;
      }
    });

    return () => {
      director.unregisterSection('skills');
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
          {/* Top-left Title: EVERYTHING IN ORBIT. */}
          <div
            ref={frontContentRef}
            className="skills-front-content"
            style={{
              position: 'absolute',
              left: '5vw',
              top: '12vh',
              zIndex: 10,
              willChange: 'opacity, transform',
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
              }}
            >
              <div>EVERYTHING</div>
              <div style={{ color: 'var(--red)' }}>IN ORBIT.</div>
            </h2>
          </div>

          {/* Bottom: One Red Marquee Tape (Height 10vh, rotation -2deg, Anton uppercase) */}
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

