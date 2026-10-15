"use client";

import React, { useState } from "react";
import {
  GitPullRequest,
  Cpu,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { identity } from "@/data/identity";

export function HeroIdentity() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="hero"
      aria-label="Ayush Singh Identity & Overview"
      className="relative min-h-[78vh] sm:min-h-[82vh] flex flex-col justify-between pt-12 sm:pt-16 md:pt-18 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Main Massive Editorial Typography Hero Composition */}
      <div className="my-auto py-2 sm:py-4 w-full">
        <div className="relative w-full">
          {/* Subtle Ambient Backing Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-10 -left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#00f5d4]/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative flex flex-col items-start select-none w-full">
            {/* Monumental First Name with fluid clamp for flawless mobile responsiveness */}
            <h1
              className="font-black text-[clamp(3.4rem,14vw,13.5rem)] tracking-tighter leading-[0.85] text-white select-none break-normal"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              AYUSH
            </h1>

            {/* Layered Second Name with Cybernetic Gradient */}
            <div className="flex flex-wrap items-baseline gap-3 sm:gap-6 -mt-1 sm:-mt-4 md:-mt-8">
              <span
                className="font-black text-[clamp(3rem,12.5vw,12.5rem)] tracking-tighter leading-[0.85] bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent select-none break-normal"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                SINGH
              </span>

              {/* Technical Identity Badge */}
              <div className="hidden sm:flex flex-col border-l border-[#00f5d4]/40 pl-3 py-0.5 font-mono text-xs text-neutral-400">
                <span className="text-[#00f5d4] font-semibold tracking-wide">SinghCod3r</span>
                <span className="text-[11px] text-neutral-400">Linux OpenPrinting & Systems</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Subtitle Strip */}
        <div className="mt-6 sm:mt-10 flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs font-mono text-neutral-400">
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

        {/* Concise, High-Impact Narrative Description */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl leading-relaxed font-sans font-light">
          Computer Science engineer building software beneath the abstraction layer.
          Core contributor in the <span className="text-white font-medium">Linux Foundation OpenPrinting</span> ecosystem,
          architecting async daemon concurrency, local LLM tooling, and compilers.
        </p>

        {/* Primary Interactive CTAs */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-xs sm:text-sm">
          <a
            href="#open-source"
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#00f5d4] text-[#08090c] font-bold hover:bg-[#38bdf8] transition-all cursor-pointer text-xs sm:text-sm"
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

      {/* Bottom Metrics Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-6 border-t border-white/10 w-full">
        {identity.metrics.map((item, index) => (
          <div
            key={index}
            className="glass-panel p-3 sm:p-4 rounded-xl border border-white/5 hover:border-white/15 transition flex flex-col justify-between"
          >
            <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              {item.label}
            </span>
            <div className="my-1 sm:my-2">
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
