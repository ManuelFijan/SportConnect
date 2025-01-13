/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: '#DAA520', // Define a custom gold color
        bronze: '#cd7f32'
      },
      screens: {
        'xs': '450px', // Dodaj custom breakpoint za uređaje do 480px
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}