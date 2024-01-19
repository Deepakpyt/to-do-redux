/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        blue: '0 4px 6px -1px rgba(66, 153, 225, 0.8), 0 2px 4px -1px rgba(66, 153, 225, 0.06)',
      },
    },
  },
  plugins: [],
}
