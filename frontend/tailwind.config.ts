import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      maxWidth: {
        '4xl': '56rem',
      },
      fontSize: {
        '4xl': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
