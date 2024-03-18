/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Quest: ["Questrial", "sans-serif"],
      },
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
