/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow': '#F9EC00',
        'green': "#33E800",
        'cyan': "#00FFCE",
      },
    },
  },
  plugins: [],
}