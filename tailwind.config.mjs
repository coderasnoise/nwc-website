/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,ts}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fbfaf6',
        paper: '#f1eee6',
        ink: '#1a1d24',
        muted: '#575a62',
        line: '#d9d4c7',
        navy: { DEFAULT: '#14243b', 700: '#1d3556', 100: '#e8edf5' },
        clay: '#7a4a2e',
        wa: '#1f6b47',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.03em' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
};
