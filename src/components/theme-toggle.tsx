"use client";

import { useId, useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(subscribe, () => true, () => false);

/**
 * Animated sun / moon toggle. The icon morph follows the idea behind Skiper UI's
 * skiper4 theme toggles; the page change is a circular reveal from the button
 * using the View Transitions API (falls back to an instant switch).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const maskId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const btn = btnRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!btn || reduced || !document.startViewTransition) {
      setTheme(next);
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const rays = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={className}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle
            r="8"
            fill="black"
            initial={false}
            animate={{ cx: isDark ? 17 : 32, cy: isDark ? 6 : -4 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: isDark ? 8.5 : 4.5 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ transformOrigin: "12px 12px" }}
          initial={false}
          animate={{ rotate: isDark ? 70 : 0, scale: isDark ? 0.4 : 1, opacity: isDark ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        >
          {rays.map((deg) => (
            <line key={deg} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${deg} 12 12)`} />
          ))}
        </motion.g>
      </svg>
    </button>
  );
}
