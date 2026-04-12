/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, 
  },
  theme: {
    extend: {
      fontFamily: {
        'crimson': ['"Crimson Pro"', 'serif'],
        'forum': ['Forum', 'cursive'],
      }
    },
  },
  plugins: [],
}