"use client";

import React, { useState, useEffect, useRef } from "react";

interface CinematicIntroProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState<"idle" | "boot" | "ayush" | "singh" | "reveal" | "done">("boot");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setStage("done");
      onComplete?.();
      return;
    }

    setStage("boot");

    // Pure, cinematic, punchy timing (~2.9s total)
    const t0 = setTimeout(() => setStage("ayush"), 250);
    const t1 = setTimeout(() => setStage("singh"), 1150);
    const t2 = setTimeout(() => setStage("reveal"), 2250);
    const t3 = setTimeout(() => {
      setStage("done");
      onComplete?.();
    }, 2850);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  // Subtle canvas warp particles during intro
  useEffect(() => {
    if (stage === "done") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: { x: number; y: number; z: number; size: number }[] = [];
    const count = 65;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width,
        size: Math.random() * 2 + 0.8,
      });
    }

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.fillStyle = "rgba(8, 9, 12, 0.28)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.z -= 4.8;
        if (p.z <= 0) {
          p.z = width;
          p.x = (Math.random() - 0.5) * width;
          p.y = (Math.random() - 0.5) * height;
        }

        const k = 250 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px < width && py >= 0 && py < height) {
          const alpha = Math.min(1, (1 - p.z / width) * 1.5);
          ctx.beginPath();
          ctx.arc(px, py, p.size * k * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 245, 212, ${alpha * 0.65})`;
          ctx.fill();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [stage]);

  const handleSkip = () => {
    setStage("done");
    onComplete?.();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && stage !== "done") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stage]);

  if (stage === "done") {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Portfolio Introduction"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090c] text-white transition-all duration-700 select-none overflow-hidden ${
        stage === "reveal" ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Star Warp Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Discreet Skip Button in Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          type="button"
          aria-label="Skip introduction"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#00f5d4]/40 transition text-xs text-neutral-400 hover:text-white cursor-pointer"
        >
          <span>Skip</span>
          <span className="text-[10px] text-neutral-500 group-hover:text-[#00f5d4] font-mono">[ESC]</span>
        </button>
      </div>

      {/* Monumental Name Typography - Only AYUSH SINGH */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-7xl px-4 text-center z-10 pointer-events-none">
        {/* AYUSH */}
        <div className="relative overflow-hidden py-1">
          <h1
            className={`font-black tracking-tighter uppercase transition-all duration-700 ease-out ${
              stage === "boot"
                ? "opacity-0 translate-y-16 blur-md scale-95"
                : stage === "ayush"
                ? "opacity-100 translate-y-0 blur-none scale-100 text-[#f1f3f7]"
                : "opacity-40 -translate-y-4 scale-95 text-neutral-500"
            } text-[clamp(3.2rem,14vw,13rem)] leading-none`}
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            AYUSH
          </h1>
        </div>

        {/* SINGH */}
        <div className="relative overflow-hidden py-1 -mt-2 sm:-mt-6 md:-mt-10">
          <h2
            className={`font-black tracking-tighter uppercase transition-all duration-700 ease-out ${
              stage === "boot" || stage === "ayush"
                ? "opacity-0 translate-y-20 blur-md scale-95"
                : stage === "singh"
                ? "opacity-100 translate-y-0 blur-none scale-100 text-white drop-shadow-[0_0_35px_rgba(0,245,212,0.3)]"
                : "opacity-90 translate-y-0 scale-100 text-white"
            } text-[clamp(3rem,13vw,12.5rem)] leading-none`}
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            SINGH
          </h2>
        </div>
      </div>
    </div>
  );
}
