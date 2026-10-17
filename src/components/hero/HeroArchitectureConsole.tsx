"use client";

import React, { useState } from "react";
import { Terminal, Cpu, Shield, Copy, Check, GitMerge } from "lucide-react";

interface SubsystemTab {
  id: string;
  name: string;
  short: string;
  icon: typeof Terminal;
  badge: string;
  badgeColor: string;
  file: string;
  code: string;
  metrics: { label: string; value: string }[];
}

const subsystems: SubsystemTab[] = [
  {
    id: "linux",
    name: "Linux OpenPrinting IPC",
    short: "Linux IPC",
    icon: GitMerge,
    badge: "MERGED UPSTREAM",
    badgeColor: "text-[#00f5d4] border-[#00f5d4]/40 bg-[#00f5d4]/10",
    file: "system-config-printer/async_resolver.py",
    code: `# Async D-Bus non-blocking CUPS driverless query
async def resolve_printer_metadata(device_uri: str):
    # Offload network query from GTK main thread
    bus = await Gio.bus_get_async(Gio.BusType.SYSTEM)
    proxy = await Gio.DBusProxy.new_for_bus(
        bus, "org.openprinting.Resolver", "/org/openprinting"
    )
    # Async worker dispatch prevents UI freeze
    res = await proxy.call("QueryDriverlessPrinters", device_uri)
    return res.unpack()  # 0ms thread freeze`,
    metrics: [
      { label: "IPC LATENCY", value: "< 0.4ms" },
      { label: "UI FREEZE", value: "0ms (Fixed)" },
      { label: "FOUNDATION", value: "Linux Org" },
    ],
  },
  {
    id: "compiler",
    name: "Ezy Compiler & VM",
    short: "Bytecode VM",
    icon: Cpu,
    badge: "SYSTEMS / RUST",
    badgeColor: "text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10",
    file: "ezy-lang/src/vm/dispatcher.rs",
    code: `// Pratt Parser & Stack-based Bytecode Dispatch Loop
pub fn execute_chunk(chunk: &Chunk) -> Result<Value, VMError> {
    let mut ip = 0;
    loop {
        match chunk.read_opcode(&mut ip) {
            OpCode::Constant(idx) => push(chunk.constants[idx]),
            OpCode::Call(argc)    => self.dispatch_frame(argc)?,
            OpCode::TailCall      => self.optimize_tail_call(),
            OpCode::Return        => return Ok(pop()),
        }
    }
}`,
    metrics: [
      { label: "PIPELINE", value: "Lexer → Pratt → VM" },
      { label: "BYTECODE", value: "Stack Architecture" },
      { label: "RECURSION", value: "Tail-Call Opt" },
    ],
  },
  {
    id: "ai",
    name: "Local AI Containment",
    short: "AI Sandbox",
    icon: Shield,
    badge: "53 TESTS PASSING",
    badgeColor: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
    file: "containment-core/sandbox.ts",
    code: `// Sandboxed Agent Execution & Tool Guard
const runtime = new AgentContainmentRuntime({
  maxExecutionTimeMs: 2500,
  networkAllowList: ["127.0.0.1:11434"],
  toolPermissions: ["fs:read_sandbox", "git:inspect"],
  maxTokensPerStep: 4096,
});

// Enforce determinism and prevent unauthorized tool calls
const response = await runtime.dispatchSecure(agentPrompt);`,
    metrics: [
      { label: "SANDBOX", value: "Zero-Trust" },
      { label: "TOOL DISPATCH", value: "Scoped / Guarded" },
      { label: "LOCAL INFERENCE", value: "Ollama / vLLM" },
    ],
  },
];

export function HeroArchitectureConsole() {
  const [activeTab, setActiveTab] = useState(subsystems[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const IconComponent = activeTab.icon;

  return (
    <div className="w-full relative select-none">
      {/* Ambient Console Lighting */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 bg-gradient-to-r from-[#00f5d4]/15 via-[#38bdf8]/10 to-[#a855f7]/15 rounded-3xl blur-2xl opacity-60 pointer-events-none"
      />

      {/* Main Glass Console Card */}
      <div className="relative rounded-2xl bg-[#090d15]/90 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden flex flex-col">
        {/* Terminal Window Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-white/[0.03] border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-neutral-400 font-semibold ml-2 hidden sm:inline">
              ARCH_TELEMETRY // v2.6
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#00f5d4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] animate-pulse" />
            <span className="tracking-wide">SUBSYSTEM ONLINE</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-white/10 bg-black/40 overflow-x-auto no-scrollbar font-mono text-[11px]">
          {subsystems.map((tab) => {
            const isCurrent = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                type="button"
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 transition-all cursor-pointer border-r border-white/10 shrink-0 ${
                  isCurrent
                    ? "bg-[#00f5d4]/10 text-white font-semibold border-b-2 border-b-[#00f5d4]"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                }`}
              >
                <span>{tab.short}</span>
              </button>
            );
          })}
        </div>

        {/* Active Subsystem Filepath & Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-white/5 text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2 truncate">
            <IconComponent className="w-3.5 h-3.5 text-[#00f5d4] shrink-0" />
            <span className="text-neutral-300 truncate">{activeTab.file}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${activeTab.badgeColor}`}
            >
              {activeTab.badge}
            </span>

            <button
              onClick={handleCopy}
              type="button"
              className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition"
              title="Copy snippet"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Code Snippet Display with Syntax Highlighting Look */}
        <div className="p-3.5 sm:p-4 bg-[#05070c]/90 overflow-x-auto font-mono text-xs leading-relaxed text-neutral-300">
          <pre className="text-neutral-300 overflow-x-auto selection:bg-[#00f5d4]/30">
            <code>{activeTab.code}</code>
          </pre>
        </div>

        {/* Live Subsystem Telemetry Matrix Strip */}
        <div className="grid grid-cols-3 border-t border-white/10 bg-black/60 p-2.5 sm:p-3 text-center font-mono">
          {activeTab.metrics.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                idx < 2 ? "border-r border-white/10" : ""
              } px-2`}
            >
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider truncate">
                {m.label}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight mt-0.5 truncate">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
