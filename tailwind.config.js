/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ['"Open Sans"', 'Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        source: ['"Source Sans 3"', 'sans-serif'],
        open: ['"Open Sans"'],
        koho: ['"KoHo"', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
        shippori: ['"Shippori Antique B1"', 'sans-serif'],
        kalam: ['"Kalam"', 'sans-serif'],
        roboto: ['"Roboto Condensed"', 'sans-serif'],
        montagu: ['"Montagu Slab"', 'serif'],
        oldstandard: ['"Old Standard TT"', 'serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
