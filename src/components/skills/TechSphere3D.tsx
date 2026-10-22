import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Technology, TechCategory } from '../../../data';
import { TechIcon } from './TechIcon';
import gsap from 'gsap';

interface TechSphere3DProps {
  technologies: Technology[];
  activeCategory: TechCategory;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Bond {
  from: number;
  to: number;
}

// Compute uniform spherical distribution using the Fibonacci sphere algorithm
function calculateFibonacciSphere(count: number, radius: number): Point3D[] {
  const points: Point3D[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    points.push({ x, y, z });
  }

  return points;
}

// Compute structural attachment bonds between nearest neighbor balls
function calculateAttachmentBonds(points: Point3D[], neighborsPerNode = 3): Bond[] {
  const bondSet = new Set<string>();
  const bonds: Bond[] = [];

  for (let i = 0; i < points.length; i++) {
    const distances: { j: number; d: number }[] = [];

    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dz = points[i].z - points[j].z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      distances.push({ j, d });
    }

    distances.sort((a, b) => a.d - b.d);

    for (let k = 0; k < Math.min(neighborsPerNode, distances.length); k++) {
      const j = distances[k].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!bondSet.has(key)) {
        bondSet.add(key);
        bonds.push({ from: Math.min(i, j), to: Math.max(i, j) });
      }
    }
  }

  return bonds;
}

export const TechSphere3D: React.FC<TechSphere3DProps> = ({
  technologies,
  activeCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Rotation angles in radians
  const rotX = useRef<number>(0.2);
  const rotY = useRef<number>(0);

  // Angular velocities with inertia
  const velX = useRef<number>(0.0012);
  const velY = useRef<number>(0.0035);

  // Pointer drag tracking
  const isPointerDown = useRef<boolean>(false);
  const lastPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isHoveringItem = useRef<boolean>(false);

  // Assembly factor: 0 (dispersed in space) -> 1 (attached into big 3D ball)
  const assemblyProgress = useRef<number>(0);
  const [isAssembled, setIsAssembled] = useState<boolean>(false);

  // State for hovered / tapped technology
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeTech, setActiveTech] = useState<Technology | null>(null);

  // Responsive dimensions
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
    radius: number;
    ballSize: number;
  }>({
    width: 800,
    height: 580,
    radius: 220,
    ballSize: 58,
  });

  // Track window resize
  useEffect(() => {
    const updateSize = () => {
      const w = containerRef.current?.offsetWidth || window.innerWidth;
      const isMobile = w < 768;
      const isTablet = w >= 768 && w < 1024;

      const sphereWidth = Math.min(w, 1080);
      const sphereHeight = isMobile ? 420 : isTablet ? 520 : 600;
      const sphereRadius = isMobile ? 135 : isTablet ? 180 : 225;
      const ballSize = isMobile ? 44 : isTablet ? 52 : 60;

      setDimensions({
        width: sphereWidth,
        height: sphereHeight,
        radius: sphereRadius,
        ballSize,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Precompute unit points on the sphere
  const unitPoints = useMemo(() => {
    return calculateFibonacciSphere(technologies.length, 1.0);
  }, [technologies.length]);

  // Precompute attachment bonds between balls
  const bonds = useMemo(() => {
    return calculateAttachmentBonds(unitPoints, 3);
  }, [unitPoints]);

  // Animate the assembly of balls coming together to form the Big 3D Ball
  const triggerAssembly = useCallback(() => {
    assemblyProgress.current = 0;
    setIsAssembled(false);

    gsap.to(assemblyProgress, {
      current: 1,
      duration: 1.4,
      ease: 'elastic.out(1, 0.65)',
      onComplete: () => setIsAssembled(true),
    });
  }, []);

  // Trigger assembly on initial mount
  useEffect(() => {
    const timer = setTimeout(triggerAssembly, 250);
    return () => clearTimeout(timer);
  }, [triggerAssembly]);

  // Projected 2D coordinates for balls and bonds
  const [projectedBalls, setProjectedBalls] = useState<
    {
      tech: Technology;
      x: number;
      y: number;
      z: number;
      scale: number;
      opacity: number;
      zIndex: number;
    }[]
  >([]);

  const [projectedBonds, setProjectedBonds] = useState<
    {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      zMid: number;
      opacity: number;
      isHighlighted: boolean;
      highlightColor?: string;
    }[]
  >([]);

  // Main 3D Animation Loop
  const animate = useCallback(() => {
    const { width, height, radius } = dimensions;
    const cx = width / 2;
    const cy = height / 2;

    // Apply auto-rotation or inertia
    if (!isPointerDown.current) {
      const speedFactor = isHoveringItem.current ? 0.2 : 1.0;
      rotY.current += velY.current * speedFactor;
      rotX.current += velX.current * speedFactor;

      // Gentle return to baseline momentum
      velX.current = velX.current * 0.98 + 0.0008 * 0.02;
      velY.current = velY.current * 0.98 + 0.003 * 0.02;
    }

    const cosY = Math.cos(rotY.current);
    const sinY = Math.sin(rotY.current);
    const cosX = Math.cos(rotX.current);
    const sinX = Math.sin(rotX.current);

    // Current sphere radius modulated by assembly progress (starts dispersed at 1.7x, contracts to 1.0x)
    const currentRadius = radius * (1.7 - 0.7 * assemblyProgress.current);

    // Compute 3D positions for every ball
    const rotatedCoords: { x: number; y: number; z: number }[] = [];

    const newProjectedBalls = technologies.map((tech, i) => {
      const u = unitPoints[i] || { x: 0, y: 0, z: 0 };
      const px = u.x * currentRadius;
      const py = u.y * currentRadius;
      const pz = u.z * currentRadius;

      // 1. Rotate around Y axis
      const x1 = px * cosY + pz * sinY;
      const z1 = -px * sinY + pz * cosY;

      // 2. Rotate around X axis
      const y2 = py * cosX - z1 * sinX;
      const z2 = py * sinX + z1 * cosX;

      rotatedCoords.push({ x: cx + x1, y: cy + y2, z: z2 });

      // Depth normalization: 0 (furthest back) to 1 (closest front)
      const depthFactor = (z2 + currentRadius) / (2 * currentRadius);
      const clampedDepth = Math.max(0, Math.min(1, depthFactor));

      // Perspective scaling: closer balls are larger, giving true 3D sphere volume
      const scale = 0.65 + clampedDepth * 0.55;

      // Opacity
      const isFiltered = activeCategory !== 'all' && tech.category !== activeCategory;
      let opacity = isFiltered ? 0.16 : 0.35 + clampedDepth * 0.65;

      if (hoveredIdx === i) {
        opacity = 1;
      }

      const zIndex = Math.round(clampedDepth * 100);

      return {
        tech,
        x: cx + x1,
        y: cy + y2,
        z: z2,
        scale,
        opacity,
        zIndex,
      };
    });

    // Compute 3D attachment bonds connecting the balls together
    const newProjectedBonds = bonds.map((bond) => {
      const p1 = rotatedCoords[bond.from];
      const p2 = rotatedCoords[bond.to];

      if (!p1 || !p2) {
        return { x1: 0, y1: 0, x2: 0, y2: 0, zMid: 0, opacity: 0, isHighlighted: false };
      }

      const zMid = (p1.z + p2.z) / 2;
      const depthFactor = (zMid + currentRadius) / (2 * currentRadius);
      const clampedDepth = Math.max(0, Math.min(1, depthFactor));

      // Check if bond is connected to hovered ball
      const isConnectedToHovered = hoveredIdx === bond.from || hoveredIdx === bond.to;
      const hoveredColor = hoveredIdx !== null ? technologies[hoveredIdx]?.color : undefined;

      // Bond opacity scales with assembly progress (bonds appear as balls attach)
      const baseOpacity = isConnectedToHovered
        ? 0.95
        : (0.05 + clampedDepth * 0.18) * assemblyProgress.current;

      return {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        zMid,
        opacity: baseOpacity,
        isHighlighted: isConnectedToHovered,
        highlightColor: hoveredColor,
      };
    });

    setProjectedBalls(newProjectedBalls);
    setProjectedBonds(newProjectedBonds);

    animFrameRef.current = requestAnimationFrame(animate);
  }, [dimensions, technologies, unitPoints, bonds, activeCategory, hoveredIdx]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  // Pointer interactions for dragging and rotating the big 3D ball
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) {
      // Subtle mouse tracking influence
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        velY.current = mouseX * 0.007;
        velX.current = -mouseY * 0.005;
      }
      return;
    }

    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;

    rotY.current += deltaX * 0.008;
    rotX.current -= deltaY * 0.008;

    velY.current = deltaX * 0.005;
    velX.current = -deltaY * 0.005;

    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDown.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const currentHoveredTech = hoveredIdx !== null ? technologies[hoveredIdx] : null;
  const currentDisplayTech = currentHoveredTech || activeTech;
  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full overflow-hidden select-none touch-none flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
      style={{
        height: `${dimensions.height}px`,
        isolation: 'isolate',
      }}
      aria-label="3D Technology Sphere"
    >
      {/* Ambient Radial Core Backdrop */}
      <div
        className="absolute pointer-events-none z-0 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent blur-2xl"
        style={{
          width: `${dimensions.radius * 2}px`,
          height: `${dimensions.radius * 2}px`,
          left: `${cx}px`,
          top: `${cy}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* =================================================================== */}
      {/* 1. ATTACHMENT BONDS (Interconnecting lines between adjacent balls)   */}
      {/* Forming the geodesic lattice of the Big 3D Ball                     */}
      {/* =================================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <filter id="bondGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {projectedBonds.map((bond, idx) => {
          const stroke = bond.isHighlighted
            ? bond.highlightColor || '#f59e0b'
            : '#818cf8';

          const strokeWidth = bond.isHighlighted ? 2.2 : 1.2;

          return (
            <line
              key={`bond-${idx}`}
              x1={bond.x1}
              y1={bond.y1}
              x2={bond.x2}
              y2={bond.y2}
              stroke={stroke}
              strokeOpacity={bond.opacity}
              strokeWidth={strokeWidth}
              filter={bond.isHighlighted ? 'url(#bondGlow)' : undefined}
              className="transition-colors duration-200"
            />
          );
        })}
      </svg>

      {/* =================================================================== */}
      {/* 2. BALL-LIKE ICONS (Spherical glossy 3D orbs with tech logos inside) */}
      {/* =================================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {projectedBalls.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isMatching = activeCategory === 'all' || item.tech.category === activeCategory;
          const ballSize = dimensions.ballSize;

          return (
            <div
              key={item.tech.id}
              style={{
                position: 'absolute',
                left: `${item.x}px`,
                top: `${item.y}px`,
                transform: `translate(-50%, -50%) scale(${isHovered ? item.scale * 1.35 : item.scale})`,
                opacity: item.opacity,
                zIndex: isHovered ? 250 : item.zIndex,
                pointerEvents: isMatching ? 'auto' : 'none',
              }}
              onMouseEnter={() => {
                isHoveringItem.current = true;
                setHoveredIdx(idx);
              }}
              onMouseLeave={() => {
                isHoveringItem.current = false;
                setHoveredIdx(null);
              }}
              onClick={() => setActiveTech(item.tech)}
              className="group cursor-pointer select-none transition-transform duration-150 flex flex-col items-center"
            >
              {/* 3D Ball Orb Unit */}
              <div
                className={`relative rounded-full flex items-center justify-center transition-all duration-200 ${
                  isHovered ? 'ring-2 ring-amber-400' : ''
                }`}
                style={{
                  width: `${ballSize}px`,
                  height: `${ballSize}px`,
                  // Glossy 3D Spherical Shader Gradient
                  background: isHovered
                    ? `radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.45) 0%, ${item.tech.color || '#f59e0b'}55 25%, #181b22 65%, #08090d 100%)`
                    : `radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 25%, #141720 65%, #07080c 100%)`,
                  boxShadow: isHovered
                    ? `inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -4px 10px rgba(0, 0, 0, 0.8), 0 0 24px ${item.tech.color || '#f59e0b'}66, 0 8px 18px rgba(0,0,0,0.6)`
                    : `inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -3px 8px rgba(0, 0, 0, 0.75), 0 6px 14px rgba(0,0,0,0.5)`,
                }}
              >
                {/* 3D Specular Curved Glint (Gloss highlight at top-left) */}
                <span
                  className="absolute top-1.5 left-2 w-4 h-2 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.7) 0%, transparent 80%)',
                    transform: 'rotate(-25deg)',
                  }}
                />

                {/* Subsurface Edge Rim Accent */}
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    border: `1px solid ${isHovered ? (item.tech.color || '#f59e0b') : 'rgba(255, 255, 255, 0.12)'}`,
                  }}
                />

                {/* Embedded Tech Icon inside the Ball */}
                <div
                  className="relative z-10 flex items-center justify-center transition-transform duration-200"
                  style={{
                    color: item.tech.color || '#ffffff',
                    transform: isHovered ? 'scale(1.15)' : 'none',
                  }}
                >
                  <TechIcon
                    iconKey={item.tech.iconKey}
                    className={
                      item.tech.featured
                        ? 'w-6 h-6 sm:w-7 sm:h-7'
                        : 'w-5 h-5 sm:w-6 sm:h-6'
                    }
                  />
                </div>
              </div>

              {/* Minimal Clean Typography Tag underneath ball */}
              <span
                className={`mt-1 font-display text-center whitespace-nowrap tracking-tight transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                  isHovered
                    ? 'text-white font-bold text-xs sm:text-sm scale-110'
                    : 'text-zinc-300 font-semibold text-[10px] sm:text-[11px]'
                }`}
              >
                {item.tech.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* 3. BOTTOM HUD: ACTIVE TECH DETAILS & ASSEMBLY TRIGGER               */}
      {/* =================================================================== */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4 flex items-center justify-center gap-3">
        {currentDisplayTech ? (
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0d0f15]/95 border border-amber-400/60 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: currentDisplayTech.color || '#f59e0b' }}
            />
            <span className="font-display font-bold text-xs sm:text-sm text-white">
              {currentDisplayTech.name}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 border-l border-zinc-700 pl-2">
              {currentDisplayTech.category}
            </span>
            {currentDisplayTech.tagline && (
              <span className="hidden sm:inline text-xs text-zinc-300 font-sans border-l border-zinc-700 pl-2">
                {currentDisplayTech.tagline}
              </span>
            )}
          </div>
        ) : (
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/75 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 uppercase tracking-widest backdrop-blur-sm">
            <span className="text-amber-400 animate-pulse">✦</span>
            <span>{isAssembled ? '3D CLUSTER · DRAG TO SPIN' : 'ATTACHING BALLS...'}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerAssembly();
              }}
              disabled={!isAssembled}
              className="ml-2 px-2 py-0.5 rounded bg-zinc-800 hover:bg-amber-400 hover:text-black text-[10px] font-mono text-amber-300 transition-colors cursor-pointer disabled:opacity-50"
            >
              RE-ATTACH
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
