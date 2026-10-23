import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Pull factor (e.g. 0.2)
  className?: string;
  as?: 'div' | 'span';
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.2,
  className = '',
  as = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 20, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isFine && !isCoarse && !reducedMotion) {
      setIsFinePointer(true);
    } else {
      setIsFinePointer(false);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFinePointer || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!isFinePointer) {
    if (as === 'span') {
      return <span className={`inline-block ${className}`}>{children}</span>;
    }
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  const Component = as === 'span' ? motion.span : motion.div;

  return (
    <Component
      ref={ref as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block magnetic-target will-change-transform ${className}`}
    >
      {children}
    </Component>
  );
};

