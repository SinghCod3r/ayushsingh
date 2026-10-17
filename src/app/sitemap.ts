import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://singhcod3r.vercel.app";
  const lastModified = new Date();

  const sections = [
    "",
    "#hero",
    "#open-source",
    "#architecture",
    "#projects",
    "#tech-stack",
    "#writing-books",
    "#speaking",
    "#experience",
    "#about",
    "#contact",
  ];

  const sectionEntries: MetadataRoute.Sitemap = sections.map((sec) => ({
    url: `${baseUrl}/${sec}`,
    lastModified,
    changeFrequency: sec === "" ? "daily" : "weekly",
    priority: sec === "" ? 1.0 : sec === "#open-source" || sec === "#projects" || sec === "#experience" ? 0.95 : 0.85,
    alternates: {
      languages: {
        en: `${baseUrl}/${sec}`,
      },
    },
  }));

  const resumeEntry: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/Ayush_Singh_Resume.pdf`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  };

  return [...sectionEntries, resumeEntry];
}
