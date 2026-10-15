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
  speed: number;
  color: string;
}

const COLORS = ["#00f5d4", "#38bdf8", "#a855f7", "#ec4899", "#f59e0b"];

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const posRef = useRef({ x: -100, y: -100 });
  const trailingRef = useRef({ x: -100, y: -100 });
  const rippleIdRef = useRef(0);
  const sparkleIdRef = useRef(0);

  useEffect(() => {
    // Only render on non-touch devices with fine cursor
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer") !==
          null;
        setIsHovered(isClickable);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      // Create click shockwave ripple
      const newRippleId = ++rippleIdRef.current;
      setRipples((prev) => [
        ...prev.slice(-6),
        { id: newRippleId, x: e.clientX, y: e.clientY, color },
      ]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRippleId));
      }, 700);

      // Create burst of 6 colorful micro-particles
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 6; i++) {
        const sId = ++sparkleIdRef.current;
        newSparkles.push({
          id: sId,
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5,
          speed: Math.random() * 25 + 20,
          color: COLORS[i % COLORS.length],
        });
      }
      setSparkles((prev) => [...prev.slice(-12), ...newSparkles]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
      }, 600);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    // Smooth Lerp animation loop for trailing cursor
    let animId: number;
    const animate = () => {
      trailingRef.current.x += (posRef.current.x - trailingRef.current.x) * 0.22;
      trailingRef.current.y += (posRef.current.y - trailingRef.current.y) * 0.22;
      setTrailingPos({ x: trailingRef.current.x, y: trailingRef.current.y });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Expanding Click Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "50px",
            height: "50px",
            borderColor: ripple.color,
            boxShadow: `0 0 25px ${ripple.color}, inset 0 0 15px ${ripple.color}`,
            animationDuration: "600ms",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          }}
        />
      ))}

      {/* Sparkles on Click */}
      {sparkles.map((sparkle) => {
        const dx = Math.cos(sparkle.angle) * sparkle.speed;
        const dy = Math.sin(sparkle.angle) * sparkle.speed;
        return (
          <span
            key={sparkle.id}
            className="absolute rounded-full transition-all duration-500 ease-out"
            style={{
              left: sparkle.x + dx,
              top: sparkle.y + dy,
              width: "4px",
              height: "4px",
              backgroundColor: sparkle.color,
              boxShadow: `0 0 10px ${sparkle.color}`,
              opacity: 0,
              transform: "scale(0)",
            }}
          />
        );
      })}

      {/* Trailing Modern Colorful Fluid Aura / Ring */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out ${
          isClicking ? "scale-75 opacity-90" : isHovered ? "scale-140 opacity-80" : "scale-100 opacity-60"
        }`}
        style={{
          left: trailingPos.x,
          top: trailingPos.y,
          width: isHovered ? "42px" : "32px",
          height: isHovered ? "42px" : "32px",
          background: isHovered
            ? "radial-gradient(circle, rgba(0, 245, 212, 0.18) 0%, rgba(168, 85, 247, 0.15) 60%, transparent 100%)"
            : "radial-gradient(circle, rgba(0, 245, 212, 0.12) 0%, transparent 70%)",
          border: isHovered ? "1.5px solid #00f5d4" : "1px solid rgba(0, 245, 212, 0.5)",
          boxShadow: isHovered
            ? "0 0 20px rgba(0, 245, 212, 0.5), 0 0 35px rgba(168, 85, 247, 0.3)"
            : "0 0 12px rgba(0, 245, 212, 0.25)",
        }}
      />

      {/* Precision Inner Glowing Dot */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isClicking ? "scale-50" : isHovered ? "scale-125" : "scale-100"
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: "7px",
          height: "7px",
          background: isHovered
            ? "linear-gradient(135deg, #00f5d4, #a855f7)"
            : "#00f5d4",
          boxShadow: isHovered
            ? "0 0 12px #00f5d4, 0 0 20px #a855f7"
            : "0 0 8px #00f5d4",
        }}
      />
    </div>
  );
}
