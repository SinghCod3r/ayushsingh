import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { scrollToTarget } from '../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

// Keyframes strategy: Smooth holds, fewer frames, cinematic interpolation
const KEY_FRAMES = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 115, 130, 150, 170, 192];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext('2d', { alpha: false });
    if (!canvasCtx) return;

    // Cache of loaded images
    const images: { [key: number]: HTMLImageElement } = {};
    let activeFrame = 1;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      canvasCtx.scale(dpr, dpr);
      drawFrame(activeFrame);
    };

    const drawFrame = (frameNum: number) => {
      // Find nearest loaded frame
      let img = images[frameNum];
      if (!img || !img.complete) {
        let bestDiff = 999;
        for (const k of KEY_FRAMES) {
          if (images[k]?.complete) {
            const diff = Math.abs(k - frameNum);
            if (diff < bestDiff) {
              bestDiff = diff;
              img = images[k];
            }
          }
        }
      }

      if (!img || !img.complete) return;

      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;

      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const ox = (cw - sw) / 2;
      const oy = (ch - sh) / 2;

      canvasCtx.fillStyle = '#080909';
      canvasCtx.fillRect(0, 0, cw, ch);
      canvasCtx.drawImage(img, ox, oy, sw, sh);
    };

    // Load keyframes progressively
    const getFrameUrl = (num: number) => {
      const padded = String(num).padStart(3, '0');
      return `/images/hero-sequence/frame-${padded}.webp`;
    };

    // Load frame 1 first
    const frame1 = new Image();
    frame1.src = getFrameUrl(1);
    images[1] = frame1;
    frame1.onload = () => {
      resizeCanvas();
    };

    // Load other keyframes
    KEY_FRAMES.forEach((num) => {
      if (num === 1) return;
      const img = new Image();
      img.src = getFrameUrl(num);
      images[num] = img;
      img.onload = () => {
        if (activeFrame === num) drawFrame(num);
      };
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // GSAP ScrollTrigger for pinned cinematic hold & controlled frame progression
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gsapCtx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Map scroll 0..1 to KEY_FRAMES with smooth holds
          const index = Math.min(
            KEY_FRAMES.length - 1,
            Math.floor(self.progress * KEY_FRAMES.length)
          );
          const targetFrame = KEY_FRAMES[index];
          if (targetFrame !== activeFrame) {
            activeFrame = targetFrame;
            drawFrame(targetFrame);
          }
        },
      });

      // Subtle typography fade & lift on scroll
      gsap.to(titleRef.current, {
        yPercent: -15,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=80%',
          scrub: 0.5,
        },
      });

      gsap.to([rolesRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=50%',
          scrub: 0.5,
        },
      });

      return () => st.kill();
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#080909] flex items-center justify-center select-none"
      style={{ isolation: 'isolate' }}
    >
      {/* 192-frame Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block w-full h-full object-cover pointer-events-none grayscale contrast-125 brightness-90"
      />

      {/* Warm Yellow Backlight / Rim Glow behind Character */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full bg-[#F5D52F]/12 blur-[140px]" />
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#080909] via-transparent to-[#080909]/70" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#080909]/80 via-transparent to-[#080909]/80" />

      {/* Foreground Hero Content Grid */}
      <div className="relative z-20 w-full max-w-7xl mx-auto h-full flex flex-col justify-between p-6 sm:p-10 pt-28 sm:pt-32">
        
        {/* Empty space for top navbar balance */}
        <div className="w-full h-6" />

        {/* Center Typography: AYUSH (White) SINGH (Yellow) */}
        <div ref={titleRef} className="my-auto w-full pointer-events-none">
          <div className="flex flex-col items-start justify-center">
            
            <h1 className="font-display text-7xl sm:text-9xl md:text-[14vw] leading-[0.82] tracking-wide uppercase text-[#F2F0E8] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
              AYUSH
            </h1>

            <h1 className="font-display text-7xl sm:text-9xl md:text-[14vw] leading-[0.82] tracking-wide uppercase text-[#F5D52F] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
              SINGH
            </h1>

          </div>
        </div>

        {/* Bottom Section: Role Metadata & Circular Scroll Pill */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-4 sm:pb-6 w-full">
          
          {/* Roles */}
          <div ref={rolesRef} className="space-y-1 font-mono text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
            <p className="text-[#F2F0E8] font-semibold text-sm sm:text-base">Software Engineer</p>
            <p>Open Source Maintainer</p>
            <p>Builder</p>
          </div>

          {/* Scroll Down Indicator (Circular Pill matching Reference) */}
          <button
            ref={scrollIndicatorRef}
            onClick={() => scrollToTarget('#about', -20)}
            className="flex flex-col items-center gap-2 group cursor-pointer text-[#8A8A8A] hover:text-[#F5D52F] transition-colors self-center sm:self-end"
            aria-label="Scroll to About section"
          >
            <div className="w-9 h-9 rounded-full border border-white/20 group-hover:border-[#F5D52F] flex items-center justify-center transition-colors">
              <ArrowDown size={14} className="text-[#F2F0E8] group-hover:text-[#F5D52F] transition-transform group-hover:translate-y-0.5" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">
              SCROLL
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};
