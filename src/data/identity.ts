export interface IdentityData {
  name: string;
  surname: string;
  handle: string;
  title: string;
  subtitle: string;
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  education: {
    degree: string;
    field: string;
    institution: string;
    affiliation: string;
    year: string;
    cgpa: string;
  };
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const identity: IdentityData = {
  name: "Ayush",
  surname: "Singh",
  handle: "SinghCod3r",
  title: "Computer Science Engineer",
  subtitle: "Linux OpenPrinting Contributor · Systems & Full-Stack Builder · AI Developer",
  location: "Lucknow / India (IST, UTC+5:30)",
  status: "Available for engineering roles · 2026",
  email: "ayushsinghceee@gmail.com",
  github: "https://github.com/SinghCod3r",
  linkedin: "https://linkedin.com/in/singhcod3r",
  education: {
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    institution: "Shri Ramswaroop Memorial College of Engineering and Management (SRM-CEM)",
    affiliation: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
    year: "2026",
    cgpa: "8.6",
  },
  metrics: [
    {
      label: "Open Source PRs",
      value: "11+",
      detail: "Merged in Linux system-config-printer",
    },
    {
      label: "Academic CGPA",
      value: "8.6",
      detail: "B.Tech Computer Science (2026)",
    },
    {
      label: "System Layer",
      value: "Linux / CUPS",
      detail: "GTK, GLib, D-Bus, IPP daemon architecture",
    },
    {
      label: "Local AI Tooling",
      value: "53 Tests Passing",
      detail: "SkillFoundry CLI with 0 Pyright errors",
    },
  ],
};
