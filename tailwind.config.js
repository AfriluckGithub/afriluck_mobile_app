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
        primary: "#156064",
        secondary: "#DEF1F5",
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
