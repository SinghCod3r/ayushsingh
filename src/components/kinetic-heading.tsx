"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntroDone } from "@/lib/use-intro-done";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
  /** "intro" waits for the hello intro; "scroll" plays when scrolled into view. */
  trigger?: "intro" | "scroll";
  /** Letters swell toward the cursor (or ripple on touch screens). */
  interactive?: boolean;
  minWeight?: number;
  maxWeight?: number;
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Kinetic headline. Characters rise out of a mask, and — when `interactive` —
 * the variable font's weight follows the pointer.
 */
export function KineticHeading({
  lines,
  as: Tag = "h2",
  className = "",
  trigger = "scroll",
  interactive = false,
  minWeight = 300,
  maxWeight = 800,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const introDone = useIntroDone();
  const ready = trigger === "intro" ? introDone : true;
  const El = Tag as ElementType;

  // Entrance
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const chars = el.querySelectorAll<HTMLElement>(".k-char");
    const play = () =>
      gsap.to(chars, { y: 0, duration: 1.15, ease: "expo.out", stagger: 0.045 });

    if (trigger === "intro") {
      if (!introDone) return;
      const tween = play();
      return () => {
        tween.kill();
      };
    }
    const st = ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
    return () => st.kill();
  }, [trigger, introDone]);

  // Weight response
  useEffect(() => {
    const el = ref.current;
    if (!interactive || !ready || !el || prefersReducedMotion()) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>(".k-char"));
    const current = chars.map(() => minWeight);
    const span = maxWeight - minWeight;
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let pointer: { x: number; y: number } | null = null;
    let visible = true;
    const t0 = performance.now();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pointer = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      pointer = null;
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    const tick = () => {
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;
      // read first, write after, to avoid layout thrash
      const targets = chars.map((c, i) => {
        if (pointer && hasMouse) {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          const radius = r.height * 0.8;
          return minWeight + span * Math.exp(-(d * d) / (radius * radius));
        }
        // idle: a slow wave travelling through the letters
        return minWeight + span * 0.6 * (0.5 + 0.5 * Math.sin(t * 1.1 - i * 0.7));
      });
      chars.forEach((c, i) => {
        current[i] += (targets[i] - current[i]) * 0.12;
        c.style.fontWeight = current[i].toFixed(0);
      });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive, ready, minWeight, maxWeight]);

  return (
    <El ref={ref} aria-label={lines.join(" ")} className={className}>
      {lines.map((line, li) => (
        <span
          key={li}
          aria-hidden="true"
          className="block overflow-hidden px-[0.04em] py-[0.12em] -my-[0.12em] pb-[0.3em] -mb-[0.3em]"
        >
          {line.split(" ").map((word, wi, words) => (
            <span key={wi}>
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((ch, ci) => (
                  <span key={ci} className="k-char" style={{ fontWeight: minWeight }}>
                    {ch}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
      ))}
    </El>
  );
}
