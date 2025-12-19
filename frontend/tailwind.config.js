/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
          blue: "#60a5fa",
          purple: "#8b5cf6",
          green: "#10b981",
          orange: "#f97316",
          pink: "#ec4899",
          indigo: "#6366f1",
          cyan: "#06b6d4",
          amber: "#f59e0b",
          red: "#ef4444",
          teal: "#14b8a6",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom glassmorphic colors
        'bg-primary': '#111827',
        'bg-secondary': '#1f2937',
        'bg-tertiary': '#374151',
        'glass-white': 'rgba(255, 255, 255, 0.01)',
        'glass-white-md': 'rgba(255, 255, 255, 0.02)',
        'glass-white-lg': 'rgba(255, 255, 255, 0.04)',
        'glass-white-xl': 'rgba(255, 255, 255, 0.06)',
        'glass-border': 'rgba(3, 1, 1, 0.08)',
        'glass-border-hover': 'rgba(255, 255, 255, 0.15)',
        'glass-border-strong': 'rgba(255, 255, 255, 0.2)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

