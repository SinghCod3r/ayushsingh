import React, { useEffect, useRef } from 'react';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';

export const Awards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frontContentRef = useRef<HTMLDivElement | null>(null);
  const flipCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cylinderRef = useRef<HTMLDivElement | null>(null);

  const { awards } = PORTFOLIO_DATA;
  const numCerts = awards.certifications.length;

  useEffect(() => {
    if (sectionRef.current) {
      director.registerSection('awards', sectionRef.current);
    }

    const unsubscribe = director.subscribe((state) => {
      const prog = state.scenesProgress['awards'];
      if (!prog) return;

      const p = prog.p;

      if (frontContentRef.current) {
        const exitFade = Math.max(0, 1 - prog.exit * 2.4);
        frontContentRef.current.style.opacity = String(exitFade);
      }

      // Flip-in counter cards: rotateX -100deg -> 0 staggered on entry
      flipCardRefs.current.forEach((card, idx) => {
        if (!card) return;
        // Trigger based on enter so cards are visible when arriving
        const enterTrigger = Math.max(prog.enter, prog.p * 2);
        const thresh = 0.35 + idx * 0.12;
        const cardProg = Math.max(0, Math.min(1, (enterTrigger - thresh) / 0.25));
        const rotX = (1 - cardProg) * -90;
        const cardOp = 0.4 + 0.6 * cardProg;
        card.style.transform = `rotateX(${rotX}deg)`;
        card.style.opacity = String(cardOp);
      });

      // Certifications cylinder container:
      // Desktop: translateZ(-400px) rotateX(-14deg) rotateY(-p * (360 - 360/N))
      // Mobile: scaled down (0.64) so it fits inside 390px viewport without clipping side cards
      if (cylinderRef.current) {
        const isMobile = window.innerWidth < 820;
        const angleY = -p * (360 - 360 / numCerts);
        const mobileScale = isMobile ? 0.64 : 1;
        const tiltX = isMobile ? -8 : -14;
        cylinderRef.current.style.transform = `scale(${mobileScale}) translateZ(-400px) rotateX(${tiltX}deg) rotateY(${angleY}deg)`;

        if (isMobile) {
          // Keep active front card cleanly centered; smoothly fade as user scrolls so no cut-off side cards peek
          const activeFloat = p * (numCerts - 1);
          const cards = cylinderRef.current.children;
          for (let cIdx = 0; cIdx < cards.length; cIdx++) {
            const cardEl = cards[cIdx] as HTMLElement;
            let diff = Math.abs(cIdx - activeFloat);
            if (numCerts - diff < diff) diff = numCerts - diff;
            const cardOp = Math.max(0, Math.min(1, 1 - diff * 1.6));
            cardEl.style.opacity = String(cardOp);
            cardEl.style.visibility = cardOp > 0.05 ? 'visible' : 'hidden';
          }
        }
      }
    });

    return () => {
      director.unregisterSection('awards');
      unsubscribe();
    };
  }, [numCerts]);

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="scene-section"
      style={{
        height: '320vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div className="section-outer">
        <div className="section-inner">
          {/* FRONT Content: Label, Flip counters, Speaker Spotlight, and 3D Cylinder */}
          <div
            ref={frontContentRef}
            className="awards-front-content"
            style={{
              position: 'absolute',
              left: '5vw',
              right: '5vw',
              top: '8.5vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              zIndex: 10,
              willChange: 'opacity',
            }}
          >
            {/* Top: Section Label & Title */}
            <div className="awards-header-block" style={{ maxWidth: 'min(64vw, 920px)' }}>
              <div className="section-label">
                <span className="num">({awards.sectionNum})</span>
                <span className="title">— {awards.sectionTitle}</span>
              </div>

              {/* Four flip-in counter cards in a row. Alternate red, black, red, black */}
              <div
                className="awards-flip-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                  perspective: '1200px',
                  marginTop: '1vh',
                }}
              >
                {awards.counters.map((c, idx) => {
                  const isRed = c.color === 'red';
                  return (
                    <div
                      key={idx}
                      ref={(el) => {
                        flipCardRefs.current[idx] = el;
                      }}
                      className="awards-counter-card"
                      style={{
                        background: isRed ? 'var(--red)' : 'var(--ink)',
                        color: '#ffffff',
                        padding: '20px 18px',
                        borderRadius: '20px',
                        transformOrigin: '50% 0%',
                        transform: 'rotateX(0deg)',
                        boxShadow: isRed
                          ? '0 12px 30px rgba(255, 31, 31, 0.25)'
                          : '0 12px 30px rgba(0, 0, 0, 0.15)',
                        willChange: 'transform, opacity',
                      }}
                    >
                      <div
                        className="font-anton"
                        style={{
                          fontSize: 'clamp(28px, 3.2vw, 54px)',
                          lineHeight: 1,
                          marginBottom: '4px',
                        }}
                      >
                        {c.value}
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.04em',
                          opacity: 0.9,
                        }}
                      >
                        {c.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Speaker Credibility Spotlight Banner */}
              <div
                className="awards-keynote-banner"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginTop: '1.5vh',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--red)',
                      fontWeight: 700,
                      marginRight: '8px',
                    }}
                  >
                    [KEYNOTE TALK]
                  </span>
                  <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                    {awards.speakerHighlight.event}
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--mute)', marginLeft: '6px' }}>
                    — “{awards.speakerHighlight.talk}”
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: 'var(--mute)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {awards.speakerHighlight.date}
                </span>
              </div>
            </div>

            {/* Below: Certifications 3D Cylinder Carousel (Comfortably centered in left-center zone) */}
            <div
              className="awards-cylinder-wrapper"
              style={{
                width: 'min(62vw, 860px)',
                height: '270px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1600px',
                overflow: 'visible',
                alignSelf: 'flex-start',
                marginTop: '6vh',
              }}
            >
              <div
                ref={cylinderRef}
                className="awards-cylinder"
                style={{
                  width: '350px',
                  height: '215px',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(-400px) rotateX(-14deg) rotateY(0deg)',
                  willChange: 'transform',
                }}
              >
                {awards.certifications.map((cert, idx) => {
                  const angle = (360 / numCerts) * idx;
                  const isRedCard = idx % 3 === 0;

                  return (
                    <div
                      key={idx}
                      className="awards-3d-card"
                      style={{
                        position: 'absolute',
                        width: '350px',
                        height: '215px',
                        transform: `rotateY(${angle}deg) translateZ(400px)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* FRONT FACE */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '24px',
                          background: isRedCard ? 'var(--red)' : '#ffffff',
                          color: isRedCard ? '#ffffff' : 'var(--ink)',
                          border: isRedCard ? 'none' : '1px solid rgba(13, 13, 13, 0.08)',
                          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '11px',
                              opacity: 0.85,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {cert.year}
                          </span>
                          <span
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: isRedCard ? '#ffffff' : 'var(--red)',
                              color: isRedCard ? 'var(--red)' : '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '13px',
                              fontWeight: 700,
                            }}
                          >
                            ✓
                          </span>
                        </div>

                        <div>
                          <h4
                            className="font-anton"
                            style={{
                              fontSize: '25px',
                              lineHeight: 1.1,
                              marginBottom: '6px',
                            }}
                          >
                            {cert.title}
                          </h4>
                          <div style={{ fontSize: '13px', opacity: 0.85 }}>{cert.issuer}</div>
                        </div>

                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            opacity: 0.7,
                          }}
                        >
                          // {cert.highlight}
                        </div>
                      </div>

                      {/* BACK FACE */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '24px',
                          background: 'linear-gradient(135deg, rgba(255, 31, 31, 0.15), rgba(255, 255, 255, 0.95))',
                          border: '1px solid rgba(255, 31, 31, 0.2)',
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '24px',
                        }}
                      >
                        <span className="font-anton" style={{ fontSize: '18px', color: 'var(--red)' }}>
                          AYUSH SINGH ®
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
