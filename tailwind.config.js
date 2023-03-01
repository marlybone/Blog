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
      keyframes: {
        fadein: {
          
        }
      }
  },
},
  plugins: [],
}
