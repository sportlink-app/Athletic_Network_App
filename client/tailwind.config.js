/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFD500",
        green: "#31E528",
        "light-green": "#f5fff8",
        cyan: "#00E0B5",
        "light-cyan": "#b9fff1",
      },
      fontFamily: {
        main: ["Nunito", "sans-serif"],
        title: ["Bubbleboy", "sans-serif"],
      },
      animation: {
        pulse: "pulse-animation 4s ease-in-out infinite",
        bounce: "bounce-animation 8s ease-in-out infinite",
        show: "show-animation .5s ease-out forwards",
        hide: "hide-animation 1s ease-out forwards",
      },

      keyframes: {
        "pulse-animation": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0", transform: "scale(.2)" },
        },
        "bounce-animation": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
        "show-animation": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "hide-animation": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
