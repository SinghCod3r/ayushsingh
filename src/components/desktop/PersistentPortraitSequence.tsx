import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

interface PortraitState {
  xPercent: number;    // -50 to +50 (% of viewport width from center)
  yPercent: number;    // -50 to +50 (% of viewport height from center)
  scale: number;       // scale factor relative to base
  opacity: number;     // 0 to 1
  frame: number;       // 1 to 192
  glowOpacity: number; // ambient glow intensity
}

function getFrameUrl(num: number): string {
  const pad = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(num)))
    .toString()
    .padStart(3, '0');
  return `/images/hero-sequence/frame-${pad}.webp`;
}

export const PersistentPortraitSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<PortraitState>({
    xPercent: 20, // Right side of viewport in Hero
    yPercent: 0,
    scale: 0.92,
    opacity: 0.95,
    frame: 1,
    glowOpacity: 0.45,
  });

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let isDisposed = false;
    const images = imagesRef.current;

    // Nearest loaded frame finder
    const getBestAvailableImage = (targetIndex: number): HTMLImageElement | null => {
      const idx = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(targetIndex)));
      if (images[idx] && images[idx]!.complete && images[idx]!.naturalWidth > 0) {
        return images[idx];
      }
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = idx - offset;
        if (left >= 1 && images[left] && images[left]!.complete && images[left]!.naturalWidth > 0) {
          return images[left];
        }
        const right = idx + offset;
        if (right <= TOTAL_FRAMES && images[right] && images[right]!.complete && images[right]!.naturalWidth > 0) {
          return images[right];
        }
      }
      return null;
    };

    // Render loop
    const render = () => {
      if (isDisposed || !canvas || !ctx) return;

      const state = stateRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;

      if (canvas.width !== vpW * dpr || canvas.height !== vpH * dpr) {
        canvas.width = vpW * dpr;
        canvas.height = vpH * dpr;
        canvas.style.width = `${vpW}px`;
        canvas.style.height = `${vpH}px`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, vpW, vpH);

      const img = getBestAvailableImage(state.frame);

      if (img && state.opacity > 0.01) {
        const imgAspect = (img.naturalWidth || 1280) / (img.naturalHeight || 720);
        const drawH = vpH * 0.98 * state.scale;
        const drawW = drawH * imgAspect;

        const cx = (vpW / 2) + (vpW * (state.xPercent / 100));
        const cy = (vpH / 2) + (vpH * (state.yPercent / 100));
        const drawX = cx - (drawW / 2);
        const drawY = cy - (drawH / 2);

        // 1. Warm amber ambient backlight glow behind character silhouette
        if (state.glowOpacity > 0.05) {
          const glowGrad = ctx.createRadialGradient(cx, cy * 0.92, 20, cx, cy * 0.92, drawW * 0.32);
          glowGrad.addColorStop(0, `rgba(245, 158, 11, ${0.12 * state.opacity * state.glowOpacity})`);
          glowGrad.addColorStop(0.5, `rgba(245, 158, 11, ${0.03 * state.opacity * state.glowOpacity})`);
          glowGrad.addColorStop(1, 'rgba(8, 8, 10, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(cx, cy * 0.92, drawW * 0.38, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Draw transparent portrait frame (cleanly keyed, zero white background)
        ctx.globalAlpha = Math.min(1, Math.max(0, state.opacity));
        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // 3. Subtle bottom grounding fade
        const bottomFade = ctx.createLinearGradient(0, vpH * 0.85, 0, vpH);
        bottomFade.addColorStop(0, 'rgba(8, 8, 10, 0)');
        bottomFade.addColorStop(1, 'rgba(8, 8, 10, 0.95)');
        ctx.fillStyle = bottomFade;
        ctx.fillRect(0, vpH * 0.85, vpW, vpH * 0.15);
      }

      ctx.restore();
    };

    const mm = gsap.matchMedia();
    let timer1: any = null;
    let timer2: any = null;

    mm.add('(min-width: 768px)', () => {
      const state = stateRef.current;

      // Progressive preloading
      for (let i = 1; i <= 40; i++) {
        if (!images[i]) {
          const img = new Image();
          img.src = getFrameUrl(i);
          images[i] = img;
          if (i === 1) {
            img.onload = () => render();
          }
        }
      }

      timer1 = setTimeout(() => {
        if (isDisposed) return;
        for (let i = 44; i <= TOTAL_FRAMES; i += 4) {
          if (!images[i]) {
            const img = new Image();
            img.src = getFrameUrl(i);
            images[i] = img;
          }
        }
      }, 150);

      timer2 = setTimeout(() => {
        if (isDisposed) return;
        for (let i = 41; i <= TOTAL_FRAMES; i++) {
          if (!images[i]) {
            const img = new Image();
            img.src = getFrameUrl(i);
            images[i] = img;
          }
        }
      }, 600);

      render();

      // Subtle Hero breathing tween
      let breathTween = gsap.to(state, {
        scale: 0.94,
        yPercent: -1.0,
        duration: 4.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        onUpdate: render,
      });

      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom 40%',
        onLeave: () => breathTween.pause(),
        onEnterBack: () => breathTween.resume(),
      });

      const buildTimeline = () => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

        const getRatio = (sel: string, fallback: number): number => {
          const el = document.querySelector(sel);
          if (!el) return fallback;
          const top = el.getBoundingClientRect().top + window.scrollY;
          return Math.max(0, Math.min(1, top / maxScroll));
        };

        const rAbout = getRatio('#about', 0.10);
        const rWhatIDo = getRatio('#what-i-do', 0.22);
        const rSkills = getRatio('#skills', 0.36);
        const rWork = getRatio('#work', 0.50);
        const rOpenSource = getRatio('#open-source', 0.68);
        const rJourney = getRatio('#journey', 0.80);
        const rSpeaking = getRatio('#speaking', 0.90);
        const rContact = getRatio('#contact', 0.96);

        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'PORTRAIT_JOURNEY',
            trigger: '#hero',
            endTrigger: '#contact',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            onUpdate: render,
          },
        });

        // 1. HERO -> Advance initial frames
        tl.to(
          state,
          {
            frame: 36,
            ease: 'none',
            duration: rAbout * 0.6,
          },
          0
        );

        // 2. HERO -> ABOUT: Shifts to right margin, subtle presence
        tl.to(
          state,
          {
            xPercent: 38,
            yPercent: 0,
            scale: 0.68,
            opacity: 0.22,
            frame: 65,
            glowOpacity: 0.2,
            ease: 'power2.inOut',
            duration: rAbout * 0.4,
          },
          rAbout * 0.6
        );

        // 3. ABOUT -> WHAT I DO: Glides to left margin, subtle presence
        tl.to(
          state,
          {
            xPercent: -36,
            yPercent: 0,
            scale: 0.62,
            opacity: 0.16,
            frame: 95,
            glowOpacity: 0.18,
            ease: 'power2.inOut',
            duration: Math.max(0.02, (rWhatIDo - rAbout) * 0.8),
          },
          rAbout
        );

        // 4. WHAT I DO -> TECH STACK: Moves to far right edge
        tl.to(
          state,
          {
            xPercent: 40,
            yPercent: 2,
            scale: 0.55,
            opacity: 0.12,
            frame: 115,
            glowOpacity: 0.12,
            ease: 'power2.inOut',
            duration: Math.max(0.02, (rSkills - rWhatIDo) * 0.8),
          },
          rWhatIDo
        );

        // 5. TECH STACK -> WORK: Repositions on right side for project showcase
        tl.to(
          state,
          {
            xPercent: 36,
            yPercent: 0,
            scale: 0.64,
            opacity: 0.18,
            frame: 135,
            glowOpacity: 0.2,
            ease: 'power2.inOut',
            duration: Math.max(0.02, (rWork - rSkills) * 0.8),
          },
          rSkills
        );

        // 6. WORK -> OPEN SOURCE: Sits on right side for OpenPrinting
        tl.to(
          state,
          {
            xPercent: 34,
            yPercent: 0,
            scale: 0.66,
            opacity: 0.20,
            frame: 160,
            glowOpacity: 0.22,
            ease: 'power2.inOut',
            duration: Math.max(0.02, (rOpenSource - rWork) * 0.8),
          },
          rWork
        );

        // 7. OPEN SOURCE -> JOURNEY: Glides to left side
        tl.to(
          state,
          {
            xPercent: -34,
            yPercent: 0,
            scale: 0.62,
            opacity: 0.16,
            frame: 178,
            glowOpacity: 0.16,
            ease: 'power2.inOut',
            duration: Math.max(0.02, (rJourney - rOpenSource) * 0.8),
          },
          rOpenSource
        );

        // 8. JOURNEY -> SPEAKING: Shifts to left side
        tl.to(
          state,
          {
            xPercent: -32,
            yPercent: 0,
            scale: 0.58,
            opacity: 0.12,
            frame: 188,
            glowOpacity: 0.12,
            ease: 'power2.inOut',
            duration: Math.max(0.02, (rSpeaking - rJourney) * 0.8),
          },
          rJourney
        );

        // 9. SPEAKING -> CONTACT: Fades softly into the finish
        tl.to(
          state,
          {
            xPercent: 0,
            yPercent: 4,
            scale: 0.52,
            opacity: 0.05,
            frame: 192,
            glowOpacity: 0.06,
            ease: 'power2.inOut',
            duration: Math.max(0.02, (rContact - rSpeaking) * 0.8),
          },
          rSpeaking
        );
      };

      const refreshTimer = setTimeout(() => {
        buildTimeline();
        ScrollTrigger.refresh();
      }, 400);

      window.addEventListener('resize', render, { passive: true });

      return () => {
        clearTimeout(refreshTimer);
        breathTween.kill();
        window.removeEventListener('resize', render);
      };
    });

    return () => {
      isDisposed = true;
      clearTimeout(timer1);
      clearTimeout(timer2);
      mm.revert();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ isolation: 'isolate' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};
