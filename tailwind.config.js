/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
      },
      colors: {
        primary: '#531800',
        secondary: '#b0784c',
      },
    },
  },
  plugins: [],
}

