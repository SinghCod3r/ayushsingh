/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./data.ts"
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080a",
        surface: "#101114",
        "surface-card": "#141519",
        "surface-border": "#22252d",
        primary: "#F2F0E8",
        muted: "#8A8A8A",
        accent: {
          amber: "#f59e0b",
          orange: "#ff5e1a",
          cyan: "#38bdf8",
          emerald: "#10b981",
          yellow: "#F5D52F",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Syne", "Clash Display", "Inter", "sans-serif"],
        editorial: ["Bebas Neue", "Anton", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
        condensed: "0.02em",
      },
    },
  },
  plugins: [],
}
