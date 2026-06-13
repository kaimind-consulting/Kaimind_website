/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./v2/index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Caffie Lofie"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        code: ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        kblack: "#000000",
        kgreen: "#4CAE7E",
        kblue: "#1F2AA5",
        ksystem: "#465DA9",
        kpurple: "#635DC2",
        kturquoise: "#7FD7C3",
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
        purple: {
          200: "#E9D5FF",
          600: "#9333EA",
          900: "#581C87",
        },
      },
    },
  },

}