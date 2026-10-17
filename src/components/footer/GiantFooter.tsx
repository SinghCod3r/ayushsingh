"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function GiantFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-label="Portfolio Footer and Identity Monument"
      className="relative bg-gradient-to-t from-black via-[#06070a] to-[#08090c] pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 border-t border-white/10 overflow-hidden z-10 w-full"
    >
      <div className="max-w-[1560px] mx-auto flex flex-col justify-between min-h-[50vh] sm:min-h-[55vh] w-full">
        {/* Top Controls: Sleek Back to Top */}
        <div className="flex items-center justify-end pb-6 sm:pb-8 border-b border-white/10 w-full">
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#00f5d4]/40 bg-white/5 hover:bg-[#00f5d4]/10 text-neutral-300 hover:text-[#00f5d4] transition cursor-pointer font-mono text-xs shadow-md"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* GIANT MONUMENTAL AYUSH SINGH DISPLAY (Bold & Massive on Mobile & Desktop) */}
        <div className="relative py-8 sm:py-12 select-none overflow-hidden w-full">
          {/* Ambient Cyan / Blue Glow Behind Giant Typography */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.12)_0%,rgba(56,189,248,0.06)_45%,transparent_70%)] pointer-events-none blur-3xl"
          />

          <div className="flex flex-col items-center justify-center text-center w-full relative z-10">
            {/* Monumental First Name - Fills Mobile Screen Width */}
            <h2
              className="font-black text-[clamp(4.8rem,21vw,15rem)] tracking-tighter leading-[0.82] text-white hover:text-[#00f5d4] transition-colors duration-500 select-none break-normal drop-shadow-[0_10px_30px_rgba(0,245,212,0.2)]"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              AYUSH
            </h2>

            {/* Monumental Second Name with Cyber Metallic Gradient */}
            <h2
              className="font-black text-[clamp(4.4rem,19.5vw,14rem)] tracking-tighter leading-[0.82] -mt-2 sm:-mt-5 md:-mt-8 bg-gradient-to-b from-white via-neutral-300 to-neutral-600 bg-clip-text text-transparent select-none break-normal drop-shadow-[0_10px_30px_rgba(56,189,248,0.15)]"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              SINGH
            </h2>
          </div>
        </div>

        {/* Bottom Metadata & Copyright Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400 w-full text-center sm:text-left">
          <div>
            <span>© 2026 Ayush Singh. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-neutral-400 text-[11px] sm:text-xs">
            <span>Linux OpenPrinting</span>
            <span className="text-neutral-700">·</span>
            <span>Systems Architecture</span>
            <span className="text-neutral-700">·</span>
            <span className="text-[#00f5d4]">Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
