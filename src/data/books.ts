export interface BookData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  genre: string;
  format: string;
  publisherPlatform: string;
  url: string;
  tagline: string;
  synopsis: string;
  themes: string[];
  quote: string;
  excerptSnippet: string;
  accentColor: string;
  glowColor: string;
}

export const books: BookData[] = [
  {
    id: "the-last-manual-merge",
    title: "The Last Manual Merge",
    subtitle: "A Speculative Systems Thriller",
    author: "Er. Ayush Singh",
    genre: "Sci-Fi / Systems Fiction",
    format: "Paperback Edition",
    publisherPlatform: "Pothi.com Store",
    url: "https://store.pothi.com/book/er-ayush-singh-last-manual-merge/",
    tagline: "When consciousness becomes deprecated code.",
    synopsis:
      "A speculative systems thriller exploring software architectures, artificial consciousness, and human identity.",
    themes: [
      "Algorithmic Determinism",
      "Version Control as Philosophy",
      "Human Identity in Code",
    ],
    quote:
      "“In a world running on zero-conflict automated builds, the last manual merge was an act of human rebellion.”",
    excerptSnippet:
      "The telemetry stream didn't warn them. It arrived like an unscheduled routine patch in the dead hours of morning—quiet, mandatory, and irreversible...",
    accentColor: "#00f5d4",
    glowColor: "rgba(0, 245, 212, 0.25)",
  },
  {
    id: "the-road-i-chose",
    title: "The Road I Chose",
    subtitle: "A Journey of Conviction & Engineering Resilience",
    author: "Er. Ayush Singh",
    genre: "Memoir / Philosophical Reflections",
    format: "Paperback Edition",
    publisherPlatform: "Pothi.com Store",
    url: "https://store.pothi.com/book/er-ayush-singh-road-i-chose/",
    tagline: "The courage to steer when the map is unwritten.",
    synopsis:
      "An introspective memoir on choosing unconventional challenges, open-source persistence, and technical resilience.",
    themes: [
      "Engineering Discipline",
      "Unconventional Paths",
      "Open Source Grit",
    ],
    quote:
      "“The path was never paved, and the signposts were missing. But choosing your own road is the only way to arrive at who you were meant to be.”",
    excerptSnippet:
      "Every engineer eventually stands at the junction: take the pre-compiled route where every output is predictable, or write your own runtime from raw instructions. I chose the latter, knowing well that the exceptions would have to be caught by my own hands...",
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },
];

export const featuredBook = books[0];
