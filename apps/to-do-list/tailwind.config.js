/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          "c1":"#2C43DD",
          "c2":"#2B1887",
          "c3":"#D5CCFF",
          "c4":"#F4F2FF",
          "c5":"#333552",
          "c6":"#0096ff"
      }
    },
  },
  plugins: [],
}
