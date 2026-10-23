"use client";

import { useSyncExternalStore, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/data";
import { ExternalLink } from "./external-link";
import { ProjectImage } from "./project-image";
import { TextRoll } from "./text-roll";
export interface ProjectListProps {
  projects: Project[];
}

function subscribePointerFine(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPointerFineSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}
/**
 * Minimal hover preview project list:
 * - On desktop: hovering a row shows a floating ~320px preview card that follows
 *   the cursor with tilt and reveals via clip-path wipe. Moving across the row
 *   swaps in the second screenshot.
 * - On mobile: tapping a row expands it in place with a compact image, description,
 *   and case study.
 * - Rows are ~150px tall, shrinking Work from multiple screens to roughly one.
 */
export function ProjectList({ projects }: ProjectListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project>(() => projects[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0, rotate: 0 });

  const isPointerFine = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getServerSnapshot,
  );

  const prevX = useRef<number>(0);

  const updateCardPosition = (clientX: number, clientY: number, tilt: number) => {
    if (typeof window === "undefined") return;
    const cardWidth = 352;
    const cardHeight = 290;

    let targetX = clientX + 24;
    let targetY = clientY - cardHeight / 2;

    if (targetX + cardWidth > window.innerWidth - 16) {
      targetX = clientX - cardWidth - 24;
    }

    targetX = Math.max(16, Math.min(window.innerWidth - cardWidth - 16, targetX));
    targetY = Math.max(16, Math.min(window.innerHeight - cardHeight - 16, targetY));

    setCardPos({ x: targetX, y: targetY, rotate: tilt });
  };

  const handlePointerEnter = (project: Project, e: React.PointerEvent<HTMLLIElement>) => {
    setActiveProject(project);
    // Don't show floating card if this row is currently expanded
    if (expandedId !== project.id) {
      setIsVisible(true);
    }
    prevX.current = e.clientX;
    updateCardPosition(e.clientX, e.clientY, 0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    const deltaX = e.clientX - prevX.current;
    prevX.current = e.clientX;
    const tilt = Math.max(-8, Math.min(8, deltaX * 0.3));

    // Secondary screenshot swaps in as you move across the row
    const rect = e.currentTarget.getBoundingClientRect();
    const progress = (e.clientX - rect.left) / rect.width;
    setShowSecondary(progress > 0.45);

    updateCardPosition(e.clientX, e.clientY, tilt);
  };

  const handlePointerLeave = () => {
    setIsVisible(false);
    setShowSecondary(false);
  };

  const handleRowClick = (id: string) => {
    setExpandedId((prev) => {
      const next = prev === id ? null : id;
      // Hide preview card when expanding to avoid obscuring the case study
      if (next === id) {
        setIsVisible(false);
      }
      return next;
    });
  };

  return (
    <div className="relative mt-16">
      {/* Floating preview card (desktop pointer-fine) */}
      <aside
        id="project-preview-card"
        data-testid="project-preview-card"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "352px",
          height: "290px",
          transform: `translate3d(${cardPos.x}px, ${cardPos.y}px, 0) rotate(${cardPos.rotate}deg)`,
          clipPath: isVisible && isPointerFine ? "inset(0%)" : "inset(0% 0% 100%)",
          opacity: isVisible && isPointerFine ? 1 : 0,
          pointerEvents: "none",
          zIndex: 50,
          transition:
            "clip-path 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease, transform 120ms ease-out",
        }}
        className="flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-bg/95 p-4 shadow-2xl backdrop-blur-md"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-line/20">
          {activeProject?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300",
                showSecondary && activeProject.secondaryImage ? "opacity-0" : "opacity-100",
              )}
            />
          ) : null}
          {activeProject?.secondaryImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeProject.secondaryImage}
              alt={`${activeProject.title} second screenshot`}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300",
                showSecondary ? "opacity-100" : "opacity-0",
              )}
            />
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="min-w-0 pr-2">
            <span className="block truncate font-display font-medium text-fg">
              {activeProject?.title}
            </span>
            <span className="block truncate text-[11px] text-muted">
              {activeProject?.category}
            </span>
          </div>
          {activeProject?.secondaryImage ? (
            <div
              className="flex shrink-0 items-center gap-1.5"
              title="Move cursor to swap screenshots"
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                  !showSecondary ? "bg-accent" : "bg-line",
                )}
              />
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                  showSecondary ? "bg-accent" : "bg-line",
                )}
              />
            </div>
          ) : (
            <span className="shrink-0 font-mono text-[11px] text-muted">
              {activeProject?.year}
            </span>
          )}
        </div>
      </aside>

      {/* Projects List */}
      <ol className="border-b border-line">
        {projects.map((p) => {
          const isExpanded = expandedId === p.id;
          const secondary = p.secondaryImage;
          const live = p.live;
          const dive = p.deepDive;
          const diveRows = dive
            ? [
                ["Problem", dive.problem],
                ["Idea", dive.idea],
                ["How it works", dive.howItWorks],
                ["Technology", dive.technology],
                ["What I learned", dive.whatILearned],
              ]
            : [];

          return (
            <li
              key={p.id}
              className="group/roll relative border-t border-line transition-colors duration-200"
              onPointerEnter={(e) => handlePointerEnter(p, e)}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => handleRowClick(p.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`case-study-${p.id}`}
                  className="flex min-h-[150px] w-full items-center justify-between gap-4 text-left transition-colors md:h-[150px]"
                >
                  <div className="flex min-w-0 items-baseline gap-4 md:gap-8">
                    <span className="shrink-0 font-mono text-sm text-muted tabular-nums">
                      ({p.number})
                    </span>
                    <span className="font-display text-[clamp(2.25rem,5.5vw,5.75rem)] font-semibold leading-[0.95] tracking-tighter">
                      <TextRoll wrap>{p.title}</TextRoll>
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-6">
                    <span className="hidden md:block">{p.year}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-2xl font-light text-muted transition-transform duration-300 md:hidden",
                        isExpanded ? "rotate-45" : "rotate-0",
                      )}
                    >
                      +
                    </span>
                  </div>
                </button>
              </h3>

              {/* Mobile / expanded row detail */}
              {isExpanded ? (
                <div
                  id={`case-study-${p.id}`}
                  className="overflow-hidden pb-12 pt-2 transition-all duration-300"
                >
                  <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                    <div className="space-y-4 md:col-span-7">
                      <ProjectImage src={p.image} alt={`${p.title} screenshot`} />
                      {secondary ? (
                        <ProjectImage src={secondary} alt={`${p.title} second screenshot`} />
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-6 md:col-span-5">
                      <div>
                        <span className="text-sm font-medium text-muted">
                          {p.category} · {p.year}
                        </span>
                        <p className="mt-2 text-xl font-medium tracking-tight">{p.subtitle}</p>
                        <p className="mt-3 text-base leading-relaxed text-muted">
                          {p.description}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
                          Technologies
                        </p>
                        <p className="text-sm text-fg">{p.tags.join(" · ")}</p>
                      </div>

                      <div className="flex flex-wrap gap-x-7 gap-y-3 pt-2">
                        {p.github ? <ExternalLink href={p.github}>GitHub</ExternalLink> : null}
                        {live ? <ExternalLink href={live}>Live site</ExternalLink> : null}
                      </div>

                      {dive ? (
                        <div className="mt-4 border-t border-line pt-4">
                          <h4 className="font-display text-lg font-medium">Case study</h4>
                          <dl className="mt-4 space-y-4">
                            {diveRows.map(([label, text]) => (
                              <div key={label}>
                                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                                  {label}
                                </dt>
                                <dd className="mt-1 text-sm leading-relaxed">{text}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
