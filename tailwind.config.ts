import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    backgroundImage: {
      "header-bg": "url('/assets/blog/posts/test3.png')",
    },
    screens: {
      sm: "375px",
      md: "870px",
      lg: "1280px",
      pcHover: {
        raw: "(hover: hover) and (pointer: fine)",
      },
    },
    backgroundSize: {
      contain: "contain",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        yellow: {
          DEFAULT: "hsl(42.2, 78.6%, 57.3%)",
        },
        deepYellow: {
          DEFAULT: "#D1A02C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        cardFront: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        cardBack: {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(540deg)" },
        },
        changeScale: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fadeUp .5s ease-in-out",
        "fade-down": "fadeDown .5s ease-in-out",
        "card-front": "cardFront 2s 1 linear",
        "card-back": "cardBack 2s 1 linear",
        "change-scale": "changeScale 2s 1 cubic-bezier(0.25, 0.1, 0.25, 1.0)",
      },
      fontFamily: {
        KCC: ["KCC"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
