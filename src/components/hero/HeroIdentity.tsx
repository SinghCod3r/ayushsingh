"use client";

import React, { useState, useRef } from "react";
import {
  GitPullRequest,
  Cpu,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { identity } from "@/data/identity";
import { HeroArchitectureConsole } from "@/components/hero/HeroArchitectureConsole";

const nameFirst = ["A", "Y", "U", "S", "H"];
const nameLast = ["S", "I", "N", "G", "H"];

export function HeroIdentity() {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: normY * -8,
      y: normX * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Ayush Singh Identity & Overview"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[82vh] sm:min-h-[86vh] flex flex-col justify-between pt-22 sm:pt-26 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1560px] mx-auto z-10 w-full overflow-hidden scroll-mt-20"
    >
      {/* Ambient Lighting Accents */}
      <div
        aria-hidden="true"
        className="absolute top-20 left-10 w-80 sm:w-96 h-80 sm:h-96 bg-[#00f5d4]/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-32 right-12 w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main 2-Column Responsive Layout: Expansive on Laptop, Clean on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center my-auto py-2 sm:py-4 w-full">
        {/* Left Column: 3D Typography, Identity & CTAs (7 columns on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-start w-full z-10">
          {/* 3D Animated Typography with Mouse Parallax & Dynamic Perspective */}
          <div
            className="perspective-1200 preserve-3d w-full transition-transform duration-200 ease-out select-none"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* AYUSH - 3D Volumetric Extruded Kinetic Characters */}
            <div className="flex items-center tracking-tighter leading-[0.85] preserve-3d">
              {nameFirst.map((char, idx) => (
                <span
                  key={`first-${idx}`}
                  className="animate-letter-3d text-3d-ayush font-black text-[clamp(3.6rem,11.5vw,10.5rem)] text-white hover:scale-110 hover:text-[#00f5d4] transition-all duration-300 cursor-default inline-block"
                  style={{
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    animationDelay: `${idx * 130}ms`,
                  }}
                  title="Ayush Singh"
                >
                  {char}
                </span>
              ))}
            </div>

            {/* SINGH - Holographic Silver/Cyan Layered Extrusion */}
            <div className="flex flex-wrap items-baseline gap-3 sm:gap-6 -mt-1 sm:-mt-3 md:-mt-6 preserve-3d">
              <div className="flex items-center tracking-tighter leading-[0.85] preserve-3d">
                {nameLast.map((char, idx) => (
                  <span
                    key={`last-${idx}`}
                    className="animate-letter-3d text-3d-singh holo-gradient-text font-black text-[clamp(3.2rem,10.2vw,9.5rem)] hover:scale-110 hover:text-white transition-all duration-300 cursor-default inline-block"
                    style={{
                      fontFamily: "var(--font-geist-sans), sans-serif",
                      animationDelay: `${(idx + 5) * 130}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Technical Identity Badge */}
              <div className="flex flex-col border-l border-[#00f5d4]/40 pl-3 py-0.5 font-mono text-xs text-neutral-400">
                <span className="text-[#00f5d4] font-semibold tracking-wide">SinghCod3r</span>
                <span className="text-[11px] text-neutral-400">Linux OpenPrinting & Systems</span>
              </div>
            </div>
          </div>

          {/* Technical Subtitle Strip */}
          <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-neutral-400">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
              LINUX OPENPRINTING
            </span>
            <span className="text-neutral-600 hidden sm:inline">·</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
              SYSTEMS & IPC
            </span>
            <span className="text-neutral-600 hidden sm:inline">·</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
              PYTHON & COMPILERS
            </span>
            <span className="text-neutral-600 hidden sm:inline">·</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
              LOCAL LLMs
            </span>
            <span className="text-neutral-600 hidden sm:inline">·</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
              FULL STACK
            </span>
          </div>

          {/* High-Impact Engineering Narrative */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl leading-relaxed font-sans font-light">
            Computer Science engineer building software beneath the abstraction layer.
            Core contributor in the <span className="text-white font-medium">Linux Foundation OpenPrinting</span> ecosystem,
            architecting async daemon concurrency, local LLM tooling, and compilers.
          </p>

          {/* Primary Interactive CTAs */}
          <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-xs sm:text-sm">
            <a
              href="#open-source"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#00f5d4] text-[#08090c] font-bold hover:bg-[#38bdf8] transition-all cursor-pointer text-xs sm:text-sm shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:shadow-[0_0_28px_rgba(56,189,248,0.5)]"
            >
              <GitPullRequest className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Open Source (11+ PRs)</span>
            </a>

            <a
              href="#projects"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition cursor-pointer text-xs sm:text-sm"
            >
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f5d4]" />
              <span>Featured Systems</span>
            </a>

            <a
              href="/Ayush_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Ayush_Singh_Resume.pdf"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full border border-[#00f5d4]/40 bg-[#00f5d4]/10 hover:bg-[#00f5d4]/20 text-[#00f5d4] transition cursor-pointer text-xs sm:text-sm font-mono"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Download CV</span>
            </a>

            <button
              onClick={handleCopyEmail}
              type="button"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition cursor-pointer text-xs sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Systems Architecture Console (5 columns on desktop) */}
        <div className="lg:col-span-5 w-full flex items-center justify-center relative mt-6 lg:mt-0">
          <HeroArchitectureConsole />
        </div>
      </div>

      {/* Bottom Metrics Matrix across expansive width */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/10 w-full mt-6">
        {identity.metrics.map((item, index) => (
          <div
            key={index}
            className="glass-panel p-3.5 sm:p-5 rounded-xl border border-white/5 hover:border-white/15 transition flex flex-col justify-between"
          >
            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              {item.label}
            </span>
            <div className="my-1.5 sm:my-2.5">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-white font-mono tracking-tight">
                {item.value}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-neutral-400 leading-snug">
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
