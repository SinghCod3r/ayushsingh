import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface AnimatedHeadingProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  disableScrollTrigger?: boolean;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  text,
  className = '',
  as: Component = 'h2',
  disableScrollTrigger = false,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = headingRef.current;
      if (!el || disableScrollTrigger) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      try {
        const split = new SplitText(el, {
          type: 'lines,words',
          linesClass: 'split-line overflow-hidden',
          wordsClass: 'split-word inline-block will-change-transform',
        });

        gsap.fromTo(
          split.words,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );

        return () => {
          split.revert();
        };
      } catch (e) {
        console.warn('SplitText animation fallback:', e);
      }
    },
    { scope: headingRef, dependencies: [disableScrollTrigger] }
  );

  return (
    <Component
      ref={headingRef as React.RefObject<any>}
      className={`will-change-transform ${className}`}
    >
      {text || children}
    </Component>
  );
};
