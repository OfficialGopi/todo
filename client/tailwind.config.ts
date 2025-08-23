import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Neutral-based color palette
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        // Accent colors using neutral variations
        accent: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // Success, warning, error using neutral base
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
            filter: "brightness(1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(168, 85, 247, 0.8)",
            filter: "brightness(1.1)",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        // Enhanced glow effects
        "glow-sm": "0 0 10px rgba(168, 85, 247, 0.3)",
        "glow-md": "0 0 20px rgba(168, 85, 247, 0.5)",
        "glow-lg": "0 0 30px rgba(168, 85, 247, 0.7)",
        "glow-xl": "0 0 40px rgba(168, 85, 247, 0.9)",
        "glow-2xl": "0 0 50px rgba(168, 85, 247, 1)",
        // Neutral glows
        "glow-neutral-sm": "0 0 10px rgba(168, 168, 168, 0.3)",
        "glow-neutral-md": "0 0 20px rgba(168, 168, 168, 0.5)",
        "glow-neutral-lg": "0 0 30px rgba(168, 168, 168, 0.7)",
        // Success glows
        "glow-success-sm": "0 0 10px rgba(34, 197, 94, 0.3)",
        "glow-success-md": "0 0 20px rgba(34, 197, 94, 0.5)",
        "glow-success-lg": "0 0 30px rgba(34, 197, 94, 0.7)",
        // Warning glows
        "glow-warning-sm": "0 0 10px rgba(245, 158, 11, 0.3)",
        "glow-warning-md": "0 0 20px rgba(245, 158, 11, 0.5)",
        "glow-warning-lg": "0 0 30px rgba(245, 158, 11, 0.7)",
        // Error glows
        "glow-error-sm": "0 0 10px rgba(239, 68, 68, 0.3)",
        "glow-error-md": "0 0 20px rgba(239, 68, 68, 0.5)",
        "glow-error-lg": "0 0 30px rgba(239, 68, 68, 0.7)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh":
          "linear-gradient(45deg, #0a0a0a 0%, #171717 25%, #262626 50%, #171717 75%, #0a0a0a 100%)",
      },
      transitionProperty: {
        all: "all",
        colors:
          "color, background-color, border-color, text-decoration-color, fill, stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform",
      },
    },
  },
  plugins: [],
} satisfies Config;
