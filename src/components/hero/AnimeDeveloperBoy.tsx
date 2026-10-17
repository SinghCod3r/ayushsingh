"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function AnimeDeveloperBoy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Mouse hover parallax when not actively dragging
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) return;
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);

      setRotate({
        x: Math.max(-20, Math.min(20, -normY * 18)),
        y: Math.max(-25, Math.min(25, normX * 24)),
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isDragging]);

  // Inertia loop for smooth drag decay
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotate.x,
      rotY: rotate.y,
    };
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    const newRotY = Math.max(-35, Math.min(35, dragStart.current.rotY + deltaX * 0.35));
    const newRotX = Math.max(-25, Math.min(25, dragStart.current.rotX - deltaY * 0.3));

    velocity.current = {
      x: newRotX - rotate.x,
      y: newRotY - rotate.y,
    };

    setRotate({ x: newRotX, y: newRotY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full max-w-[480px] h-[440px] sm:h-[500px] md:h-[540px] lg:h-[580px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing preserve-3d"
      style={{ perspective: "1000px" }}
      title="Interactive 3D Anime Developer Character"
    >
      {/* 1. Ambient Glowing Cyan & Violet Energy Aura Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-4 sm:inset-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,245,212,0.18)_0%,rgba(168,85,247,0.12)_45%,transparent_75%)] pointer-events-none blur-3xl"
        style={{
          transform: `translate3d(${rotate.y * -0.5}px, ${rotate.x * -0.5}px, -40px)`,
          transition: isDragging ? "none" : "transform 0.25s ease-out",
        }}
      />

      {/* 2. Main 3D Rotating & Floating Anime Character Container */}
      <div
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isDragging ? "none" : "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        {/* Anime Character Artwork with Seamless Edge & Bottom Gradient Fade */}
        <div
          className="relative w-[320px] sm:w-[380px] md:w-[420px] lg:w-[460px] h-full flex items-center justify-center animate-anime-float"
          style={{
            maskImage:
              "radial-gradient(ellipse 90% 90% at 50% 48%, black 65%, transparent 100%), linear-gradient(to bottom, black 82%, transparent 98%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 90% at 50% 48%, black 65%, transparent 100%), linear-gradient(to bottom, black 82%, transparent 98%)",
          }}
        >
          <Image
            src="/anime-dev-boy.jpg"
            alt="Ayush Singh - Anime Developer Avatar"
            width={896}
            height={1200}
            priority
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_15px_35px_rgba(0,245,212,0.25)]"
          />
        </div>

        {/* 3. Floating 3D Holographic Code Elements in Front of Character */}
        {/* Hologram Bracket Left */}
        <div
          aria-hidden="true"
          className="absolute left-6 sm:left-10 top-1/4 px-2.5 py-1 rounded-lg bg-[#00f5d4]/10 border border-[#00f5d4]/30 backdrop-blur-sm font-mono text-[11px] text-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.3)] pointer-events-none animate-float-slow"
          style={{
            transform: `translate3d(${rotate.y * 0.8}px, ${rotate.x * -0.6}px, 45px)`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          &lt;dev_mode&gt;
        </div>

        {/* Hologram Tag Right */}
        <div
          aria-hidden="true"
          className="absolute right-4 sm:right-8 top-1/3 px-2.5 py-1 rounded-lg bg-[#a855f7]/15 border border-[#a855f7]/40 backdrop-blur-sm font-mono text-[11px] text-[#c084fc] shadow-[0_0_15px_rgba(168,85,247,0.35)] pointer-events-none animate-float-medium"
          style={{
            transform: `translate3d(${rotate.y * 1.1}px, ${rotate.x * -0.8}px, 65px)`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          async daemon()
        </div>

        {/* Hologram Terminal Badge Bottom Left */}
        <div
          aria-hidden="true"
          className="absolute left-8 sm:left-14 bottom-16 px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 backdrop-blur-sm font-mono text-[10px] text-neutral-300 shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none animate-float-fast"
          style={{
            transform: `translate3d(${rotate.y * 0.6}px, ${rotate.x * -0.5}px, 35px)`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          <span className="text-[#00f5d4] font-bold">λ</span> ./openprinting
        </div>

        {/* Orbiting Sparkle Star Top Right */}
        <div
          aria-hidden="true"
          className="absolute right-10 top-16 w-2 h-2 rounded-full bg-[#00f5d4] shadow-[0_0_12px_#00f5d4] animate-ping pointer-events-none"
          style={{
            transform: `translate3d(${rotate.y * 1.3}px, ${rotate.x * -1.0}px, 80px)`,
          }}
        />
      </div>
    </div>
  );
}
