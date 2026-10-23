"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scrolling, wired into GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ anchors: true, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const lock = () => lenis.stop();
    const unlock = () => lenis.start();
    window.addEventListener("scroll:lock", lock);
    window.addEventListener("scroll:unlock", unlock);

    return () => {
      window.removeEventListener("scroll:lock", lock);
      window.removeEventListener("scroll:unlock", unlock);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
