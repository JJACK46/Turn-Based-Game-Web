/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmerOverDef: {
          "0%": {
            "background-color": "rgba(107, 114, 128, 1)",
          },
          "50%": {
            "background-color": "rgba(63, 63, 70, 1)",
          },
          "100%": {
            "background-color": "rgba(107, 114, 128, 1)",
          },
        },
        shimmerStun: {
          "0%": {
            "background-color": "#9550A6",
          },
          "50%": {
            "background-color": "#E0AAE4",
          },
          "100%": {
            "background-color": "#9550A6",
          },
        },
        shimmerPoison: {
          "0%": {
            "background-color": "#14452F",
          },
          "50%": {
            "background-color": "#0A5C36",
          },
          "100%": {
            "background-color": "#14452F",
          },
        },
        shimmerOverHealth: {
          "0%": {
            "background-color": "#940000",
          },
          "50%": {
            "background-color": "#c30101",
          },
          "100%": {
            "background-color": "#940000",
          },
        },
        shimmerFreeze: {
          "0%": {
            "background-color": "#88bcdd",
          },
          "50%": {
            "background-color": "#eeeeee",
          },
          "100%": {
            "background-color": "#88bcdd",
          },
        },
        shimmerOverATK: {
          "0%": {
            "background-color": "#525252",
          },
          "50%": {
            "background-color": "#e8e8e8",
          },
          "100%": {
            "background-color": "#525252",
          },
        },
      },
      animation: {
        shimmerOverDef: "shimmerOverDef 4s infinite",
        shimmerStun: "shimmerStun 4s infinite",
        shimmerPoison: "shimmerPoison 4s infinite",
        shimmerOverHealth: "shimmerOverHealth 4s infinite",
        shimmerFreeze: "shimmerFreeze 4s infinite",
        shimmerOverATK: "shimmerOverATK 4s infinite",
      },
    },
  },
};
