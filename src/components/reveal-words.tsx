"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** A paragraph whose words light up one by one as you scroll through it. */
export function RevealWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll(".k-word");
    const tween = gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 55%", scrub: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i, arr) => (
        <span key={i}>
          <span className="k-word">{w}</span>
          {i < arr.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
