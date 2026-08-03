import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          cream: "#f4ede2",
          bone: "#eae2d4",
          fog: "#d9d2c4",
          ink: "#1b1a17",
          gold: "#b89664",
          botanical: "#4a5c3e",
          citrus: "#e8934a",
          glass: "#c7d9d1",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.22em",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulseSoft: "pulseSoft 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
