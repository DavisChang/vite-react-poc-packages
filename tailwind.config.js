/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const brandColor = colors.sky;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        brand: brandColor,

        // light theme
        light: {
          background: "#ffffff",
          text: "#000000",
        },

        // dark theme
        dark: {
          background: "#333333",
          text: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
