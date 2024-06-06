/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow': '#FFD500',
        'green': "#31E528",
        'cyan': "#00E0B5",
      },
    },
  },
  plugins: [],
}