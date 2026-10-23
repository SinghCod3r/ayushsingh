"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import { TextRoll } from "./text-roll";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    window.dispatchEvent(new Event("scroll:lock"));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new Event("scroll:unlock"));
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* The bar inverts against whatever is behind it, so it reads in both themes. */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-white mix-blend-difference md:px-10">
        <a href="#top" onClick={close} className="font-display text-lg font-semibold tracking-tight">
          <TextRoll>{site.handle}</TextRoll>
        </a>

        <div className="flex items-center gap-6 md:gap-9">
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium">
                <TextRoll center>{item.label}</TextRoll>
              </a>
            ))}
          </nav>
          <ThemeToggle className="grid size-9 place-items-center rounded-full" />
          <button
            type="button"
            className="text-sm font-medium md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-bg px-5 pb-10 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="font-display text-[11vw] font-semibold leading-[1.02] tracking-tight"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.05, duration: 0.5 } }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
