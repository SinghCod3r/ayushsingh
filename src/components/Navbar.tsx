import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data';

export const Navbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'OPEN SOURCE', href: '#opensource' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed-nav-header">
        {/* Top hairline progress bar */}
        <div className="nav-progress-track">
          <div className="nav-progress-bar" style={{ width: `${scrollProgress}%` }} />
        </div>

        <div className="nav-container">
          <a href="#hero" className="nav-brand-group">
            <span className="nav-brand-name">AYUSH SINGH</span>
            <span className="nav-status-pill">
              <span className="nav-status-dot" />
              AVAILABLE FOR HIRE
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="nav-links-desktop">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link-item">
                {item.label}
              </a>
            ))}
            <a
              href={PORTFOLIO_DATA.identity.links.resume}
              target="_blank"
              rel="noreferrer"
              className="nav-btn-resume"
            >
              RÉSUMÉ
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`nav-hamburger-bar ${mobileMenuOpen ? 'open-1' : ''}`} />
            <span className={`nav-hamburger-bar ${mobileMenuOpen ? 'open-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`nav-mobile-drawer ${mobileMenuOpen ? 'drawer-active' : ''}`}>
        <div className="nav-mobile-links">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-mobile-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={PORTFOLIO_DATA.identity.links.resume}
            target="_blank"
            rel="noreferrer"
            className="nav-mobile-resume-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            DOWNLOAD RÉSUMÉ (PDF)
          </a>
        </div>
      </div>
    </>
  );
};

