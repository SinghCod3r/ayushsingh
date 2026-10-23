import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GitPullRequest, GitMerge, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { portfolioData } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const OpenSource: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prListRef = useRef<HTMLDivElement>(null);
  const [expandedPr, setExpandedPr] = useState<string | null>(null);

  const os = portfolioData.openSource;

  const prDetails: Record<string, { summary: string; impact: string }> = {
    '#455': {
      summary: 'Traced driver-selection and PPD-loading paths to isolate GUI freezes during printer setup. Reworked driver loading using GLib idle callbacks and worker threads.',
      impact: 'Unblocks GTK main loop so users never experience UI lockups on large printer catalogs. Verified with upstream maintainer Alexander Pevzner.',
    },
    '#460': {
      summary: 'Prevented locally connected USB printers from misreporting as LAN nodes. Added URI normalization & filtering of existing print queues.',
      impact: 'Ensures correct IPP-over-USB classification across desktop Linux distros.',
    },
    '#463': {
      summary: 'Delayed device presentation until DNS-SD discovery completes cleanly, eliminating race conditions on slow mDNS responders.',
      impact: 'Added IPv4/IPv6 local regression tests to verify driverless discovery.',
    },
    '#469': {
      summary: 'Converted legacy synchronous socket polls into asynchronous GLib sources and worker threads.',
      impact: 'Ensures smooth 60fps GTK UI response even during slow PPD downloads and queue installations.',
    },
    '#471': {
      summary: 'Fixed nil-backend failure paths and UUID-merging across Go and Python printer discovery layers in go-mfp.',
      impact: 'Eliminated intermittent nil pointer dereference on disconnected multifunction printers.',
    },
    '#478': {
      summary: 'Documented CUPS raster filters, IEEE 1284 Device ID format, and step-by-step reproduction instructions for driverless setups.',
      impact: 'Created authoritative documentation and LAN regression test suite for upstream contributors.',
    },
  };

  useGSAP(
    () => {
      const prList = prListRef.current;
      if (!prList) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const items = prList.querySelectorAll('.pr-row');

      gsap.from(items, {
        scrollTrigger: {
          id: 'OPEN_SOURCE_PRS',
          trigger: prList,
          start: 'top 85%',
          end: 'bottom 75%',
          scrub: 0.5,
        },
        y: 25,
        opacity: 0,
        stagger: 0.08,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="open-source"
      ref={containerRef}
      className="relative w-full py-24 lg:py-36 bg-transparent text-zinc-100 border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              The Linux Foundation
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-tight">
              Open Source Engineering.
            </h2>
            <p className="text-sm font-sans text-zinc-400 max-w-xl pt-1">
              {os.subtitle}
            </p>
          </div>

          <a
            href={os.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900/60 text-xs font-mono tracking-wider text-zinc-300 hover:text-white transition-all w-fit"
          >
            <GitPullRequest size={13} className="text-emerald-400" />
            <span>OpenPrinting Repositories</span>
            <ExternalLink size={11} className="text-zinc-500" />
          </a>
        </div>

        {/* 4 Clean Meta Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-zinc-800/60 mb-12">
          {os.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-zinc-500">
                {stat.label}
              </span>
              <div className="font-sans font-semibold text-base sm:text-lg text-zinc-200">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Real Pull Requests List */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-4">
            Selected Merged Upstream Contributions
          </div>

          <div ref={prListRef} className="divide-y divide-zinc-800/60 border-y border-zinc-800/60">
            {os.prs.map((pr) => {
              const details = prDetails[pr.pr];
              const isExpanded = expandedPr === pr.pr;

              return (
                <div
                  key={pr.pr}
                  className="pr-row group py-4 transition-colors hover:bg-zinc-900/30"
                >
                  <div
                    onClick={() => setExpandedPr(isExpanded ? null : pr.pr)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-emerald-400 text-xs font-mono flex items-center gap-1 font-semibold">
                        <GitMerge size={14} />
                        {pr.pr}
                      </span>
                      <span className="font-sans font-medium text-sm sm:text-base text-zinc-200 group-hover:text-white transition-colors">
                        {pr.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pl-7 sm:pl-0">
                      {pr.tag && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                          {pr.tag}
                        </span>
                      )}
                      <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Engineering Summary */}
                  {isExpanded && details && (
                    <div className="mt-3.5 pl-7 text-xs font-sans text-zinc-400 space-y-1.5 pb-2">
                      <p className="leading-relaxed">
                        <strong className="text-zinc-300 font-medium">Solution: </strong>
                        {details.summary}
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-zinc-300 font-medium">Impact: </strong>
                        {details.impact}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
