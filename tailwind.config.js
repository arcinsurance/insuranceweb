module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2563EB',
        'brand-orange': '#F97316',
        'brand-green': '#16A34A',
        'brand-dark': '#111827',
        'brand-light': '#F9FAFB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  },
  plugins: [],
}
