import React, { useEffect, useRef } from 'react';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';

export const Journey: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frontContentRef = useRef<HTMLDivElement | null>(null);
  const timelineSvgPathRef = useRef<SVGLineElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nodeDotRefs = useRef<Array<HTMLDivElement | null>>([]);

  const { journey } = PORTFOLIO_DATA;

  useEffect(() => {
    if (sectionRef.current) {
      director.registerSection('journey', sectionRef.current);
    }

    const unsubscribe = director.subscribe((state) => {
      const prog = state.scenesProgress['journey'];
      if (!prog) return;

      const p = prog.p;

      if (frontContentRef.current) {
        const enterFade = Math.min(1, prog.enter * 1.5);
        const exitFade = Math.max(0, 1 - prog.exit);
        frontContentRef.current.style.opacity = String(enterFade * exitFade);
      }

      // Red SVG timeline draws bottom -> top with dashoffset
      if (timelineSvgPathRef.current) {
        // p = 0: dashoffset = 1; p = 1: dashoffset = 0
        const offset = Math.max(0, Math.min(1, 1 - p));
        timelineSvgPathRef.current.style.strokeDashoffset = String(offset);
      }

      // Timeline items reveal: clean vertical reveal with high readability
      const isMobile = window.innerWidth < 820;
      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        // 3 items: bottom to top order
        const itemThreshold = (2 - idx) * 0.22;
        const itemProg = Math.max(0, Math.min(1, (p - itemThreshold) / 0.25));

        const rotY = isMobile ? 0 : (1 - itemProg) * -25;
        const transY = (1 - itemProg) * (isMobile ? 12 : 24);
        const op = isMobile ? 0.70 + 0.30 * itemProg : 0.38 + 0.62 * itemProg;

        el.style.transform = `translate3d(0, ${transY}px, 0) rotateY(${rotY}deg)`;
        el.style.opacity = String(op);

        // Active node dot fills red
        if (nodeDotRefs.current[idx]) {
          const isActive = p >= itemThreshold - 0.02;
          nodeDotRefs.current[idx]!.style.backgroundColor = isActive ? 'var(--red)' : '#ffffff';
          nodeDotRefs.current[idx]!.style.borderColor = isActive ? 'var(--red)' : 'var(--line)';
        }
      });
    });

    return () => {
      director.unregisterSection('journey');
      unsubscribe();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="scene-section"
      style={{
        height: '240vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div className="section-outer">
        <div className="section-inner">
          {/* FRONT RIGHT: Title and Timeline */}
          <div
            ref={frontContentRef}
            className="journey-front-content"
            style={{
              position: 'absolute',
              left: '50vw',
              right: '5vw',
              top: '12vh',
              bottom: '8vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 10,
              willChange: 'opacity, transform',
            }}
          >
            {/* Header: Label and LEARNING OUT LOUD. */}
            <div>
              <div className="section-label">
                <span className="num">({journey.sectionNum})</span>
                <span className="title">— {journey.sectionTitle}</span>
              </div>

              <h2
                className="font-anton"
                style={{
                  fontSize: 'clamp(44px, 5.5vw, 92px)',
                  lineHeight: 0.88,
                  marginBottom: '1vh',
                }}
              >
                <div>LEARNING</div>
                <div style={{ color: 'var(--red)' }}>OUT LOUD.</div>
              </h2>

              {/* Evolution sequence: student -> engineer -> open-source contributor -> maintainer -> speaker */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: 'var(--mute)',
                  marginTop: '1.5vh',
                  flexWrap: 'wrap',
                }}
              >
                {journey.evolution.map((stage, sIdx) => (
                  <React.Fragment key={stage}>
                    <span
                      style={{
                        color: sIdx === journey.evolution.length - 1 ? 'var(--red)' : 'var(--ink)',
                        fontWeight: 600,
                      }}
                    >
                      {stage}
                    </span>
                    {sIdx < journey.evolution.length - 1 && <span style={{ opacity: 0.4 }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Timeline with SVG track and drawing line */}
            <div
              className="journey-timeline-card"
              style={{
                position: 'relative',
                paddingLeft: '36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
                perspective: '1200px',
              }}
            >
              {/* Vertical SVG drawing line: bottom -> top */}
              <svg
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '12px',
                  bottom: '12px',
                  width: '2px',
                  height: 'calc(100% - 24px)',
                  overflow: 'visible',
                  filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45))',
                }}
              >
                {/* Grey 1px track */}
                <line x1="0" y1="0" x2="0" y2="100%" stroke="var(--line)" strokeWidth="2" />
                {/* Red animated line drawing bottom to top */}
                <line
                  ref={timelineSvgPathRef}
                  x1="0"
                  y1="100%"
                  x2="0"
                  y2="0"
                  stroke="var(--red)"
                  strokeWidth="2"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />
              </svg>

              {/* Three Timeline Items */}
              {journey.timeline.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  style={{
                    position: 'relative',
                    willChange: 'transform, opacity',
                    transition: 'transform 0.1s linear, opacity 0.1s linear',
                  }}
                >
                  {/* Node Dot */}
                  <div
                    ref={(el) => {
                      nodeDotRefs.current[idx] = el;
                    }}
                    style={{
                      position: 'absolute',
                      left: '-32px',
                      top: '6px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '2px solid var(--line)',
                      transition: 'background-color 0.25s, border-color 0.25s',
                      boxShadow: '0 0 0 3px #ffffff',
                    }}
                  />

                  {/* Year in Mono Red */}
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--red)',
                      letterSpacing: '0.04em',
                      marginBottom: '4px',
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Title in Anton */}
                  <h3
                    className="font-anton"
                    style={{
                      fontSize: 'clamp(20px, 2vw, 28px)',
                      color: 'var(--ink)',
                      lineHeight: 1.1,
                      marginBottom: '4px',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Organization & description */}
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--mute)',
                      marginBottom: '4px',
                    }}
                  >
                    {item.organization}
                  </div>

                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.4,
                      color: 'var(--mute)',
                      maxWidth: '32em',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
