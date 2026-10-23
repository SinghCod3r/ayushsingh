import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Displacement factor
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.2,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const contentX = useMotionValue(0);
  const contentY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 20, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothContentX = useSpring(contentX, springConfig);
  const smoothContentY = useSpring(contentY, springConfig);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isFinePointer || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);

    // Inner content moves with subtle parallax
    contentX.set(distanceX * (strength * 0.4));
    contentY.set(distanceY * (strength * 0.4));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    contentX.set(0);
    contentY.set(0);
  };

  if (!isFinePointer) {
    return (
      <button className={`relative inline-flex items-center justify-center transition-colors ${className}`} {...props}>
        <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
          {children}
        </span>
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`relative inline-flex items-center justify-center magnetic-target will-change-transform ${className}`}
      {...(props as any)}
    >
      <motion.span
        style={{ x: smoothContentX, y: smoothContentY }}
        className="relative z-10 flex items-center justify-center gap-2 pointer-events-none will-change-transform"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
