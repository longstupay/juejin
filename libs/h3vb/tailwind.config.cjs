const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, 'src/**/*.{vue,js,ts,jsx,tsx}'),
    // './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00d1b2',
        },
        danger: {
          DEFAULT: '#ff3860',
        },
        warning: {
          DEFAULT: '#ffdd57',
        },
      },
    },
  },
  plugins: [],
};
