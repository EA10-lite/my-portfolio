/** @type {import('tailwindcss').Config} */
export default {
  // Configure the template paths so Tailwind can tree‑shake unused styles.
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom background color to match the existing dark theme.
        'portfolio-bg': '#05061a',
        primary: '#05061a',
        white: "#fdfdfd",
        grey: "#9999a1",
      },
      fontFamily: {
        // Custom font families for different RethinkSans weights
        'sans-regular': ['"Sans Regular"', 'sans-serif'],
        'sans-medium': ['"Sans Medium"', 'sans-serif'],
        'sans-semibold': ['"Sans SemiBold"', 'sans-serif'],
        'sans-bold': ['"Sans Bold"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


