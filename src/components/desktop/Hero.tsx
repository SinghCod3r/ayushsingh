import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Terminal, Code2 } from 'lucide-react';
import { portfolioData } from '../../../data';
import { scrollToTarget } from '../../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Determine device tier and frame step
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Step size: 1 for desktop (all 192 frames), 2 for tablet (96 frames), 3 for mobile (64 frames)
    const frameStep = isMobile ? 3 : isTablet ? 2 : 1;

    // Cache of images
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES + 1).fill(null);
    let loadedCount = 0;
    const framesToLoad: number[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      framesToLoad.push(i);
    }
    // Always include first and last frames
    if (!framesToLoad.includes(1)) framesToLoad.unshift(1);
    if (!framesToLoad.includes(TOTAL_FRAMES)) framesToLoad.push(TOTAL_FRAMES);

    let currentFrameIndex = 1;

    // Canvas sizing with DPR clamp
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      renderFrame(currentFrameIndex);
    };

    // Draw frame onto canvas with cover aspect ratio
    const renderFrame = (index: number) => {
      // Find closest loaded frame if current isn't loaded yet
      let imgToDraw = images[index];
      if (!imgToDraw || !imgToDraw.complete) {
        // search nearest available frame
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          if (index - offset >= 1 && images[index - offset]?.complete) {
            imgToDraw = images[index - offset];
            break;
          }
          if (index + offset <= TOTAL_FRAMES && images[index + offset]?.complete) {
            imgToDraw = images[index + offset];
            break;
          }
        }
      }

      if (!imgToDraw || !imgToDraw.complete) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const imgWidth = imgToDraw.naturalWidth || 1280;
      const imgHeight = imgToDraw.naturalHeight || 720;

      // Cover math
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const scaledW = imgWidth * scale;
      const scaledH = imgHeight * scale;
      const offsetX = (canvasWidth - scaledW) / 2;
      const offsetY = (canvasHeight - scaledH) / 2;

      ctx.fillStyle = '#08080a';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(imgToDraw, offsetX, offsetY, scaledW, scaledH);
    };

    // Helper to format frame filename: e.g. 1 -> "001", 42 -> "042", 192 -> "192"
    const getFrameUrl = (frameNum: number) => {
      const padded = String(frameNum).padStart(3, '0');
      return `/images/hero-sequence/frame-${padded}.webp`;
    };

    // Progressive loading: Load frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    images[1] = firstImg;
    firstImg.onload = () => {
      loadedCount++;
      resizeCanvas();
    };

    // Load remaining keyframes in background
    const loadRemainingFrames = () => {
      framesToLoad.forEach((frameNum) => {
        if (frameNum === 1) return;
        const img = new Image();
        img.src = getFrameUrl(frameNum);
        images[frameNum] = img;
        img.onload = () => {
          loadedCount++;
          if (frameNum === currentFrameIndex) {
            renderFrame(currentFrameIndex);
          }
        };
      });
    };

    // Start background loading after initial paint
    const timer = setTimeout(loadRemainingFrames, 80);

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // GSAP Timeline & ScrollTrigger setup
    const ctxTimeline = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fallback for reduced motion
        gsap.to(container, { opacity: 1, duration: 0.5 });
        return;
      }

      const heroTl = gsap.timeline({
        scrollTrigger: {
          id: 'HERO',
          trigger: container,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: isMobile ? 0.4 : 0.6,
          refreshPriority: 10,
          onUpdate: (self) => {
            // Map scroll progress to frame
            const targetFrame = Math.min(
              TOTAL_FRAMES,
              Math.max(1, Math.round(self.progress * (TOTAL_FRAMES - 1) + 1))
            );
            currentFrameIndex = targetFrame;
            renderFrame(targetFrame);
          },
        },
      });

      // Animate typography on scroll:
      // Subtle layered movement and fade
      heroTl.to(
        [titleLeftRef.current, titleRightRef.current],
        {
          yPercent: -20,
          scale: 0.96,
          opacity: 0.2,
          ease: 'power1.out',
        },
        0.2
      );

      heroTl.to(
        infoRef.current,
        {
          yPercent: -35,
          opacity: 0,
          ease: 'power1.out',
        },
        0.3
      );

      heroTl.to(
        [topBarRef.current, scrollIndicatorRef.current],
        {
          opacity: 0,
          scale: 0.9,
          ease: 'power1.out',
        },
        0.15
      );
    }, container);

    // Synchronize all ScrollTriggers by DOM order after Hero pin is established
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
      ctxTimeline.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#08080a] flex items-center justify-center select-none"
      style={{ isolation: 'isolate' }}
    >
      {/* Canvas Element for 192-Frame Motion with Top/Bottom Feathering */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block w-full h-full object-cover pointer-events-none hero-canvas-mask"
      />

      {/* Cinematic Vignette Overlay with Obsidian Gradients */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/60" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#08080a]/80 via-transparent to-[#08080a]/80" />

      {/* Subtle radial amber glow behind character */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      </div>

      {/* Foreground Hero Content Grid */}
      <div className="relative z-20 w-full max-w-7xl mx-auto h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 pt-24 sm:pt-28">
        
        {/* Top Sub-header */}
        <div ref={topBarRef} className="flex items-center justify-end w-full">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-amber-400">✦</span>
            <span>{portfolioData.personal.location}</span>
          </div>
        </div>

        {/* Center Editorial Typography: AYUSH SINGH */}
        <div className="my-auto w-full pointer-events-none">
          <div className="flex flex-col items-start justify-center">
            
            {/* FIRST NAME */}
            <h1
              ref={titleLeftRef}
              className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[13vw] leading-[0.85] tracking-tightest uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            >
              {portfolioData.personal.firstName}
            </h1>

            {/* LAST NAME */}
            <div className="flex items-baseline justify-between w-full">
              <h1
                ref={titleRightRef}
                className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[13vw] leading-[0.85] tracking-tightest uppercase text-outline-hero drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              >
                {portfolioData.personal.lastName}
              </h1>
            </div>

          </div>
        </div>

        {/* Bottom Metadata & Scroll Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-2 sm:pb-4 w-full">
          
          {/* Supporting Roles */}
          <div ref={infoRef} className="space-y-1 max-w-md">
            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-zinc-200">
              <Code2 size={16} className="text-amber-400 shrink-0" />
              <span>{portfolioData.personal.role}</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal">
              {portfolioData.personal.subRoles.join(' • ')}
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-zinc-500">
              <Terminal size={12} className="text-zinc-400" />
              <span>The Linux Foundation / OpenPrinting Maintainer</span>
            </div>
          </div>

          {/* Scroll Down Cue */}
          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-3 self-center sm:self-end"
          >
            <button
              onClick={() => scrollToTarget('#about', -20)}
              className="group flex flex-col items-center gap-1 text-[11px] font-mono tracking-widest text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
              aria-label="Scroll to About section"
            >
              <span className="uppercase tracking-wider">SCROLL</span>
              <div className="w-8 h-8 rounded-full border border-zinc-700/80 group-hover:border-amber-400 flex items-center justify-center transition-colors">
                <ChevronDown size={14} className="animate-bounce text-zinc-400 group-hover:text-amber-400" />
              </div>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
