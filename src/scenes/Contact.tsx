import React, { useEffect, useRef } from 'react';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frontContentRef = useRef<HTMLDivElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);

  const { contact } = PORTFOLIO_DATA;

  useEffect(() => {
    if (sectionRef.current) {
      director.registerSection('contact', sectionRef.current);
    }

    const unsubscribe = director.subscribe((state) => {
      const prog = state.scenesProgress['contact'];
      if (!prog) return;

      if (frontContentRef.current) {
        // Enters with fade and rise
        const enterProg = Math.max(0, Math.min(1, prog.enter * 1.4));
        frontContentRef.current.style.opacity = String(enterProg);
      }
    });

    return () => {
      director.unregisterSection('contact');
      unsubscribe();
    };
  }, []);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    director.scrollToSection(0);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="scene-section"
      style={{
        height: '240vh',
        position: 'relative',
        width: '100%',
      }}
    >
      <div className="section-outer">
        <div className="section-inner">
          {/* FRONT Content: Email on bottom-left, stacked links on bottom-right, footer */}
          <div
            ref={frontContentRef}
            className="contact-front-content"
            style={{
              position: 'absolute',
              left: '5vw',
              right: '5vw',
              bottom: '5vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              zIndex: 10,
              willChange: 'opacity',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '32px',
                marginBottom: '4vh',
              }}
            >
              {/* Bottom-left: Email in Anton split over two lines */}
              <div>
                <div
                  className="section-label"
                  style={{
                    marginBottom: '1vh',
                    color: '#ffffff',
                  }}
                >
                  <span className="num" style={{ color: '#ffffff' }}>({contact.sectionNum})</span>
                  <span className="title" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>— Get in touch</span>
                </div>

                <a
                  href={`mailto:${contact.fullEmail}`}
                  className="contact-email-link"
                  data-cursor="Write"
                  style={{
                    textDecoration: 'none',
                    display: 'inline-block',
                    position: 'relative',
                  }}
                  onMouseEnter={() => {
                    if (underlineRef.current) underlineRef.current.style.width = '100%';
                  }}
                  onMouseLeave={() => {
                    if (underlineRef.current) underlineRef.current.style.width = '0%';
                  }}
                >
                  <div
                    className="font-anton"
                    style={{
                      fontSize: 'clamp(34px, 4.2vw, 76px)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    <div style={{ color: '#ffffff' }}>{contact.emailUser}</div>
                    <div style={{ color: 'var(--ink)' }}>{contact.emailDomain}</div>
                  </div>

                  {/* White underline wipes on hover */}
                  <div
                    ref={underlineRef}
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      height: '3px',
                      background: '#ffffff',
                      width: '0%',
                      transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </a>
              </div>

              {/* Bottom-right: Stacked links with hairline separators */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '220px',
                }}
              >
                {contact.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Open"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
                      textDecoration: 'none',
                      color: '#ffffff',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                    className="contact-link-row"
                  >
                    <span>{link.label}</span>
                    <span
                      className="arrow"
                      style={{
                        transition: 'transform 0.25s ease',
                        display: 'inline-block',
                      }}
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer: (c) 2026 Ayush Singh, Back to top */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.75)',
                letterSpacing: '0.04em',
              }}
            >
              <div>© {contact.footer.copyrightYear} {contact.footer.name}. All rights reserved.</div>

              <a
                href="#top"
                onClick={handleBackToTop}
                data-cursor="Go"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

