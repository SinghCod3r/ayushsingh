"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Mail, Menu, X, Play, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { identity } from "@/data/identity";

interface FloatingNavProps {
  onReplayIntro?: () => void;
}

const navLinks = [
  { label: "Identity", href: "#hero" },
  { label: "Open Source", href: "#open-source" },
  { label: "Architecture", href: "#architecture" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Books & Talks", href: "#writing-books" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function FloatingNav({ onReplayIntro }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none transition-all duration-300">
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 border ${
            scrolled
              ? "bg-[#0c0f16]/85 backdrop-blur-md border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
              : "bg-[#0e121a]/60 backdrop-blur-sm border-white/10"
          }`}
        >
          {/* Brand Identifier */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4] group-hover:scale-105 transition">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-bold tracking-tight text-white group-hover:text-[#00f5d4] transition">
                SinghCod3r
              </span>
              <span className="hidden sm:inline text-[9px] font-mono text-neutral-400">
                Ayush Singh
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#00f5d4] bg-[#00f5d4]/10 font-medium"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Icons & Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Role Availability Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available 2026</span>
            </div>

            {/* Replay Intro button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Cinematic Intro"
                aria-label="Replay Cinematic Intro"
                className="hidden sm:flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1 rounded-full border border-white/10 hover:border-[#00f5d4]/40 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono transition cursor-pointer"
              >
                <Play className="w-3 h-3 text-[#00f5d4]" />
                <span className="hidden xl:inline text-[11px]">Replay Intro</span>
              </button>
            )}

            {/* Social Direct Links */}
            <div className="flex items-center gap-1">
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ayush Singh GitHub"
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ayush Singh LinkedIn"
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-1.5 rounded-full text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-label="Mobile Navigation Menu"
          aria-modal="true"
          className="fixed inset-0 z-35 bg-[#08090c]/95 backdrop-blur-xl flex flex-col justify-center px-8 py-16 lg:hidden animate-in fade-in duration-200"
        >
          <div className="max-w-md mx-auto w-full flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
                <span>NAVIGATION // SinghCod3r</span>
              </div>
              <span>SRM-CEM 2026</span>
            </div>

            <ul className="flex flex-col gap-3 font-mono text-lg">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block px-4 py-2 rounded-lg transition ${
                        isActive
                          ? "text-[#00f5d4] bg-[#00f5d4]/10 font-bold"
                          : "text-neutral-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              {onReplayIntro && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#00f5d4]/30 bg-[#00f5d4]/10 text-[#00f5d4] text-xs font-mono"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Replay Cinematic Intro</span>
                </button>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <a
                  href={`mailto:${identity.email}`}
                  className="flex items-center gap-2 text-neutral-300 hover:text-[#00f5d4]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{identity.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
