/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: '#DAA520', // Define a custom gold color
      },
    },
  },
  plugins: [],
}

