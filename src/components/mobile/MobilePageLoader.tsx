import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

interface MobilePageLoaderProps {
  onComplete: () => void;
}

export const MobilePageLoader: React.FC<MobilePageLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only run on mobile viewport (< 768px)
    if (window.innerWidth >= 768) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      },
    });

    // 0 -> 0.6s: Black silence
    tl.set('.mobile-loader-content', { opacity: 0, scale: 0.96 })
      .to('.mobile-loader-content', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4,
      })
      // 1.4s -> 2.2s: Hold
      .to({}, { duration: 0.8 })
      // 2.2s -> 3.0s: Cinematic exit
      .to('.mobile-loader-content', {
        opacity: 0,
        scale: 1.04,
        y: -20,
        duration: 0.6,
        ease: 'power2.in',
      })
      .to('.mobile-loader-container', {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsVisible(false);
        onComplete();
      }}
      className="mobile-loader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080909] text-[#F2F0E8] select-none cursor-pointer"
    >
      <div className="mobile-loader-content flex flex-col items-center">
        {/* Subtle Silhouette with warm yellow rim glow */}
        <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border border-[#F5D52F]/20 shadow-[0_0_40px_rgba(245,213,47,0.18)]">
          <img
            src="/images/hero-sequence/frame-001.webp"
            alt="Ayush Singh"
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-transparent opacity-60" />
        </div>

        {/* Brand name */}
        <div className="flex items-center text-2xl font-mono tracking-tight mb-4">
          <span className="text-[#F2F0E8] font-medium">singh</span>
          <span className="text-[#F5D52F] font-bold">cod3r</span>
        </div>

        {/* 3 pulsing dots */}
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5D52F] animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5D52F] animate-pulse" style={{ animationDelay: '200ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5D52F] animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>

        <p className="mt-8 text-[11px] font-mono text-[#8A8A8A] tracking-wider uppercase opacity-60">
          Tap anywhere to skip
        </p>
      </div>
    </div>
  );
};
