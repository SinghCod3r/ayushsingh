import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, AwardItem } from '../data';
import { initAchievementsAnimation } from '../animations/achievements';

export const Achievements: React.FC = () => {
  const achRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!achRef.current) return;
    const cleanup = initAchievementsAnimation(achRef.current);
    return cleanup;
  }, []);

  const speaker = PORTFOLIO_DATA.achievements.speakerHighlight;

  return (
    <section id="achievements" ref={achRef} className="achievements-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">
            {PORTFOLIO_DATA.achievements.sectionNum} // RECOGNITION
          </div>
          <h2 className="section-title-large">IMPACT &amp; CREDENTIALS</h2>
          <p className="section-lead-text">
            COMMUNITY ENGAGEMENT, KEYNOTE PRESENTATIONS, AND VERIFIED INDUSTRY BADGES.
          </p>
        </div>

        {/* Major Keynote Speaker Feature Banner */}
        <div className="achievements-keynote-banner">
          <div className="keynote-visual-col">
            <div className="keynote-image-frame">
              <img
                src="./assets/ayush-speaker.webp"
                alt="Ayush Singh Keynote Speaker"
                className="keynote-portrait-img"
                loading="lazy"
              />
              <span className="keynote-badge-tag">KEYNOTE SPEAKER</span>
            </div>
          </div>

          <div className="keynote-text-col">
            <div className="keynote-event-badge">
              <span>{speaker.event}</span>
              <span className="keynote-dot">&bull;</span>
              <span>{speaker.date}</span>
            </div>

            <h3 className="keynote-title">&ldquo;{speaker.talk}&rdquo;</h3>

            <p className="keynote-summary">{speaker.summary}</p>

            <div className="keynote-tags">
              <span className="keynote-tag-pill">#UpstreamSignal</span>
              <span className="keynote-tag-pill">#CodeReviewHygiene</span>
              <span className="keynote-tag-pill">#OpenPrinting</span>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="achievements-grid">
          {PORTFOLIO_DATA.achievements.credentials.map((cred: AwardItem, idx: number) => (
            <div key={idx} className="achievements-badge-card">
              <div className="badge-card-top">
                <span className="badge-issuer">{cred.issuer}</span>
                <span className="badge-year">{cred.year}</span>
              </div>

              <h4 className="badge-title">{cred.title}</h4>

              {cred.highlight && <div className="badge-highlight-pill">{cred.highlight}</div>}

              <div className="badge-verified-row">
                <span className="badge-check">&check;</span>
                <span className="badge-verified-text">VERIFIED RECORD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

