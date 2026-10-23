import { portfolioData } from "./data";

export const site = {
  name: portfolioData.personal.name,
  handle: "singhcod3r",
  city: "Lucknow",
  timeZone: "Asia/Kolkata",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Open source", href: "#open-source" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Talks", href: "#talks" },
  { label: "Contact", href: "#contact" },
];

/** "LET'S BUILD SOMETHING COOL." -> "Let's build something cool." */
export function sentence(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/** Split a phrase into two lines of roughly equal word count. */
export function twoLines(s: string): string[] {
  const words = s.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
