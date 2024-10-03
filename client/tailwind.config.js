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
        'light-green': "#f5fff8",
        'cyan': "#00E0B5",
      },
      fontFamily: {
        title: ['Billion Dreams', 'sans-serif'],
        main: ['Nunito', 'sans-serif']
      },
    },
  },
  plugins: [],
}