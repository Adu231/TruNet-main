import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Plus Jakarta Sans", "Inter", "ui-sans-serif"],
      },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        brand: {
          blue: "hsl(var(--brand-blue))",
          navy: "hsl(var(--brand-navy))",
          emerald: "hsl(var(--brand-emerald))",
          "blue-light": "hsl(var(--brand-blue-light))",
          "emerald-light": "hsl(var(--brand-emerald-light))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 6px)",
        "2xl": "calc(var(--radius) + 12px)",
      },
      boxShadow: {
        "brand-sm": "0 2px 8px hsl(var(--brand-blue) / 0.15)",
        brand: "0 4px 16px hsl(var(--brand-blue) / 0.2)",
        "brand-lg": "0 8px 32px hsl(var(--brand-blue) / 0.25)",
        "emerald-sm": "0 2px 8px hsl(var(--brand-emerald) / 0.15)",
        card: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.05)",
        "card-hover": "0 4px 6px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-emerald)))",
        "gradient-hero": "linear-gradient(135deg, hsl(222, 84%, 5%) 0%, hsl(221, 70%, 10%) 50%, hsl(222, 60%, 8%) 100%)",
        "gradient-card": "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
