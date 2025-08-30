/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "border-blue-500",
    "border-orange-500",
    "border-green-500",
    "bg-blue-100",
    "bg-orange-100",
    "bg-green-100",
    "text-blue-600",
    "text-orange-500",
    "text-green-600",
    "hover:shadow-blue-200"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
