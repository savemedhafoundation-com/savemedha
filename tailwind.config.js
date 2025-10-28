/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif','Open Sans'],
        poppins: ['Poppins', 'sans-serif'],       
        source: ['"Source Sans 3"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}