/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const brandColor = colors.sky;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: brandColor,
      },
    },
  },
  plugins: [],
};
