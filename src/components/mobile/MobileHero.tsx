import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 32 carefully selected keyframe numbers for mobile performance
const MOBILE_FRAMES = [
  1, 6, 12, 18, 25, 32, 40, 48, 56, 64, 72, 80, 88, 96,
  104, 112, 120, 128, 136, 144, 152, 160, 168, 174, 180, 185, 188, 190, 192
];

function getFramePath(num: number): string {
  const pad = num.toString().padStart(3, '0');
  return `/images/hero-sequence/frame-${pad}.webp`;
}

export const MobileHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    MOBILE_FRAMES.forEach((frameNum, idx) => {
      const img = new Image();
      img.src = getFramePath(frameNum);
      img.onload = () => {
        if (isCancelled) return;
        loadedImages[idx] = img;
        loadedCount++;
        // As soon as the first frame loads, render it immediately
        if (idx === 0 && canvasRef.current) {
          renderFrame(0);
        }
      };
      img.onerror = () => {
        loadedCount++;
      };
    });

    imagesRef.current = loadedImages;

    const renderFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = imagesRef.current[index] || imagesRef.current[0];
      if (!img || !img.complete) return;

      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cover aspect ratio
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawW = canvas.width;
        drawH = canvas.width / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawH = canvas.height;
        drawW = canvas.height * imgAspect;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    // ScrollTrigger to smoothly advance frames on mobile scroll
    const mm = gsap.matchMedia();
    mm.add('(max-width: 767px)', () => {
      const obj = { frame: 0 };
      gsap.to(obj, {
        frame: MOBILE_FRAMES.length - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const frameIdx = Math.round(self.progress * (MOBILE_FRAMES.length - 1));
            renderFrame(frameIdx);
          },
        },
      });
    });

    return () => {
      isCancelled = true;
      mm.revert();
    };
  }, []);

  return (
    <section
      id="mobile-hero"
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-between pt-20 pb-8 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden"
    >
      {/* Warm Yellow Ambient Rim Backlight behind portrait */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#F5D52F]/15 blur-3xl pointer-events-none" />

      {/* Portrait Canvas / Frame Display */}
      <div className="relative w-full h-[46vh] max-h-[380px] flex items-center justify-center my-auto">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain filter grayscale contrast-125 brightness-95"
        />
        {/* Soft vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-[#080909]/40 pointer-events-none" />
      </div>

      {/* Hero Typography & Metadata (Fits in 1 viewport) */}
      <div className="relative z-10 flex flex-col items-start w-full">
        {/* Large condensed editorial heading: AYUSH SINGH */}
        <h1 className="font-editorial text-[17vw] leading-[0.88] tracking-tight text-[#F5D52F] select-none">
          AYUSH<br />
          SINGH
        </h1>

        {/* Roles & Metadata */}
        <div className="mt-4 flex flex-col space-y-0.5 text-xs font-mono text-[#8A8A8A]">
          <span className="text-[#F2F0E8] font-medium">Software Engineer</span>
          <span>Open Source Maintainer</span>
          <span>Builder</span>
        </div>

        {/* Circular Scroll Badge */}
        <div className="mt-6 self-center flex flex-col items-center">
          <a
            href="#mobile-about"
            className="w-10 h-10 rounded-full border border-white/20 flex flex-col items-center justify-center text-[8px] font-mono tracking-widest text-[#8A8A8A] hover:border-[#F5D52F] hover:text-[#F5D52F] transition-colors"
          >
            <span>↓</span>
          </a>
          <span className="mt-1 text-[8px] font-mono tracking-widest uppercase text-[#8A8A8A]">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
};
