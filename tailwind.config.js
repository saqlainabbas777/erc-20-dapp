/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '300px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      lightGold: '#b09a40',
      gradBlue: '#07242F',
      whiteOpa90: 'rgba(255,255,255,0.90)',
      bgCard: '#0f303d',
      darkRed: '#8B0000FF',
      red: '#FF0000FF'
    },
    fontFamily: {
      josefinSans: ['"Josefin Sans"', 'serif']
    },
    extend: {},
  },
  plugins: [],
}
