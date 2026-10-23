import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const MouseFollower: React.FC = () => {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'hover' | 'project' | 'text'>('default');

  // Raw mouse coordinates
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Fast, precise spring for the center dot
  const dotX = useSpring(mouseX, { damping: 28, stiffness: 500, mass: 0.15 });
  const dotY = useSpring(mouseY, { damping: 28, stiffness: 500, mass: 0.15 });

  // Smooth, fluid spring for the glowing ring
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 240, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 240, mass: 0.5 });

  // Ambient soft spotlight spring with luxurious inertia
  const ambientX = useSpring(mouseX, { damping: 45, stiffness: 120, mass: 1 });
  const ambientY = useSpring(mouseY, { damping: 45, stiffness: 120, mass: 1 });

  useEffect(() => {
    // Check for pointer capability and reduced motion preference
    const fineMatch = window.matchMedia('(pointer: fine)').matches;
    const coarseMatch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!fineMatch || coarseMatch || reducedMotion) {
      setIsFinePointer(false);
      return;
    }

    setIsFinePointer(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest('[data-cursor="project"]');
      const interactiveTarget = target.closest('a, button, [role="button"], input, textarea, select, .magnetic-target');
      const textTarget = target.closest('p, h1, h2, h3, h4, [data-cursor="text"]');

      if (projectTarget) {
        setCursorMode('project');
      } else if (interactiveTarget) {
        setCursorMode('hover');
      } else if (textTarget && !target.closest('button, a')) {
        setCursorMode('text');
      } else {
        setCursorMode('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Gracefully return null for mobile/touch devices
  if (!isFinePointer) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Ambient soft radial gradient spotlight following cursor */}
      <motion.div
        style={{
          x: ambientX,
          y: ambientY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none select-none blur-3xl opacity-25 bg-[radial-gradient(circle,rgba(245,213,47,0.1)_0%,rgba(245,213,47,0.02)_50%,transparent_75%)]"
      />

      {/* 2. Skipper Glowing Follower Ring / Interactive Badge */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorMode === 'project' ? 72 : cursorMode === 'hover' ? 44 : cursorMode === 'text' ? 18 : 26,
          height: cursorMode === 'project' ? 72 : cursorMode === 'hover' ? 44 : cursorMode === 'text' ? 18 : 26,
          borderColor:
            cursorMode === 'project'
              ? 'rgba(245, 213, 47, 0.9)'
              : cursorMode === 'hover'
              ? 'rgba(245, 213, 47, 0.6)'
              : 'rgba(245, 213, 47, 0.25)',
          backgroundColor:
            cursorMode === 'project'
              ? 'rgba(245, 213, 47, 0.2)'
              : cursorMode === 'hover'
              ? 'rgba(245, 213, 47, 0.12)'
              : 'rgba(245, 213, 47, 0.02)',
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25,
        }}
        className="fixed top-0 left-0 rounded-full border flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_20px_rgba(245,158,11,0.15)] will-change-transform"
      >
        {cursorMode === 'project' && (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
            VIEW
          </span>
        )}
      </motion.div>

      {/* 3. Center Precision Follower Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorMode === 'project' ? 0 : cursorMode === 'hover' ? 1.6 : 1,
          backgroundColor:
            cursorMode === 'hover'
              ? '#f59e0b'
              : cursorMode === 'text'
              ? '#fbbf24'
              : '#f4f4f5',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)] will-change-transform"
      />
    </div>
  );
};

