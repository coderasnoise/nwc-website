/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,ts}'],
  theme: {
    extend: {
      colors: {
        ivory: '#faf7f2',
        paper: '#f3eee6',
        ink: '#1a1d24',
        muted: '#5d6068',
        line: '#ddd5c8',
        navy: { DEFAULT: '#14243b', 700: '#1d3556', 100: '#e8edf5' },
        clay: '#8c6e52',
        wa: '#1f6b47',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.03em' },
    },
  },
};
