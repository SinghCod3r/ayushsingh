"use client";

import { useRef, type ReactNode } from "react";
import { ScrollLine } from "./scroll-line";

/** Wraps the sections so one scroll-drawn line can run through all of them. */
export function PageShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <main id="top" ref={ref} className="relative">
      <ScrollLine target={ref} />
      {children}
    </main>
  );
}
