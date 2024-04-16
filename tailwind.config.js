/** @type {import('tailwindcss').Config} */

const MAP = "../src/assets/images/maps";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "astralis-city": `url("${MAP}/Astralis_city.jpeg")`,
      },
    },
  },
  plugins: [],
};
