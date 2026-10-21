import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { initContactAnimation } from '../animations/contact';

export const Contact: React.FC = () => {
  const contactRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!contactRef.current) return;
    const cleanup = initContactAnimation(contactRef.current);
    return cleanup;
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <footer id="contact" ref={contactRef} className="contact-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">{PORTFOLIO_DATA.contact.sectionNum} // OUTRO</div>
          <span className="contact-status-badge">
            <span className="contact-status-dot" />
            OPEN FOR FULL-TIME ROLES &amp; SELECT COLLABORATIONS
          </span>
        </div>

        {/* Monumental Cinematic Headline */}
        <div className="contact-headline-wrap">
          <h2 className="contact-headline">
            <span className="contact-headline-line display-block">LET&apos;S BUILD</span>
            <span className="contact-headline-line display-block text-stroke">SOMETHING</span>
            <span className="contact-headline-line display-block accent-red">GREAT.</span>
          </h2>
        </div>

        {/* Direct Action Hub */}
        <div className="contact-actions-grid">
          {/* Email Direct Card */}
          <div className="contact-action-item email-box">
            <span className="action-tag">DIRECT DISPATCH</span>
            <div className="email-display-row">
              <span className="email-address-text">{PORTFOLIO_DATA.contact.fullEmail}</span>
            </div>
            <div className="email-buttons-row">
              <a
                href={`mailto:${PORTFOLIO_DATA.contact.fullEmail}`}
                className="btn-primary email-btn"
              >
                <span>OPEN MAIL CLIENT</span>
                <span className="btn-arrow">→</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-secondary copy-btn"
                aria-label="Copy email address"
              >
                <span>{copied ? '✓ COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
              </button>
            </div>
          </div>

          {/* Connect & Socials Card */}
          <div className="contact-action-item links-box">
            <span className="action-tag">VERIFIED CHANNELS</span>
            <div className="social-links-list">
              {PORTFOLIO_DATA.contact.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link-row"
                >
                  <span className="link-label">{link.label}</span>
                  <span className="link-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Sub-Footer */}
        <div className="contact-subfooter">
          <div className="subfooter-left">
            <span className="footer-copyright">
              &copy; {PORTFOLIO_DATA.contact.footer.copyrightYear} {PORTFOLIO_DATA.contact.footer.name}
            </span>
            <span className="footer-bullet">•</span>
            <span className="footer-note">{PORTFOLIO_DATA.contact.footer.note}</span>
          </div>

          <div className="subfooter-right">
            <a href="#hero" className="btn-back-to-top">
              <span>BACK TO TOP</span>
              <span className="arrow-up">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
