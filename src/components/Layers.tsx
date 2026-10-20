import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';
import { Odometer } from './Odometer';

// 16 skills for Fibonacci sphere
const SKILLS_LIST = PORTFOLIO_DATA.toolkit.skills;

interface SpherePoint {
  skill: string;
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
}

export const Layers: React.FC = () => {
  // Back layer elements refs
  const heroNameRef = useRef<HTMLDivElement | null>(null);
  const heroLettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const aboutWashRef = useRef<HTMLDivElement | null>(null);
  const workGridRef = useRef<HTMLDivElement | null>(null);
  const journeyYearRef = useRef<HTMLDivElement | null>(null);
  const [journeyYear, setJourneyYear] = useState(2022);
  const contactRedBgRef = useRef<HTMLDivElement | null>(null);
  const contactTalkRef = useRef<HTMLDivElement | null>(null);

  // Fibonacci sphere refs for 0 re-render direct DOM updates
  const backChipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frontChipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const lastYearRef = useRef<number>(2022);

  useEffect(() => {
    // Intro animation for hero letters: yPercent: 115, rotateX: -80, stagger: 0.07, expo.out: 1.6
    if (heroLettersRef.current.length > 0) {
      gsap.fromTo(
        heroLettersRef.current,
        {
          yPercent: 115,
          rotateX: -80,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.07,
          ease: 'expo.out',
          duration: 1.6,
          delay: 0.2,
        }
      );
    }

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseOffset.current.x = (e.clientX - cx) / cx;
      mouseOffset.current.y = (e.clientY - cy) / cy;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Director subscription for high-performance direct DOM manipulation
    const unsubscribe = director.subscribe((state) => {
      const { vh, vw, scenesProgress, transition, y } = state;

      // 1. Hero Giant AYUSH
      const heroProg = scenesProgress['hero'];
      if (heroNameRef.current && heroProg) {
        const exitFade = Math.max(0, 1 - heroProg.exit * 2.4);
        heroNameRef.current.style.opacity = String(exitFade);

        // Tiny alternating vertical parallax on letters
        heroLettersRef.current.forEach((letter, i) => {
          if (letter) {
            const dir = i % 2 === 0 ? 1 : -1;
            letter.style.transform = `translate3d(0, ${heroProg.p * 24 * dir}px, 0)`;
          }
        });
      }

      // 2. About soft red wash
      const aboutProg = scenesProgress['about'];
      if (aboutWashRef.current && aboutProg) {
        const enterFade = Math.min(1, aboutProg.enter * 1.5);
        const exitFade = Math.max(0, 1 - aboutProg.exit * 2.4);
        const op = enterFade * exitFade;
        aboutWashRef.current.style.opacity = String(op);
        aboutWashRef.current.style.transform = `translate3d(${-(1 - enterFade) * 40}px, 0, 0)`;
      }

      // 3. Work red perspective grid floor
      const workProg = scenesProgress['work'];
      if (workGridRef.current && workProg) {
        const enterFade = Math.min(1, workProg.enter * 1.8);
        const exitFade = Math.max(0, 1 - workProg.exit * 2.4);
        workGridRef.current.style.opacity = String(enterFade * exitFade);
        const gridOffset = (workProg.p * 450) % 90;
        workGridRef.current.style.backgroundPosition = `0 ${gridOffset}px`;
      }

      // 4. Journey colossal outlined year roll
      const journeyProg = scenesProgress['journey'];
      if (journeyYearRef.current && journeyProg) {
        const enterFade = Math.min(1, journeyProg.enter * 1.8);
        const exitFade = Math.max(0, 1 - journeyProg.exit * 2.4);
        journeyYearRef.current.style.opacity = String(enterFade * exitFade);

        // Roll from 2022 to 2026
        const targetYear = Math.round(2022 + journeyProg.p * 4);
        if (targetYear !== lastYearRef.current) {
          lastYearRef.current = targetYear;
          setJourneyYear(targetYear);
        }
      }

      // 5. Contact Full Red Blade Background and LET'S TALK
      const contactProg = scenesProgress['contact'];
      if (contactRedBgRef.current) {
        if (!contactProg || contactProg.enter <= 0) {
          contactRedBgRef.current.style.display = 'none';
        } else {
          contactRedBgRef.current.style.display = 'block';

          // On transition to Contact, use identical clip-path math:
          if (transition && transition.isTransitioning && transition.toScene.id === 'contact') {
            const skew = 0.2 * vh;
            const e = -skew + (vw + 2 * skew) * transition.t;
            contactRedBgRef.current.style.clipPath = `polygon(0 0, ${e + skew}px 0, ${e - skew}px ${vh}px, 0 ${vh}px)`;
          } else {
            contactRedBgRef.current.style.clipPath = 'none';
          }
        }
      }

      if (contactTalkRef.current && contactProg) {
        const enterProg = Math.max(0, Math.min(1, contactProg.enter * 1.5));
        contactTalkRef.current.style.opacity = String(enterProg);
        contactTalkRef.current.style.transform = `translate3d(0, ${(1 - enterProg) * 30}px, 0)`;
      }

      // 6. Skills Fibonacci Sphere Kinematics (Direct DOM updates)
      const skillsProg = scenesProgress['skills'];
      if (!skillsProg || skillsProg.vis <= 0.02) {
        for (let i = 0; i < SKILLS_LIST.length; i++) {
          if (backChipRefs.current[i]) backChipRefs.current[i]!.style.display = 'none';
          if (frontChipRefs.current[i]) frontChipRefs.current[i]!.style.display = 'none';
        }
      } else {
        updateSphereKinematics(skillsProg.p, y);
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      unsubscribe();
    };
  }, []);

  // Fibonacci Sphere math (Direct DOM transform mutations)
  const updateSphereKinematics = (p: number, scrollY: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Radius: R = min(27vw, 46vh)
    const R = Math.min(vw * 0.27, vh * 0.46);
    const ySquash = 0.78;
    const baseTilt = -0.28; // radians

    // Auto-spin + Scroll spin (scroll * 5) + Mouse follow
    const time = performance.now() * 0.0006;
    const rotY = time + (scrollY * 0.005) + mouseOffset.current.x * 0.4;
    const rotX = baseTilt + mouseOffset.current.y * 0.3;

    const N = SKILLS_LIST.length;
    const phiAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const centerX = vw * 0.5;
    const centerY = vh * 0.52;

    for (let i = 0; i < N; i++) {
      const yNorm = 1 - (i / (N - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - yNorm * yNorm);
      const theta = phiAngle * i + rotY;

      // 3D coordinates on unit sphere
      const x0 = Math.cos(theta) * radiusAtY * R;
      const y0 = yNorm * R * ySquash;
      const z0 = Math.sin(theta) * radiusAtY * R;

      // Apply tilt around X axis
      const yTilted = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
      const zTilted = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);

      const screenX = centerX + x0;
      const screenY = centerY + yTilted;
      const scale = 0.8 + 0.3 * ((zTilted + R) / (2 * R));

      const backEl = backChipRefs.current[i];
      const frontEl = frontChipRefs.current[i];

      if (zTilted < 0) {
        if (backEl) {
          backEl.style.display = 'block';
          backEl.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${scale})`;
          backEl.style.opacity = String(0.45 + (scale - 0.8) * 0.8);
        }
        if (frontEl) {
          frontEl.style.display = 'none';
        }
      } else {
        if (frontEl) {
          frontEl.style.display = 'block';
          frontEl.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${scale})`;
        }
        if (backEl) {
          backEl.style.display = 'none';
        }
      }
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. FIXED LAYER-BACK (z0: Behind the person)               */}
      {/* ========================================================= */}
      <div className="layer-back">
        {/* HERO: Giant AYUSH magazine title behind person's head */}
        <div
          ref={heroNameRef}
          className="hero-giant-name font-anton"
          style={{
            position: 'absolute',
            right: '3vw',
            top: '10.5vh',
            fontSize: 'min(18.5vw, 36vh)',
            lineHeight: 0.82,
            color: 'var(--red)',
            userSelect: 'none',
            display: 'flex',
            zIndex: 1,
            perspective: '1000px',
            willChange: 'transform, opacity',
          }}
        >
          {['A', 'Y', 'U', 'S', 'H'].map((letter, idx) => (
            <span
              key={idx}
              ref={(el) => {
                heroLettersRef.current[idx] = el;
              }}
              style={{
                display: 'inline-block',
                willChange: 'transform',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* ABOUT: Soft red shade radial gradient behind person */}
        <div
          ref={aboutWashRef}
          className="about-back-wash"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(60vw 90vh at 22vw 70vh, rgba(255,31,31,.30), rgba(255,31,31,.10) 55%, transparent 80%), linear-gradient(90deg, rgba(255,31,31,.05), transparent 60%)',
            opacity: 0,
            transition: 'opacity 0.2s',
            willChange: 'opacity, transform',
          }}
        />

        {/* WORK: Red perspective grid floor */}
        <div
          ref={workGridRef}
          className="work-perspective-grid"
          style={{
            position: 'absolute',
            bottom: '-10vh',
            left: '-20vw',
            right: '-20vw',
            height: '60vh',
            backgroundImage:
              'linear-gradient(to right, rgba(255,31,31,.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,31,31,.25) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
            transform: 'perspective(600px) rotateX(68deg)',
            transformOrigin: '50% 100%',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 85%)',
            opacity: 0,
            willChange: 'opacity, background-position',
          }}
        />

        {/* JOURNEY: Colossal outlined year rolling behind person */}
        <div
          ref={journeyYearRef}
          className="journey-colossal-year"
          style={{
            position: 'absolute',
            left: '5vw',
            top: '26vh',
            opacity: 0,
            zIndex: 1,
            userSelect: 'none',
            willChange: 'opacity',
          }}
        >
          <Odometer
            value={journeyYear}
            fontSize="min(44vh, 32vw)"
            outlined={true}
          />
        </div>

        {/* SKILLS: Back half of Fibonacci sphere chips (z < 0) */}
        {SKILLS_LIST.map((skill, idx) => (
          <div
            key={idx}
            ref={(el) => {
              backChipRefs.current[idx] = el;
            }}
            className="sphere-chip-back"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'none',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(255, 31, 31, 0.35)',
              color: 'var(--red)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(255, 31, 31, 0.08)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          >
            {skill}
          </div>
        ))}

        {/* CONTACT: Full red background and giant white LET'S TALK */}
        <div
          ref={contactRedBgRef}
          className="contact-red-background"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--red)',
            display: 'none',
            zIndex: 2,
          }}
        >
          {/* Giant LET'S TALK behind person */}
          <div
            ref={contactTalkRef}
            className="font-anton"
            style={{
              position: 'absolute',
              top: '10vh',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: 'min(36vh, 26vw)',
              lineHeight: 0.84,
              color: '#ffffff',
              userSelect: 'none',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            <div>LET'S</div>
            <div>TALK</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. FIXED LAYER-FRONT (z2: Front of canvas)                */}
      {/* ========================================================= */}
      <div className="layer-front">
        {/* SKILLS: Front half of Fibonacci sphere chips (z >= 0) */}
        {SKILLS_LIST.map((skill, idx) => (
          <div
            key={idx}
            ref={(el) => {
              frontChipRefs.current[idx] = el;
            }}
            className="sphere-chip-front"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'none',
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'var(--red)',
              color: '#ffffff',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(255, 31, 31, 0.4), 0 0 12px rgba(255, 31, 31, 0.6)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </>
  );
};
