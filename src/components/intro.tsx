"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HELLO_GLYPHS, HELLO_VIEWBOX } from "@/lib/hello-paths";

/**
 * Apple-style "hello" intro: the word is written out stroke by stroke,
 * fills in, then the whole screen lifts away to reveal the page.
 * Click or tap to skip ahead.
 */
export function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const wrap = wrapRef.current;
    if (!root || !wrap) return;

    const finish = () => {
      window.__introDone = true;
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new Event("scroll:unlock"));
      window.dispatchEvent(new Event("intro:done"));
      root.style.display = "none";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    window.dispatchEvent(new Event("scroll:lock"));

    const paths = Array.from(root.querySelectorAll<SVGPathElement>("path"));
    let tl: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 });
      });

      tl = gsap
        .timeline({ onComplete: finish })
        // write the word, glyph by glyph
        .to(paths, { strokeDashoffset: 0, duration: 1, ease: "power1.inOut", stagger: 0.17 }, 0.35)
        // ink it in and thin the outline away
        .to(paths, { fillOpacity: 1, duration: 0.7, ease: "power1.out" }, ">-0.25")
        .to(paths, { strokeOpacity: 0, duration: 0.5 }, "<")
        // let it breathe, then lift the screen
        .to(wrap, { scale: 0.94, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.45")
        .to(root, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=0.15");
    }, root);

    const skip = () => tl?.timeScale(4);
    root.addEventListener("pointerdown", skip);

    return () => {
      root.removeEventListener("pointerdown", skip);
      ctx.revert();
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new Event("scroll:unlock"));
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="intro fixed inset-0 z-[100] grid place-items-center bg-bg text-fg"
    >
      <div ref={wrapRef} className="w-[min(86vw,980px)]">
        <svg
          viewBox={HELLO_VIEWBOX}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="singhcod3r"
        >
          {HELLO_GLYPHS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
