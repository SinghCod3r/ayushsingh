import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project' | 'text'>('default');
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Only enable for desktop with fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power2.out' });
    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power3.out' });
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = target.closest('[data-cursor="project"]');
      const textElement = target.closest('p, h1, h2, h3, [data-cursor="text"]');

      if (projectCard) {
        setCursorType('project');
      } else if (interactive) {
        setCursorType('hover');
      } else if (textElement && !target.closest('button, a')) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Center dot */}
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full transition-all duration-150 ${
          cursorType === 'hover'
            ? 'scale-150 bg-amber-400'
            : cursorType === 'project'
            ? 'scale-0 bg-transparent'
            : 'bg-zinc-200'
        }`}
      />

      {/* Trailing subtle ring */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border border-amber-400/40 transition-all duration-200 ${
          cursorType === 'hover'
            ? '-ml-4 -mt-4 h-8 w-8 bg-amber-400/10 border-amber-400/60'
            : cursorType === 'project'
            ? '-ml-7 -mt-7 h-14 w-14 bg-amber-500/15 border-amber-400 text-[10px] font-mono uppercase tracking-wider text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
            : '-ml-3 -mt-3 h-6 w-6 border-zinc-600/60'
        }`}
      >
        {cursorType === 'project' && <span>VIEW</span>}
      </div>
    </div>
  );
};

