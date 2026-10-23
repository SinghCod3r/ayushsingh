"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Project screenshot. If the file isn't in /public yet, shows a placeholder
 * that names the path to drop it at.
 */
export function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The error can fire before hydration; catch that case too.
  useEffect(() => {
    const img = ref.current;
    if (!img || !img.complete || img.naturalWidth > 0) return;
    const id = requestAnimationFrame(() => setFailed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (failed) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-md border border-dashed border-line p-6 text-center text-sm text-muted">
        <span>
          Add screenshot at
          <br />
          <code className="break-all">public{src}</code>
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[16/10] w-full rounded-md border border-line object-cover object-top"
    />
  );
}
