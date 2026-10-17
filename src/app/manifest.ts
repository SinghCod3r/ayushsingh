import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayush Singh (SinghCod3r) — Computer Science Engineer & Systems Architect",
    short_name: "SinghCod3r",
    description:
      "Official portfolio of Ayush Singh (SinghCod3r). Core contributor in Linux OpenPrinting, TCS Digital candidate, Acxion Consulting consultant, systems builder.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090c",
    theme_color: "#00f5d4",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

