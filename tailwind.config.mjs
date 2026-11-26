/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,ts}'],
  theme: {
    extend: {
      colors: { navy: { DEFAULT: '#0b1f3a', 700: '#14315c', 100: '#e8edf5' }, sand: '#f7f4ef' },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
};
