"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Mail, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { identity } from "@/data/identity";

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

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

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
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-3 sm:px-4 pt-3 sm:pt-6 pointer-events-none transition-all duration-300">
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 border max-w-[calc(100vw-1.5rem)] ${
            scrolled
              ? "bg-[#0c0f16]/90 backdrop-blur-md border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
              : "bg-[#0e121a]/70 backdrop-blur-sm border-white/10"
          }`}
        >
          {/* Brand Identifier */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <div className="w-6 h-6 rounded-md bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4] group-hover:scale-105 transition">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-mono font-bold tracking-tight text-white group-hover:text-[#00f5d4] transition">
              SinghCod3r
            </span>
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

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Social Direct Links */}
            <div className="flex items-center gap-0.5 sm:gap-1">
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
          className="fixed inset-0 z-50 bg-[#08090c]/98 backdrop-blur-xl flex flex-col justify-center px-6 sm:px-8 py-12 lg:hidden animate-in fade-in duration-200"
        >
          <div className="max-w-md mx-auto w-full flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
                <span>NAVIGATION // SinghCod3r</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="flex flex-col gap-2 font-mono text-base">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block px-3.5 py-2 rounded-lg transition ${
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

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <a
                href={`mailto:${identity.email}`}
                className="flex items-center gap-2 text-neutral-300 hover:text-[#00f5d4] break-all"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{identity.email}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
