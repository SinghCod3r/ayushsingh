import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { initHeroAnimation } from '../animations/hero';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const cleanup = initHeroAnimation(heroRef.current);
    return cleanup;
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="hero-container">
        {/* Top Editorial Meta Bar */}
        <div className="hero-badge hero-anim-in">
          <span className="hero-badge-tag">
            <svg className="reticle-glyph-svg" viewBox="0 0 14 14" aria-hidden="true">
              <path id="hero-reticle-path" d="M7 1v12M1 7h12" />
            </svg>
            PORTFOLIO // VOL. 2026
          </span>
          <span className="hero-badge-loc">26.8467° N, 80.9462° E • LUCKNOW, IN</span>
        </div>

        {/* Main Composition Grid */}
        <div className="hero-grid">
          {/* Left / Typography Column */}
          <div className="hero-text-col hero-title-wrap">
            <div className="hero-subheading hero-title-line">
              <span className="accent-bar" />
              SOFTWARE ENGINEER • UPSTREAM MAINTAINER
            </div>

            <h1 className="hero-monument-title">
              <span className="hero-title-line display-block">AYUSH</span>
              <span className="hero-title-line display-block hero-title-stroke">SINGH</span>
            </h1>

            <p className="hero-description hero-meta-item">
              {PORTFOLIO_DATA.identity.heroDescription}
            </p>

            <div className="hero-actions-row hero-meta-item">
              <a href="#projects" className="btn-primary">
                <span>VIEW SELECTED WORK</span>
                <span className="btn-arrow">→</span>
              </a>
              <a href="#opensource" className="btn-secondary">
                <span>OPEN SOURCE</span>
                <span className="btn-dot" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="hero-stats-strip hero-meta-item">
              <div className="hero-stat-cell">
                <span className="hero-stat-num">11+</span>
                <span className="hero-stat-label">Upstream PRs</span>
              </div>
              <div className="hero-stat-cell">
                <span className="hero-stat-num">19</span>
                <span className="hero-stat-label">REST APIs</span>
              </div>
              <div className="hero-stat-cell">
                <span className="hero-stat-num">8.62</span>
                <span className="hero-stat-label">B.Tech CGPA</span>
              </div>
            </div>
          </div>

          {/* Right / Ayush's Real Hero Portrait Column */}
          <div className="hero-visual-col">
            <div className="hero-portrait-wrap">
              <div className="hero-portrait-backdrop" aria-hidden="true" />
              <div className="hero-portrait-frame">
                <img
                  src="./assets/ayush-hero.webp"
                  alt="Ayush Singh - Software Engineer and Open Source Maintainer"
                  className="hero-portrait-img"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Architectural Technical HUD Card */}
              <div className="hero-hud-card">
                <div className="hud-card-header">
                  <span className="hud-pulse-dot" />
                  <span className="hud-card-title">LINUX FOUNDATION // OPENPRINTING</span>
                </div>
                <div className="hud-card-body">
                  <code>system-config-printer • maintainer</code>
                  <span className="hud-card-status">ACTIVE TRIAGE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="hero-scroll-cue">
          <a href="#about" className="scroll-cue-link">
            <span className="scroll-cue-mouse">
              <span className="scroll-cue-wheel" />
            </span>
            <span className="scroll-cue-label">SCROLL TO DISCOVER</span>
          </a>
        </div>

        {/* Architectural Connector (Hero → About Transformation) */}
        <div className="section-connector-bridge hero-to-about-bridge" aria-hidden="true">
          <svg className="connector-path-svg" viewBox="0 0 2 80" preserveAspectRatio="none">
            <path id="hero-about-line" d="M1 0 L1 80" className="connector-line" />
          </svg>
          <div className="connector-tracer-dot hero-about-tracer" />
        </div>
      </div>
    </section>
  );
};
