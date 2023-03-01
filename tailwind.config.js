const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs}",
  "./Views/**/*.{html,js,ejs}"
],
  theme: {
    fontFamily: {
      'Roboto': 'Roboto',
      'Special': '"Special Elite"',
      'Press': '"Press Start 2P"',
      'Merri': 'Merriweather',
      'Inter': 'Inter',
    },
    extend: {
      animation: {
        'fadein': 'fade 1s ease-in-out forwards',
      },
      keyframes: {
        fade: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'none', opacity: '1' }
        }
      }
  },
},
  plugins: [],
}
