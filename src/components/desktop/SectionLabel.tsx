import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionLabelProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  colorClass?: string;
  disableScrollTrigger?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  icon,
  className = '',
  colorClass = 'text-amber-400',
  disableScrollTrigger = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || charsRef.current.length === 0 || disableScrollTrigger) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        charsRef.current,
        {
          opacity: 0,
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: containerRef, dependencies: [disableScrollTrigger] }
  );

  charsRef.current = [];

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono uppercase tracking-wider select-none ${colorClass} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="flex items-center">
        {label.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) charsRef.current.push(el);
            }}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  );
};
