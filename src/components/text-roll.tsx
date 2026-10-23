import { cn } from "@/lib/cn";

/**
 * Text roll: on hover or keyboard focus each character rolls up and is replaced
 * by a copy from below, staggered. The pattern follows Skiper UI's skiper58;
 * this version is CSS-driven so any parent marked `group/roll` can trigger it.
 */
const STAGGER_MS = 25;

export function TextRoll({
  children,
  className,
  center = false,
  wrap = false,
}: {
  children: string;
  className?: string;
  /** Start the roll from the middle of the text instead of the left. */
  center?: boolean;
  /** Allow long titles to wrap by words without clipping or breaking the roll. */
  wrap?: boolean;
}) {
  const chars = Array.from(children);
  const total = chars.length;
  const delay = (i: number) =>
    (center ? Math.abs(i - (total - 1) / 2) : i) * STAGGER_MS;

  const renderChar = (ch: string, globalIndex: number, copy: "top" | "bottom") => (
    <span
      key={globalIndex}
      className={cn(
        "inline-block transition-transform duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
        copy === "top"
          ? "group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full"
          : "translate-y-full group-hover/roll:translate-y-0 group-focus-visible/roll:translate-y-0",
      )}
      style={{ transitionDelay: `${delay(globalIndex)}ms` }}
    >
      {ch === " " ? "\u00a0" : ch}
    </span>
  );

  if (wrap) {
    // Split by spaces and precompute offsets immutably
    const words = children.split(" ");
    const wordsWithIndices = words.reduce<Array<{ word: string; startIndex: number }>>(
      (acc, word) => {
        const prev = acc[acc.length - 1];
        const startIndex = prev ? prev.startIndex + prev.word.length + 1 : 0;
        acc.push({ word, startIndex });
        return acc;
      },
      [],
    );

    return (
      <span className={cn("group/roll relative inline leading-[1.18]", className)}>
        <span className="sr-only">{children}</span>
        <span aria-hidden="true" className="inline">
          {wordsWithIndices.map(({ word, startIndex }, wIdx) => {
            const wordChars = Array.from(word);

            return (
              <span key={wIdx} className="inline">
                <span className="relative inline-block overflow-hidden whitespace-nowrap leading-[1.18] pb-[0.06em] align-bottom">
                  <span className="block">
                    {wordChars.map((ch, cIdx) =>
                      renderChar(ch, startIndex + cIdx, "top"),
                    )}
                  </span>
                  <span className="absolute inset-0 block">
                    {wordChars.map((ch, cIdx) =>
                      renderChar(ch, startIndex + cIdx, "bottom"),
                    )}
                  </span>
                </span>
                {wIdx < wordsWithIndices.length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      </span>
    );
  }

  const layer = (copy: "top" | "bottom") =>
    chars.map((ch, i) => renderChar(ch, i, copy));

  return (
    <span
      className={cn(
        "group/roll relative inline-block overflow-hidden whitespace-nowrap leading-[1.18] pb-[0.06em]",
        className,
      )}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="block">
        {layer("top")}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block">
        {layer("bottom")}
      </span>
    </span>
  );
}
