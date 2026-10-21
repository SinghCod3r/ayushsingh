import React, { useEffect, useRef } from 'react';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';
import { TiltCard } from '../components/TiltCard';
import { Odometer } from '../components/Odometer';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frontColRef = useRef<HTMLDivElement | null>(null);
  const wordSpansRef = useRef<Array<HTMLSpanElement | null>>([]);

  const { about } = PORTFOLIO_DATA;
  const words = about.manifesto.split(' ');

  // Red keyword identifiers
  const redKeywords = new Set(['software', 'real', 'products,', 'systems,', 'upstream,', 'learn.']);

  useEffect(() => {
    if (sectionRef.current) {
      director.registerSection('about', sectionRef.current);
    }

    const unsubscribe = director.subscribe((state) => {
      const prog = state.scenesProgress['about'];
      if (!prog) return;

      if (frontColRef.current) {
        const exitFade = Math.max(0, 1 - prog.exit * 2.4);
        frontColRef.current.style.opacity = String(exitFade);
      }

      // Word-by-word reveal: clean editorial focus with legible baseline
      const isMobile = window.innerWidth < 820;
      const totalWords = wordSpansRef.current.length;
      wordSpansRef.current.forEach((span, idx) => {
        if (!span) return;

        if (isMobile) {
          // On mobile, text reveals quickly and stays completely clear and sharp (no prolonged blur)
          const wordThreshold = (idx / totalWords) * 0.25;
          const wordProg = Math.max(0, Math.min(1, (prog.p - wordThreshold) / 0.10));
          const opacity = 0.75 + 0.25 * wordProg;
          span.style.opacity = String(opacity);
          span.style.transform = 'none';
          span.style.filter = 'none';
        } else {
          const wordThreshold = (idx / totalWords) * 0.7;
          const wordProg = Math.max(0, Math.min(1, (prog.p - wordThreshold) / 0.18));

          const opacity = 0.28 + 0.72 * wordProg;
          const translateY = (1 - wordProg) * 0.15;
          const blur = (1 - wordProg) * 1.2;

          span.style.opacity = String(opacity);
          span.style.transform = `translate3d(0, ${translateY}em, 0)`;
          span.style.filter = blur > 0.05 ? `blur(${blur}px)` : 'none';
        }
      });
    });

    return () => {
      director.unregisterSection('about');
      unsubscribe();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scene-section"
      style={{
        height: '280vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div className="section-outer">
        <div className="section-inner">
          {/* FRONT COLUMN: left: 50vw, right: 5vw, top: 15vh, bottom: 7vh */}
          <div
            ref={frontColRef}
            className="about-front-column"
            style={{
              position: 'absolute',
              left: '50vw',
              right: '5vw',
              top: '15vh',
              bottom: '7vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 10,
              willChange: 'opacity, transform',
            }}
          >
            {/* Top section: Label and Manifesto */}
            <div>
              <div className="section-label">
                <span className="num">({about.sectionNum})</span>
                <span className="title">— {about.sectionTitle}</span>
              </div>

              {/* Manifesto: Reveal word-by-word */}
              <div
                className="about-manifesto"
                style={{
                  fontSize: 'clamp(24px, 2.5vw, 46px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
                  color: 'var(--ink)',
                  marginTop: '2vh',
                  maxWidth: '28em',
                }}
              >
                {words.map((w, idx) => {
                  const cleanW = w.toLowerCase();
                  const isRed = redKeywords.has(cleanW);
                  return (
                    <span
                      key={idx}
                      ref={(el) => {
                        wordSpansRef.current[idx] = el;
                      }}
                      style={{
                        display: 'inline-block',
                        marginRight: '0.28em',
                        color: isRed ? 'var(--red)' : 'var(--ink)',
                        opacity: 0.28,
                        transform: 'translate3d(0, 0.15em, 0)',
                        filter: 'blur(1.2px)',
                        transition: 'color 0.2s',
                        willChange: 'opacity, transform, filter',
                      }}
                    >
                      {w}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bottom section: Three glass stat cards */}
            <div
              className="about-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                width: '100%',
              }}
            >
              {about.stats.map((stat, idx) => (
                <TiltCard key={idx} style={{ height: '160px' }}>
                  <div
                    style={{
                      padding: '24px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <div>
                      <Odometer
                        value={stat.value}
                        suffix={stat.suffix}
                        fontSize="clamp(32px, 3.2vw, 48px)"
                        color="var(--ink)"
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--ink)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {stat.label}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--mute)',
                          marginTop: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {stat.meta}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
