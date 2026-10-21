import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, TimelineItem } from '../data';
import { initJourneyAnimation } from '../animations/journey';

export const Journey: React.FC = () => {
  const journeyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!journeyRef.current) return;
    const cleanup = initJourneyAnimation(journeyRef.current);
    return cleanup;
  }, []);

  return (
    <section id="journey" ref={journeyRef} className="journey-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">{PORTFOLIO_DATA.journey.sectionNum} // TIMELINE</div>
          <h2 className="section-title-large">JOURNEY &amp; EXPERIENCE</h2>
          <p className="section-lead-text">
            FROM CORE ACADEMIC RIGOR TO ENTERPRISE APIS AND UPSTREAM LINUX GOVERNANCE.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="journey-timeline-track">
          <div className="journey-spine-base" />
          <div className="journey-spine-fill" />

          <div className="journey-milestones-list">
            {PORTFOLIO_DATA.journey.timeline.map((item: TimelineItem, index: number) => (
              <div key={index} className="journey-milestone-item">
                <div className="milestone-bullet">
                  <span className="bullet-inner" />
                </div>

                <div className="milestone-content-card">
                  <div className="milestone-meta-row">
                    <span className="milestone-year">{item.year}</span>
                    <span className="milestone-highlight-pill">{item.highlight}</span>
                  </div>

                  <h3 className="milestone-title">{item.title}</h3>
                  <div className="milestone-org">{item.organization}</div>
                  <div className="milestone-role-tag">{item.role}</div>

                  <p className="milestone-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
