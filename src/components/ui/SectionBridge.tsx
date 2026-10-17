"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface SectionBridgeProps {
  fromSector: string;
  fromName: string;
  toSector: string;
  toName: string;
  nextHref: string;
}

export function SectionBridge({
  fromSector,
  fromName,
  toSector,
  toName,
  nextHref,
}: SectionBridgeProps) {
  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-6xl mx-auto py-6 sm:py-8 px-4 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Background Cybernetic Transit Line with traveling laser beam */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden">
        <div className="animate-bridge-beam" />
      </div>

      {/* Central Holographic Sector Gateway Pill */}
      <a
        href={nextHref}
        className="relative -mt-3.5 z-10 flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0c1018]/90 border border-white/10 hover:border-[#00f5d4]/40 backdrop-blur-md font-mono text-[10px] sm:text-[11px] text-neutral-400 hover:text-white transition group shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
        title={`Proceed to Sector ${toSector}: ${toName}`}
      >
        <span className="text-[#00f5d4] font-semibold">{fromSector}</span>
        <span className="text-neutral-500 hidden sm:inline">{fromName}</span>
        <span className="text-neutral-600">→</span>
        <span className="text-[#38bdf8] font-semibold">{toSector}</span>
        <span className="text-neutral-300 font-medium">{toName}</span>
        <ChevronDown className="w-3 h-3 text-[#00f5d4] group-hover:translate-y-0.5 transition" />
      </a>
    </div>
  );
}

