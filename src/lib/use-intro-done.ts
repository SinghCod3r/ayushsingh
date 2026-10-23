"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

/** True once the hello intro has finished (or was skipped). */
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.__introDone) {
      // Intro finished before this component mounted.
      const id = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(id);
    }
    const onDone = () => setDone(true);
    window.addEventListener("intro:done", onDone);
    return () => window.removeEventListener("intro:done", onDone);
  }, []);

  return done;
}
