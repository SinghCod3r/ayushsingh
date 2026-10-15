"use client";

import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Send,
  Terminal,
  Clock,
  MapPin,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { identity } from "@/data/identity";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sentMessage, setSentMessage] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inbound from ${formData.name || "Engineering Colleague"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
    setSentMessage(true);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Communication Channels"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 09</span>
        <span className="text-neutral-600">//</span>
        <span>DIRECT COMMUNICATION</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 w-full">
        {/* Left Info & Channels */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 w-full">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
              Initiate Contact
            </h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed">
              Connect on open-source initiatives, systems tooling, or software engineering.
            </p>
          </div>

          {/* Primary Email Quick Action Card */}
          <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-[#00f5d4]/30 bg-[#00f5d4]/[0.03] space-y-3 sm:space-y-4 w-full">
            <span className="text-[11px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Direct Inbound:
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <a
                href={`mailto:${identity.email}`}
                className="text-sm sm:text-lg md:text-xl font-mono font-bold text-white hover:text-[#00f5d4] transition break-all"
              >
                {identity.email}
              </a>

              <button
                onClick={handleCopyEmail}
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-neutral-200 transition cursor-pointer self-start sm:self-center shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Download Verified Resume / CV Card */}
          <a
            href="/Ayush_Singh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Ayush_Singh_Resume.pdf"
            className="p-4 sm:p-5 rounded-xl glass-panel border border-[#00f5d4]/40 bg-[#00f5d4]/[0.06] hover:bg-[#00f5d4]/[0.12] transition flex items-center justify-between group cursor-pointer w-full"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#00f5d4]/10 text-[#00f5d4] group-hover:scale-105 transition shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#00f5d4] block">Verified Curriculum Vitae</span>
                <span className="text-xs sm:text-sm font-bold text-white font-mono">Download Ayush Singh CV (PDF)</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#00f5d4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
          </a>

          {/* Social Presence Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-xl glass-panel border border-white/10 hover:border-[#00f5d4]/40 hover:bg-white/5 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-5 h-5 text-white group-hover:text-[#00f5d4] transition shrink-0" />
                <div className="truncate">
                  <span className="text-[11px] font-mono text-neutral-400 block">GitHub</span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono truncate">github.com/SinghCod3r</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition shrink-0" />
            </a>

            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-xl glass-panel border border-white/10 hover:border-[#38bdf8]/40 hover:bg-white/5 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-5 h-5 text-[#38bdf8] group-hover:scale-110 transition shrink-0" />
                <div className="truncate">
                  <span className="text-[11px] font-mono text-neutral-400 block">LinkedIn</span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono truncate">in/singhcod3r</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition shrink-0" />
            </a>
          </div>

          {/* Location & Timezone HUD */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono text-neutral-400 pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00f5d4]" />
              <span>Lucknow, India (IST)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>UTC+05:30</span>
            </div>
          </div>
        </div>

        {/* Right Message Compose Console */}
        <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-4 sm:p-6 md:p-8 bg-black/40 w-full">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 sm:mb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-white">
              <Terminal className="w-4 h-4 text-[#00f5d4]" />
              <span>INBOUND DISPATCH</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">DIRECT CLIENT</span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-[11px] sm:text-xs font-mono text-neutral-300 mb-1">
                Name / Team
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name or team"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00f5d4] transition font-sans"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[11px] sm:text-xs font-mono text-neutral-300 mb-1">
                Return Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@domain.org"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00f5d4] transition font-sans"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[11px] sm:text-xs font-mono text-neutral-300 mb-1">
                Message Brief
              </label>
              <textarea
                id="contact-message"
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Engineering inquiry or collaboration details..."
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00f5d4] transition font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 rounded-xl bg-[#00f5d4] text-[#08090c] font-bold text-xs font-mono hover:bg-[#38bdf8] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,245,212,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch Inbound Email</span>
            </button>
          </form>

          {sentMessage && (
            <p className="mt-2.5 text-xs font-mono text-emerald-400 text-center">
              ✓ Email client opened with your pre-filled inquiry.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
