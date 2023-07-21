/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFF6E8',
          200: '#FFE1B5',
          300: '#FFCD82',
          400: '#FFB94F',
          500: '#FBAB34',
          600: '#E09422',
          700: '#AD721A',
          800: '#7A4E0C',
          900: '#472C04',
        },
        secondary: {
          100: '#F6F6F6',
          200: '#F4F3F8',
          300: '#E0DEEA',
          400: '#ACABB7',
          500: '#8C8A97',
          600: '#716F7A',
          700: '#5F5C6B',
          800: '#4E4B59',
          900: '#33303E',
        },
        tertiary: {
          100: '#E8FAF1',
          200: '#D1F6E3',
          300: '#A4EDC6',
          400: '#8DE8B8',
          500: '#1BD171',
          600: '#18B863',
          700: '#149E55',
          800: '#0E6B3A',
          900: '#07381E',
        },
        quartenary: {
          100: '#FFF2F3',
          200: '#FFCFD0',
          300: '#FF9497',
          400: '#FA7D80',
          500: '#EC3237',
          600: '#D42D31',
          700: '#A12226',
          800: '#6E171A',
          900: '#3B0C0E',
        },
        text: {
          'base': '#5D6670',
        }
      }
    },
  },
  plugins: [],
}
