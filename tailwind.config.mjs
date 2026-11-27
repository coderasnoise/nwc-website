/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,ts}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f8f5ef',
        paper: '#efe9de',
        ink: '#1a1d24',
        muted: '#5d6068',
        line: '#dcd3c4',
        navy: { DEFAULT: '#14243b', 700: '#1d3556', 100: '#e8edf5' },
        clay: '#8a5a3c',
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
