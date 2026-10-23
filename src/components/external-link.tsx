import { cn } from "@/lib/cn";
import { TextRoll } from "./text-roll";

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group/roll inline-block underline decoration-accent decoration-2 underline-offset-8",
        className,
      )}
    >
      <TextRoll>{children}</TextRoll>
    </a>
  );
}

