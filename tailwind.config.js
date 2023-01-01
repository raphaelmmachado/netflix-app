/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      red: "#B9090B",
      black: "#141414",
      gray: "#808080",
      midgray: "#6D6D6E",
      smokewt: "#E5E5E5",
      white: "#FFFFFF",
      def_red: colors.red,
      def_black: colors.black,
      def_gray: colors.gray,
      def_white: colors.white,
      zinc: colors.zinc,
      stone: colors.stone,
      neutral: colors.neutral,
    },
    extend: {},
  },
  plugins: [],
};
