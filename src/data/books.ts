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
      "A high-concept speculative fiction exploring the blurred frontier between software architectures, artificial consciousness, and societal synchronization. When human perception itself is treated as a routine build pipeline, maintaining an unmerged identity becomes an act of existential defiance.",
    themes: [
      "Algorithmic Determinism vs. Human Free Will",
      "Version Control as Existential Philosophy",
      "The Fragility of Biological Identity",
      "Systemic Optimization at the Cost of Consciousness",
    ],
    quote:
      "“In a world running on zero-conflict automated builds, the last manual merge was an act of human rebellion.”",
    excerptSnippet:
      "The telemetry stream didn't warn them. It arrived like an unscheduled routine patch in the dead hours of morning—quiet, mandatory, and irreversible. By the time the sensory latency cleared, the world outside was no longer running on biological consensus...",
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
      "A candid, introspective retrospective on choosing unconventional challenges over standard academic expectations. Chronicling the journey through open-source persistence, systems engineering, and the mental grit required to carve out an authentic identity against the current.",
    themes: [
      "Navigating Uncertainty with Engineering Discipline",
      "Choosing Unconventional Paths in Technology",
      "Open Source Grit & Self-Taught Persistence",
      "Self-Determination Beyond Prescribed Standards",
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
