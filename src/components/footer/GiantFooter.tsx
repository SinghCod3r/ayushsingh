"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { identity } from "@/data/identity";

export function GiantFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-label="Portfolio Footer and Identity Monument"
      className="relative bg-gradient-to-t from-black via-[#06070a] to-[#08090c] pt-16 sm:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-12 border-t border-white/10 overflow-hidden z-10 w-full"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh] w-full">
        {/* Top Controls Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-white/10 text-xs font-mono w-full">
          <div className="flex items-center gap-2.5 text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
            <span className="text-white font-bold">SinghCod3r</span>
            <span className="text-neutral-600">//</span>
            <span>SYSTEMS & OPEN SOURCE</span>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition cursor-pointer text-xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>


        {/* GIANT MONUMENTAL AYUSH SINGH DISPLAY (100% Mobile Fluid & Responsive) */}
        <div className="relative pt-8 sm:pt-12 pb-4 sm:pb-6 border-t border-white/10 select-none overflow-hidden w-full">
          <div
            aria-hidden="true"
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[120%] h-full bg-radial from-[#00f5d4]/10 via-transparent to-transparent pointer-events-none blur-3xl"
          />

          <div className="flex flex-col items-center justify-center text-center w-full">
            <h2
              className="font-black text-[clamp(3.2rem,14.5vw,13.5rem)] tracking-tighter leading-[0.82] text-white/90 hover:text-white transition-colors duration-500 select-none break-normal"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              AYUSH
            </h2>
            <h2
              className="font-black text-[clamp(2.8rem,13vw,12.5rem)] tracking-tighter leading-[0.82] -mt-1 sm:-mt-4 md:-mt-8 bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-700 bg-clip-text text-transparent select-none break-normal"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              SINGH
            </h2>
          </div>
        </div>

        {/* Bottom Metadata & Copyright Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400 w-full">
          <div>
            <span>© 2026 Ayush Singh (SinghCod3r).</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-neutral-400">
            <span>Linux OpenPrinting</span>
            <span className="text-neutral-700">·</span>
            <span>Systems</span>
            <span className="text-neutral-700">·</span>
            <span className="text-[#00f5d4]">Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
