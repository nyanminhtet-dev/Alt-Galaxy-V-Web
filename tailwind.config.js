const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        yg: {
          bg: '#07070b',
          surface: '#11111a',
          elevated: '#181823',
          border: '#2a2937',
          text: '#f6f4ff',
          muted: '#aaa5ba',
          purple: {
            50: '#f5f1ff',
            100: '#ebe3ff',
            200: '#d9c8ff',
            300: '#bd9cff',
            400: '#9c68ff',
            500: '#7c3cff',
            600: '#6425e8',
            700: '#501abd',
            800: '#3e168f',
            900: '#2d1168',
          },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 18px rgba(124, 60, 255, 0.18)',
        glow: '0 0 32px rgba(124, 60, 255, 0.24)',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
