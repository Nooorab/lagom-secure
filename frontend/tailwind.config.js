/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#070B14',
        card: 'rgba(17, 24, 39, 0.6)',
        primary: '#38bdf8',
        accent: '#2dd4bf'
      }
    },
  },
  plugins: [],
}
