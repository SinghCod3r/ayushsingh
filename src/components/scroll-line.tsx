"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/** Where on screen the drawn tip sits, as a fraction of the viewport height. */
const TIP = 0.6;

type Geometry = { w: number; h: number; d: string };

/**
 * One line that threads the sections together and is drawn by scrolling.
 * Inspired by Skiper UI's skiper19 ("Svg follow scroll"), but the path is built
 * in real pixels from the measured sections, so it fits any screen, and the
 * drawn tip is pinned to a fixed point of the viewport while you scroll.
 */
export function ScrollLine({ target }: { target: RefObject<HTMLElement | null> }) {
  const [geo, setGeo] = useState<Geometry | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const samples = useRef<{ len: Float32Array; y: Float32Array; total: number } | null>(null);

  const { scrollY } = useScroll();
  const raw = useMotionValue(0);
  const progress = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.3 });
  const visible = useTransform(progress, [0, 0.003], [0, 1]);

  // Build the path from the sections' actual positions, and rebuild it whenever
  // the page changes size (fonts, images, rotation, resize).
  useEffect(() => {
    const main = target.current;
    if (!main) return;

    const measure = () => {
      const main = target.current;
      if (!main) return;
      const w = main.clientWidth;
      const h = main.scrollHeight;
      const vh = window.innerHeight;
      const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section"));

      // Hug the page margin, which is empty, so the line never crosses text.
      const edge = Math.max(12, Math.min(22, w * 0.015));

      // Start on the right edge of the hero, level with the tip at scroll 0.
      const pts: Array<[number, number]> = [[w - edge, vh * TIP]];

      sections.forEach((s, i) => {
        const top = s.offsetTop;
        const bottom = top + s.offsetHeight;
        if (i === 0) {
          // Leave the hero from its bottom edge.
          pts.push([w - edge, bottom]);
          return;
        }
        // Switch sides in the empty band of padding between one section's last
        // content and the next section's first, so the sweep never touches text.
        const pad = parseFloat(getComputedStyle(s).paddingTop) || 0;
        const x = i % 2 === 0 ? w - edge : edge;
        pts.push([x, top + pad * 0.9]);
        pts.push([x, bottom - pad * 0.9]);
      });

      // Smooth S-curves with vertical tangents at each station, so y only ever increases.
      let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1];
        const [x1, y1] = pts[i];
        if (y1 <= y0 + 1) continue;
        const mid = (y1 - y0) / 2;
        d += ` C ${x0.toFixed(1)} ${(y0 + mid).toFixed(1)} ${x1.toFixed(1)} ${(y1 - mid).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      }

      setGeo((prev) => (prev && prev.d === d && prev.w === w && prev.h === h ? prev : { w, h, d }));
    };

    const ro = new ResizeObserver(measure);
    ro.observe(main);
    return () => ro.disconnect();
  }, [target]);

  // Which length of the path has its y at the tip? Binary search over samples.
  const update = useCallback(() => {
    const s = samples.current;
    if (!s) return;
    const ty = scrollY.get() + window.innerHeight * TIP;
    let lo = 0;
    let hi = s.y.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (s.y[mid] < ty) lo = mid + 1;
      else hi = mid;
    }
    raw.set(s.len[lo] / s.total);
  }, [scrollY, raw]);

  // Sample the path once per geometry.
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !geo) return;
    const total = path.getTotalLength();
    const n = Math.min(2000, Math.max(50, Math.ceil(total / 6)));
    const len = new Float32Array(n + 1);
    const y = new Float32Array(n + 1);
    for (let i = 0; i <= n; i++) {
      len[i] = (total * i) / n;
      y[i] = path.getPointAtLength(len[i]).y;
    }
    samples.current = { len, y, total };
    update();
  }, [geo, update]);

  useMotionValueEvent(scrollY, "change", update);

  // Keep the dot on the tip of the drawn line.
  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const s = samples.current;
    if (!path || !dot || !s) return;
    const pt = path.getPointAtLength(Math.min(1, Math.max(0, v)) * s.total);
    dot.setAttribute("cx", pt.x.toFixed(1));
    dot.setAttribute("cy", pt.y.toFixed(1));
  });

  if (!geo) return null;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      fill="none"
    >
      {/* faint track, so the route is visible before it is drawn */}
      <path d={geo.d} stroke="var(--line)" strokeWidth={1.5} strokeLinecap="round" />
      <motion.path
        ref={pathRef}
        d={geo.d}
        stroke="var(--accent)"
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{ pathLength: progress, opacity: visible }}
      />
      <motion.circle ref={dotRef} r={5} fill="var(--accent)" style={{ opacity: visible }} />
    </svg>
  );
}
