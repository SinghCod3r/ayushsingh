import React, { useState } from 'react';
import { Terminal, GitPullRequest, GitMerge, ExternalLink, CheckCircle2, Cpu, ArrowDown } from 'lucide-react';
import { portfolioData } from '../../data';
import { MagneticButton } from './MagneticButton';
import { KineticHeading } from './KineticHeading';

export const OpenSource: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'log' | 'highlights'>('log');
  const [selectedPr, setSelectedPr] = useState<string | null>(null);
  const osData = portfolioData.openSource;

  const prDetails: Record<string, { hash: string; date: string; message: string; diff: string }> = {
    '#455': {
      hash: '7a91b2c455',
      date: 'Wed Jul 16 2025',
      message: 'cups: Fix PPD detection & catalog freeze by decoupling GLib idle callbacks\n\n* Traced driver-selection and PPD-loading paths to isolate GUI freezes\n* Unblocked GTK main loop using GLib idle callbacks and worker threads\n* Reviewed & verified with upstream maintainer Alexander Pevzner',
      diff: '3 files changed, 84 insertions(+), 19 deletions(-)\nsrc/ppd_catalog.py | 48 ++++++++++++++++++++++++++++++----\nsrc/device_probe.c | 32 ++++++++++++++--------\nsrc/ui_callbacks.h | 23 ++++++++++++++++',
    },
    '#460': {
      hash: '3f82a1d460',
      date: 'Mon Aug 04 2025',
      message: 'usb: Improve driver detection and correct IPP-over-USB classification\n\n* Prevented locally connected USB printers from misreporting as LAN nodes\n* Added URI normalization & filtering of existing print queues',
      diff: '2 files changed, 46 insertions(+), 8 deletions(-)\nsrc/ipp_usb_mapper.py | 38 +++++++++++++++++++++++++++----\nsrc/device_tree.py    | 16 ++++++++++---',
    },
    '#463': {
      hash: '9e41c6f463',
      date: 'Sun Sep 07 2025',
      message: 'dns-sd: Delay device presentation until discovery finishes cleanly\n\n* Prevented race conditions on slow mDNS responders\n* Added IPv4/IPv6 local regression tests',
      diff: '4 files changed, 62 insertions(+), 11 deletions(-)\nsrc/dnssd_discovery.py | 42 +++++++++++++++++++++++++++++----\ntests/test_lan.py      | 31 ++++++++++++++++++++++++',
    },
    '#469': {
      hash: '5d12b0e469',
      date: 'Tue Oct 14 2025',
      message: 'concurrency: Refactor installation backend into async GLib worker threads\n\n* Converted legacy synchronous socket polls into asynchronous GLib sources\n* Smooth 60fps GTK UI response even during slow PPD downloads',
      diff: '5 files changed, 112 insertions(+), 34 deletions(-)\nsrc/async_worker.py | 74 +++++++++++++++++++++++++++++++++++++++----\nsrc/install_queue.c | 72 +++++++++++++++++++++++++++++------------',
    },
    '#471': {
      hash: '8b73d9c471',
      date: 'Fri Nov 21 2025',
      message: 'go-mfp: Fix UUID-merging and nil-backend failure paths\n\n* Regression coverage across Go and Python printer discovery layers\n* Solved intermittent nil pointer dereference on disconnected MFP units',
      diff: '3 files changed, 28 insertions(+), 5 deletions(-)\npkg/mfp/discovery.go | 21 +++++++++++++++++++--\npkg/cups/backend.go  | 12 +++++++++---',
    },
    '#478': {
      hash: '1a64f3e478',
      date: 'Thu Jan 08 2026',
      message: 'docs: Update upstream architecture specifications & LAN regression guide\n\n* Documented CUPS raster filters, IEEE 1284 Device ID format\n* Added step-by-step reproduction instructions for driverless setups',
      diff: '2 files changed, 55 insertions(+), 4 deletions(-)\nDOCS/architecture.md | 44 ++++++++++++++++++++++++++++++++++++++++++++\nREADME.md            | 15 ++++++++++++++-',
    },
  };

  return (
    <section
      id="open-source"
      className="relative w-full py-20 lg:py-32 bg-[#090a0d] text-white border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <KineticHeading
              text="OPEN SOURCE"
              variant="git-branch"
              className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase"
            />
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-sans">
              {osData.subtitle}
            </p>
          </div>

          {/* External GitHub Link */}
          <div className="flex items-center gap-3">
            <a
              href={osData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <MagneticButton className="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-zinc-200 hover:text-white hover:border-amber-400 hover:bg-zinc-800/90 text-xs font-mono uppercase tracking-wider transition-all shadow-md">
                <GitPullRequest size={14} className="text-emerald-400" />
                <span>View on GitHub</span>
                <ExternalLink size={12} className="text-zinc-500" />
              </MagneticButton>
            </a>
          </div>
        </div>

        {/* 4-Stat Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {osData.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-xl bg-[#111317]/80 border border-zinc-800/80 flex flex-col justify-between"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                {stat.label}
              </span>
              <span className="font-display font-bold text-base sm:text-lg text-zinc-100 mt-2">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Main Interactive Stage: Terminal + Dark SVG Architecture Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Git Terminal & PR Stream */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#0d0e12] border border-zinc-800/90 overflow-hidden shadow-2xl">
            
            {/* Terminal Window Chrome */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#13151b] border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <Terminal size={12} className="text-amber-400" />
                  singhcod3r@openprinting:~/upstream
                </span>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-800 text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab('log')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'log' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  git log
                </button>
                <button
                  onClick={() => setActiveTab('highlights')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'highlights' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  system impact
                </button>
              </div>
            </div>

            {/* Terminal Content Body */}
            <div className="p-5 font-mono text-xs overflow-y-auto flex-1 space-y-4 max-h-[440px]">
              {selectedPr && prDetails[selectedPr] ? (
                /* Single PR Commit Inspection View */
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="text-amber-400 font-semibold">
                      $ git show {selectedPr}
                    </span>
                    <button
                      onClick={() => setSelectedPr(null)}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-[10px] transition-colors"
                    >
                      ← Back to log
                    </button>
                  </div>

                  <div className="text-zinc-400 space-y-1">
                    <div>
                      <span className="text-yellow-400">commit {prDetails[selectedPr].hash}</span>
                      <span className="text-zinc-500"> (HEAD -&gt; main, origin/main)</span>
                    </div>
                    <div>Author: Ayush Singh &lt;ayushsinghceee@gmail.com&gt;</div>
                    <div className="text-zinc-500">Date:   {prDetails[selectedPr].date}</div>
                  </div>

                  <div className="p-3 rounded bg-black/60 border border-zinc-800/80 text-zinc-200 whitespace-pre-wrap leading-relaxed">
                    {prDetails[selectedPr].message}
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Diff Summary</span>
                    <pre className="text-[11px] text-emerald-400 bg-black/40 p-2.5 rounded border border-zinc-800/60 overflow-x-auto">
                      {prDetails[selectedPr].diff}
                    </pre>
                  </div>
                </div>
              ) : activeTab === 'log' ? (
                <>
                  <div className="text-zinc-400 pb-2 border-b border-zinc-800/60 flex items-center justify-between">
                    <span className="text-amber-400">
                      $ git log --author="Ayush Singh" --oneline -n 6
                    </span>
                    <span className="text-[10px] text-zinc-500">Click any PR to inspect</span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {osData.prs.map((pr) => (
                      <div
                        key={pr.pr}
                        onClick={() => setSelectedPr(pr.pr)}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/50 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all gap-2 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <GitMerge size={10} />
                            {pr.status}
                          </span>
                          <span className="font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors">
                            {pr.pr}
                          </span>
                          <span className="text-zinc-300 text-[11px]">
                            {pr.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {pr.tag && (
                            <span className="text-[10px] text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded">
                              #{pr.tag}
                            </span>
                          )}
                          <span className="text-[10px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            inspect →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 text-[11px] text-zinc-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active upstream work in system-config-printer, go-mfp &amp; foomatic-db</span>
                  </div>
                </>
              ) : (
                <div className="space-y-3 pt-2 text-zinc-300 font-sans text-xs sm:text-sm">
                  {osData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed text-zinc-300">{highlight}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Terminal Status Footer */}
            <div className="px-5 py-3 bg-[#111317] border-t border-zinc-800/70 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Cpu size={12} className="text-amber-400" />
                Upstream Maintainer: {osData.organization}
              </span>
              <span>{osData.period}</span>
            </div>

          </div>

          {/* Right Column: Custom Dark-Themed SVG Architecture Flow Diagram (Point 8) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Dark SVG Architecture Card */}
            <div className="rounded-2xl bg-[#0f1115] border border-white/10 p-5 shadow-2xl flex flex-col justify-between space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                    system-config-printer Subsystem
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-400">
                  Async Pipeline
                </span>
              </div>

              {/* 4-Stage Architecture Diagram Pipeline */}
              <div className="space-y-2.5 font-mono">
                
                {/* Stage 1: GTK UI */}
                <div className="p-3 rounded-xl bg-[#14161d] border border-white/10 flex items-center justify-between hover:border-emerald-500/40 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold text-white">GTK 3 UI (Async)</span>
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      PyGObject • Non-blocking GLib Worker Loop
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active UI
                  </span>
                </div>

                {/* Connecting arrow */}
                <div className="flex justify-center text-zinc-600 py-0.5">
                  <ArrowDown size={14} className="animate-bounce text-amber-400" />
                </div>

                {/* Stage 2: D-Bus IPC */}
                <div className="p-3 rounded-xl bg-[#14161d] border border-white/10 flex items-center justify-between hover:border-amber-500/40 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-xs font-bold text-white">D-Bus IPC System Bus</span>
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      org.openprinting.PrintSettings • Signal Routing
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    &lt; 5ms IPC
                  </span>
                </div>

                {/* Connecting arrow */}
                <div className="flex justify-center text-zinc-600 py-0.5">
                  <ArrowDown size={14} className="text-zinc-500" />
                </div>

                {/* Stage 3: CUPS Daemon */}
                <div className="p-3 rounded-xl bg-[#14161d] border border-white/10 flex items-center justify-between hover:border-cyan-500/40 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-xs font-bold text-white">CUPS Daemon (cupsd)</span>
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      Print Queue Cache • Local PPD Indexer
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Local Core
                  </span>
                </div>

                {/* Connecting arrow */}
                <div className="flex justify-center text-zinc-600 py-0.5">
                  <ArrowDown size={14} className="text-zinc-500" />
                </div>

                {/* Stage 4: IPP / Driverless Printing */}
                <div className="p-3 rounded-xl bg-[#14161d] border border-white/10 flex items-center justify-between hover:border-purple-500/40 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span className="text-xs font-bold text-white">IPP / Driverless Printing</span>
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      DNS-SD mDNS Discovery • IPP-over-USB Device Tree
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Hardware
                  </span>
                </div>

              </div>

              {/* Architecture Summary Note */}
              <div className="pt-3 border-t border-zinc-800/80 text-[11px] font-sans text-zinc-400 leading-relaxed">
                Reworked driver-loading paths to keep the GTK main loop unblocked using GLib idle callbacks and worker-thread execution, directly pairing with upstream maintainer Alexander Pevzner.
              </div>
            </div>

            {/* Repositories Tag Cloud */}
            <div className="p-5 rounded-2xl bg-[#0d0e12] border border-zinc-800/80 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Core Repositories Maintained
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {osData.repos.map((repo) => (
                  <a
                    key={repo}
                    href={`https://github.com/OpenPrinting/${repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                  >
                    <span>{repo}</span>
                    <ExternalLink size={10} className="text-zinc-500" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
