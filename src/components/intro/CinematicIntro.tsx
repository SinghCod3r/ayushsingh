"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

interface CinematicIntroProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

export function CinematicIntro({ onComplete, forcePlay = false }: CinematicIntroProps) {
  const [stage, setStage] = useState<
    "idle" | "boot" | "ayush" | "singh" | "identity" | "reveal" | "done"
  >("idle");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if user has already experienced intro in this session
    const hasSeenIntro = sessionStorage.getItem("ayush_singh_intro_seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if ((hasSeenIntro && !forcePlay) || prefersReducedMotion) {
      setStage("done");
      onComplete?.();
      return;
    }

    setStage("boot");

    // Timeline for intentional, artistic pacing (~3.6s total, crisp and cinematic)
    const t0 = setTimeout(() => setStage("ayush"), 500);
    const t1 = setTimeout(() => setStage("singh"), 1500);
    const t2 = setTimeout(() => setStage("identity"), 2500);
    const t3 = setTimeout(() => setStage("reveal"), 3400);
    const t4 = setTimeout(() => {
      setStage("done");
      sessionStorage.setItem("ayush_singh_intro_seen", "true");
      onComplete?.();
    }, 4100);

    // Progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 55);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
    };
  }, [forcePlay, onComplete]);

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
    const count = 70;
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
        p.z -= 4.5;
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
          ctx.fillStyle = `rgba(0, 245, 212, ${alpha * 0.7})`;
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
    sessionStorage.setItem("ayush_singh_intro_seen", "true");
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

      {/* Subtle Technical Grid Lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
      />

      {/* Top Bar HUD */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono tracking-wider text-neutral-400 z-10">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
          <span className="text-neutral-300">SYSTEM_INIT // 0x7F8</span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-neutral-400">ARCH: LINUX_x86_64</span>
        </div>

        <button
          onClick={handleSkip}
          type="button"
          aria-label="Skip cinematic introduction"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#00f5d4]/40 transition text-xs text-neutral-300 hover:text-white cursor-pointer"
        >
          <span>Skip Intro</span>
          <span className="text-[10px] text-neutral-500 group-hover:text-[#00f5d4] font-mono">[ESC]</span>
        </button>
      </div>

      {/* Main Massive Editorial Typography Container */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-7xl px-4 text-center z-10">
        {/* Stage 1: AYUSH */}
        <div className="relative overflow-hidden py-2">
          <h1
            className={`font-black tracking-tighter uppercase transition-all duration-700 ease-out ${
              stage === "boot"
                ? "opacity-0 translate-y-12 blur-md scale-95"
                : stage === "ayush"
                ? "opacity-100 translate-y-0 blur-none scale-100 text-[#f1f3f7]"
                : "opacity-40 -translate-y-4 scale-95 text-neutral-500"
            } text-[clamp(2.75rem,13vw,12rem)] leading-none`}
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: stage === "ayush" ? "-0.04em" : "0.02em",
            }}
          >
            AYUSH
          </h1>
        </div>

        {/* Stage 2: SINGH */}
        <div className="relative overflow-hidden py-2 -mt-2 sm:-mt-6 md:-mt-10">
          <h2
            className={`font-black tracking-tighter uppercase transition-all duration-700 ease-out ${
              stage === "boot" || stage === "ayush"
                ? "opacity-0 translate-y-16 blur-md scale-95"
                : stage === "singh"
                ? "opacity-100 translate-y-0 blur-none scale-100 text-white glow-cyan"
                : "opacity-90 translate-y-0 scale-100 text-white"
            } text-[clamp(2.5rem,12vw,11.5rem)] leading-none`}
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: stage === "singh" ? "-0.04em" : "-0.02em",
            }}
          >
            SINGH
          </h2>
        </div>

        {/* Stage 3: SinghCod3r / Identity Badge */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-6 transition-all duration-500 ease-out ${
            stage === "identity" || stage === "reveal"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f5d4]/30 bg-[#00f5d4]/10 text-[#00f5d4] text-xs sm:text-sm font-mono tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>SinghCod3r</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 font-mono tracking-wide">
            <span>LINUX OPENPRINTING</span>
            <span className="text-neutral-600">/</span>
            <span>SYSTEMS</span>
            <span className="text-neutral-600">/</span>
            <span>AI APPLICATION BUILDER</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Telemetry */}
      <div className="absolute bottom-8 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500 z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-[#00f5d4]">{progress}%</span>
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00f5d4] to-[#38bdf8] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 flex items-center gap-2">
          <span>SinghCod3r // Systems · Open Source · AI</span>
        </div>
      </div>
    </div>
  );
}

