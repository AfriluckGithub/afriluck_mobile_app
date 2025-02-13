/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/preline/dist/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        bg: {
          default: "#F8F8F8",
          white: "#FFFFFF",
          tertiary: "#FCFCFC",
        },
        border: {
          primary: "#D4EEEF",
          default: "#EEEFF3",
        },
        primary: "#156064",
        secondary: "#DEF1F5",
        tertiary: "#EF5500",
        red: "#FF0000",
        danger: "#FFEFEF",
        text: {
          black: "#000000",
          white: "#FFFFFF",
          muted: "#8C8C8C",
        },
      },
    },
  },

  plugins: [require("preline/plugin"), require("daisyui")],
};
