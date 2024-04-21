/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmerBuffDef: {
          "0%": {
            "background-color": "rgba(107, 114, 128, 1)", // gray-500
          },
          "50%": {
            "background-color": "rgba(63, 63, 70, 1)", // gray-900
          },
          "100%": {
            "background-color": "rgba(107, 114, 128, 1)", // gray-500
          },
        },
        shimmerStun: {
          "0%": {
            "background-color": "#9550A6",
          },
          "50%": {
            "background-color": "#C37AC1",
          },
          "100%": {
            "background-color": "#9550A6",
          },
        },
      },
      animation: {
        shimmerBuffDef: "shimmerBuffDef 4s infinite",
        shimmerStun: "shimmerStun 4s infinite",
      },
    },
  },
  plugins: [],
};
