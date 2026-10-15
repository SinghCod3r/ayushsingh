"use client";

import React, { useEffect, useState, useRef } from "react";

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  color: string;
}

const VIBRANT_COLORS = [
  "#00f5d4", // Neon Cyan
  "#38bdf8", // Sky Blue
  "#a855f7", // Electric Violet
  "#ec4899", // Magenta
  "#10b981", // Emerald
  "#f59e0b", // Amber
];

export function CustomCursor() {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const rippleIdRef = useRef(0);
  const sparkleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const color = VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)];
      const secondaryColor = VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)];

      const newRippleId = ++rippleIdRef.current;
      setRipples((prev) => [
        ...prev.slice(-5),
        { id: newRippleId, x: e.clientX, y: e.clientY, color },
      ]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRippleId));
      }, 650);

      // Create burst of 6 colorful micro-particles
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 6; i++) {
        const sId = ++sparkleIdRef.current;
        newSparkles.push({
          id: sId,
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.4,
          distance: Math.random() * 28 + 18,
          color: i % 2 === 0 ? color : secondaryColor,
        });
      }
      setSparkles((prev) => [...prev.slice(-12), ...newSparkles]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
      }, 550);
    };

    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Expanding Modern Colorful Shockwave Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none animate-click-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "55px",
            height: "55px",
            border: `2px solid ${ripple.color}`,
            boxShadow: `0 0 20px ${ripple.color}, inset 0 0 12px ${ripple.color}`,
          }}
        />
      ))}

      {/* Radiant Sparkle Bursts */}
      {sparkles.map((sparkle) => {
        const dx = Math.cos(sparkle.angle) * sparkle.distance;
        const dy = Math.sin(sparkle.angle) * sparkle.distance;
        return (
          <span
            key={sparkle.id}
            className="absolute rounded-full pointer-events-none animate-sparkle-fade"
            style={{
              left: sparkle.x + dx,
              top: sparkle.y + dy,
              width: "4.5px",
              height: "4.5px",
              backgroundColor: sparkle.color,
              boxShadow: `0 0 10px ${sparkle.color}`,
            }}
          />
        );
      })}
    </div>
  );
}
