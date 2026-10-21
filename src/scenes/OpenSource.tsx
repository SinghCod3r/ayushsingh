import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, OpenSourcePR } from '../data';
import { initOpenSourceAnimation } from '../animations/opensource';

export const OpenSource: React.FC = () => {
  const osRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!osRef.current) return;
    const cleanup = initOpenSourceAnimation(osRef.current);
    return cleanup;
  }, []);

  return (
    <section id="opensource" ref={osRef} className="opensource-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">
            {PORTFOLIO_DATA.opensource.sectionNum} // THE LINUX FOUNDATION
          </div>
          <h2 className="section-title-large">UPSTREAM OPEN SOURCE</h2>
          <p className="section-lead-text">
            MAINTAINING DESKTOP LINUX PRINTER SUBSYSTEMS, ELIMINATING CONCURRENCY LOCKS, AND
            SHIPPING REGRESSION-TESTED RUNTIMES.
          </p>
        </div>

        {/* Repository Overview Card */}
        <div className="git-repo-banner">
          <div className="git-repo-info">
            <span className="git-branch-badge">
              <span className="git-icon-fork" />
              upstream / main
            </span>
            <h3 className="git-repo-title">{PORTFOLIO_DATA.opensource.repo}</h3>
            <p className="git-repo-desc">{PORTFOLIO_DATA.opensource.description}</p>
          </div>
          <div className="git-repo-stats">
            <div className="git-stat-box">
              <span className="git-stat-val">11+</span>
              <span className="git-stat-lbl">MERGED PRS</span>
            </div>
            <div className="git-stat-box">
              <span className="git-stat-val">4</span>
              <span className="git-stat-lbl">REPOSITORIES</span>
            </div>
          </div>
        </div>

        {/* Visual Git Branching Timeline Tree */}
        <div className="git-tree-container">
          {/* Main Trunk Line */}
          <div className="git-trunk-line" />

          {/* List of Branch Commits */}
          <div className="git-branches-list">
            {PORTFOLIO_DATA.opensource.prs.map((pr: OpenSourcePR) => (
              <div key={pr.prNumber} className="git-branch-item">
                {/* Branch connector SVG line & merge node */}
                <div className="git-node-column">
                  <div className="git-node-dot" title="Merged Upstream">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="git-branch-arm" />
                </div>

                {/* PR Commit Card */}
                <div className="git-commit-card">
                  <div className="git-commit-header">
                    <div className="git-commit-tags">
                      <span className="git-pr-number">{pr.prNumber}</span>
                      <span className="git-status-merged">MERGED</span>
                      <span className="git-repo-pill">{pr.repo}</span>
                    </div>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noreferrer"
                      className="git-pr-link"
                      aria-label={`View ${pr.prNumber} on GitHub`}
                    >
                      <span>VIEW PR</span>
                      <span className="link-arrow">→</span>
                    </a>
                  </div>

                  <h4 className="git-commit-title">{pr.title}</h4>
                  <p className="git-commit-summary">{pr.summary}</p>

                  <div className="git-commit-chips">
                    {pr.tags.map((tag) => (
                      <span key={tag} className="git-chip">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintainer Note Callout */}
        <div className="maintainer-callout-card">
          <div className="callout-icon">“</div>
          <div className="callout-body">
            <p className="callout-quote">
              Collaborating directly with senior upstream maintainers like Alexander Pevzner on
              GTK GLib worker thread isolation and IPP-over-USB classification taught me that real
              systems programming is about patience, deterministic diagnostics, and respecting
              concurrency boundaries.
            </p>
            <div className="callout-author">
              <span className="author-name">Ayush Singh</span>
              <span className="author-role">OpenPrinting Upstream Maintainer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

