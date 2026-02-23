/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sentiment: {
          positive: "#34d399",
          negative: "#fb7185",
          neutral: "#94a3b8",
        },
        dark: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
        },
      },
    },
  },
  plugins: [],
};
