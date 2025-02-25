import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ["var(--font-audiowide)"],
        rajdhani: ["var(--font-rajdhani)"],
        archivoBlack: ["var(--font-archivoBlack)"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: "var(--color-dark)",
        foreground: "var(--color-bright)",
        primary: "var(--color-active)",
        secondary: "var(--color-active-2)",
      }
    },
  },
  plugins: [],
}
export default config
