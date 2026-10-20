import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 14,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    const ry = normX * maxTilt;
    const rx = -normY * maxTilt;

    setTilt({
      rx,
      ry,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`}
      style={{
        ...style,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="tilt-card-inner"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 20px 40px -15px rgba(255, 31, 31, 0.12), 0 0 1px 1px rgba(255, 31, 31, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          transform: isHovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {/* Moving radial glare */}
        <div
          className="tilt-card-glare"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '24px',
            opacity: isHovered ? 0.35 : 0,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.9) 0%, rgba(255,31,31,0.08) 40%, transparent 70%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
};

