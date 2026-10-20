import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { director, DirectorState, SCENES } from '../engine/director';
import { frameStore } from '../engine/frames';
import { PORTFOLIO_DATA } from '../data';

// ==========================================
// 1. GLOBAL PRELOADER
// ==========================================
interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const topHalfRef = useRef<HTMLDivElement | null>(null);
  const bottomHalfRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<HTMLDivElement | null>(null);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    let targetProgress = 0;

    const unsubscribe = frameStore.onProgress((loaded, total, ready) => {
      // First quarter (48 frames) maps to 0 -> 100%
      const q = Math.ceil(total / 4);
      const ratio = Math.min(1, loaded / q);
      targetProgress = Math.round(ratio * 100);
    });

    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + Math.ceil((targetProgress - prev) * 0.2);
        if (next >= 100 && !isFinishedRef.current) {
          isFinishedRef.current = true;
          clearInterval(interval);
          triggerCompletion();
          return 100;
        }
        return Math.min(next, 100);
      });
    }, 40);

    const timeout = setTimeout(() => {
      if (!isFinishedRef.current) {
        isFinishedRef.current = true;
        clearInterval(interval);
        setPercent(100);
        triggerCompletion();
      }
    }, 1500);

    return () => {
      unsubscribe();
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const triggerCompletion = () => {
    // Disable pointer events immediately as soon as split starts
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = 'none';
    }
    if (centerRef.current) {
      centerRef.current.style.pointerEvents = 'none';
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
        director.start();
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      },
    });

    // 1. Lines slide upward
    // 2. Red halves split apart
    // 3. Expo.inOut, duration 1.2s
    tl.to(linesRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
    })
      .to(
        centerRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: 'power3.in',
        },
        '-=0.4'
      )
      .to(
        topHalfRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: 'expo.inOut',
        },
        '-=0.2'
      )
      .to(
        bottomHalfRef.current,
        {
          yPercent: 100,
          duration: 1.2,
          ease: 'expo.inOut',
        },
        '<'
      );
  };

  const formatted = String(percent).padStart(3, '0');

  return (
    <div
      ref={containerRef}
      className="preloader-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'all',
        overflow: 'hidden',
      }}
    >
      {/* Top red half */}
      <div
        ref={topHalfRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: 'var(--red)',
        }}
      />
      {/* Bottom red half */}
      <div
        ref={bottomHalfRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50vh',
          background: 'var(--red)',
        }}
      />

      {/* Center content */}
      <div
        ref={centerRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          zIndex: 10,
        }}
      >
        <div
          ref={linesRef}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1.2vh',
            opacity: 0.9,
          }}
        >
          AYUSH SINGH // SYSTEM LOADING
        </div>

        <div
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'min(26vw, 40vh)',
            lineHeight: 0.85,
            color: '#ffffff',
            userSelect: 'none',
          }}
        >
          {formatted}
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: '1.2vh',
            opacity: 0.9,
          }}
        >
          BUILD → DEBUG → CONTRIBUTE → SPEAK → SHARE
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. HUD (Heads-Up Display)
// ==========================================
export const HUD: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overallProg, setOverallProg] = useState(0);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const hudRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return director.subscribe((state) => {
      setActiveIndex(state.activeSceneIndex);
      setOverallProg(Math.round(state.overallProgress * 100));

      // On Contact: Only after t > 0.6 the HUD becomes white
      const isContact = state.activeScene.id === 'contact';
      const contactProg = state.scenesProgress['contact']?.p || 0;
      if (isContact && contactProg > 0.6) {
        setIsWhiteTheme(true);
      } else {
        setIsWhiteTheme(false);
      }
    });
  }, []);

  const navItems = SCENES.map((s, idx) => ({
    label: s.label,
    index: idx,
  }));

  const handleNavClick = (idx: number) => {
    setActiveIndex(idx); // Instant visual feedback on click
    director.scrollToSection(idx);
  };

  return (
    <header
      ref={hudRef}
      className={`hud-container ${isWhiteTheme ? 'theme-contact-white' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        zIndex: 50, // z50 as per layer architecture
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 4vw',
        pointerEvents: 'none',
        transition: 'color 0.4s ease',
      }}
    >
      {/* Left: Ayush in Anton 28px with red (R) */}
      <div
        className="hud-logo"
        style={{
          pointerEvents: 'auto',
          cursor: 'pointer',
          fontFamily: "'Anton', sans-serif",
          fontSize: '28px',
          letterSpacing: '0.02em',
          color: isWhiteTheme ? '#ffffff' : 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.4s ease',
        }}
        onClick={() => handleNavClick(0)}
      >
        <span>Ayush</span>
        <span
          style={{
            color: 'var(--red)',
            fontSize: '18px',
            marginLeft: '4px',
            verticalAlign: 'super',
          }}
        >
          ®
        </span>
      </div>

      {/* Right: Pill Navigation */}
      <nav
        className="hud-nav"
        style={{
          pointerEvents: 'auto',
          background: isWhiteTheme ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.68)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: isWhiteTheme
            ? '1px solid rgba(255, 255, 255, 0.25)'
            : '1px solid rgba(13, 13, 13, 0.08)',
          borderRadius: '999px',
          padding: '4px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeIndex === item.index;

          let pillBg = 'transparent';
          let pillColor = isWhiteTheme ? '#ffffff' : 'var(--ink)';

          if (isActive) {
            if (isWhiteTheme) {
              pillBg = '#ffffff';
              pillColor = 'var(--red)';
            } else {
              pillBg = 'var(--red)';
              pillColor = '#ffffff';
            }
          }

          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.index)}
              data-cursor="Go"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                padding: '8px 14px',
                borderRadius: '999px',
                border: 'none',
                background: pillBg,
                color: pillColor,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom-right: Mono progress percentage & 2px red vertical rail */}
      <div
        className="hud-progress-rail"
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: isWhiteTheme ? '#ffffff' : 'var(--ink)',
            letterSpacing: '0.04em',
          }}
        >
          {String(overallProg).padStart(3, '0')}%
        </span>
        <div
          style={{
            width: '2px',
            height: '60px',
            background: isWhiteTheme ? 'rgba(255, 255, 255, 0.25)' : 'rgba(13, 13, 13, 0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: `${overallProg}%`,
              background: isWhiteTheme ? '#ffffff' : 'var(--red)',
              transition: 'height 0.1s linear',
            }}
          />
        </div>
      </div>
    </header>
  );
};

// ==========================================
// 3. CURSOR & MAGNETISM
// ==========================================
export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 820) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let cursorLabel = '';
    let isHoveringInteractive = false;

    // GSAP quickTo for primary dot
    const setDotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX);
      setDotY(mouseY);

      // Check interactive targets
      const target = (e.target as HTMLElement)?.closest('button, a, .pill-btn, [data-cursor], .magnetic-btn') as HTMLElement | null;
      if (target) {
        isHoveringInteractive = true;
      } else {
        isHoveringInteractive = false;
      }
    };

    // Click effect (tactile scale on mousedown/mouseup)
    const handleMouseDown = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 0.6, duration: 0.15 });
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(0.85)`;
    };

    const handleMouseUp = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 1.0, duration: 0.15 });
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(1)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Magnetic buttons setup
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    const magnetCleanups: Array<() => void> = [];

    magneticButtons.forEach((btn) => {
      const el = btn as HTMLElement;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
        const relY = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
        xTo(relX);
        yTo(relY);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);

      magnetCleanups.push(() => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    });

    // Secondary ring ticker (lerped at 0.16)
    const onTick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

        if (isHoveringInteractive) {
          // Subtle, transparent expanding reticle that frames the button without covering text
          ringRef.current.style.width = '64px';
          ringRef.current.style.height = '64px';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.borderColor = 'var(--red)';
          ringRef.current.style.borderWidth = '2px';
          ringRef.current.style.boxShadow = '0 0 16px rgba(255, 31, 31, 0.25)';
          if (dotRef.current) {
            dotRef.current.style.opacity = '0.5';
          }
          if (textRef.current) {
            textRef.current.textContent = '';
            textRef.current.style.opacity = '0';
          }
        } else {
          ringRef.current.style.width = '42px';
          ringRef.current.style.height = '42px';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.borderColor = 'var(--red)';
          ringRef.current.style.borderWidth = '1.5px';
          ringRef.current.style.boxShadow = 'none';
          if (dotRef.current) {
            dotRef.current.style.opacity = '1';
          }
          if (textRef.current) {
            textRef.current.textContent = '';
            textRef.current.style.opacity = '0';
          }
        }
      }
    };

    gsap.ticker.add(onTick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      gsap.ticker.remove(onTick);
      magnetCleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div className="custom-cursor-container" style={{ pointerEvents: 'none' }}>
      {/* 8px red dot with white ring */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--red)',
          boxShadow: '0 0 0 2px #ffffff',
          zIndex: 9001,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Secondary ring (42px -> 92px) */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          border: '1.5px solid var(--red)',
          zIndex: 9000,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease',
        }}
      >
        <span
          ref={textRef}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#ffffff',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      </div>
    </div>
  );
};

