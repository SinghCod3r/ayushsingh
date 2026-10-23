import React, { useState } from 'react';
import { motion } from 'motion/react';

export interface TextRollProps {
  children: string;
  className?: string;
  duplicateClassName?: string;
  active?: boolean;
  isHovered?: boolean;
  stagger?: boolean;
  mode?: 'chars' | 'word';
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export const TextRoll: React.FC<TextRollProps> = ({
  children,
  className = '',
  duplicateClassName = 'text-amber-400',
  active = false,
  isHovered: externalHovered,
  stagger = true,
  mode = 'chars',
  onHoverStart,
  onHoverEnd,
}) => {
  const [internalHovered, setInternalHovered] = useState(false);

  const isRolling = active || (externalHovered !== undefined ? externalHovered : internalHovered);

  const handleMouseEnter = () => {
    setInternalHovered(true);
    onHoverStart?.();
  };

  const handleMouseLeave = () => {
    setInternalHovered(false);
    onHoverEnd?.();
  };

  const handleTouchStart = () => {
    setInternalHovered(true);
    setTimeout(() => {
      setInternalHovered(false);
    }, 500);
  };

  const chars = children.split('');

  if (mode === 'word' || !stagger) {
    return (
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        className={`relative inline-flex items-center overflow-hidden cursor-pointer select-none ${className}`}
      >
        {/* Invisible layout spacer to preserve natural layout dimensions */}
        <span className="invisible select-none pointer-events-none" aria-hidden="true">
          {children}
        </span>

        {/* Rolling column */}
        <motion.span
          className="absolute top-0 left-0 w-full flex flex-col pointer-events-none"
          initial={false}
          animate={{ y: isRolling ? '-50%' : '0%' }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
        >
          <span className="w-full flex items-center leading-none py-0.5">{children}</span>
          <span
            aria-hidden="true"
            className={`w-full flex items-center leading-none py-0.5 ${duplicateClassName}`}
          >
            {children}
          </span>
        </motion.span>
      </span>
    );
  }

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      className={`inline-flex items-center cursor-pointer select-none ${className}`}
    >
      {chars.map((char, index) => {
        const isSpace = char === ' ';
        return (
          <span key={index} className="relative inline-flex overflow-hidden">
            {/* Ghost character to retain font metrics */}
            <span className="invisible select-none pointer-events-none" aria-hidden="true">
              {isSpace ? '\u00A0' : char}
            </span>

            {/* Spring-animated dual character ticker */}
            <motion.span
              className="absolute top-0 left-0 w-full flex flex-col pointer-events-none"
              initial={false}
              animate={{ y: isRolling ? '-50%' : '0%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: isRolling ? index * 0.022 : (chars.length - index) * 0.012,
              }}
            >
              <span className="w-full flex items-center justify-center leading-none py-0.5">
                {isSpace ? '\u00A0' : char}
              </span>
              <span
                aria-hidden="true"
                className={`w-full flex items-center justify-center leading-none py-0.5 ${duplicateClassName}`}
              >
                {isSpace ? '\u00A0' : char}
              </span>
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

