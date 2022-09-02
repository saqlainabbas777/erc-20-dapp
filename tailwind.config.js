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
    minHeight: {
      '1/2': '50%',
      '3/4': '80%',
      '80': '80vh',
    },
    colors: {
      lightGold: '#b09a40',
      gradBlue: '#07242F',
      whiteOpa90: 'rgba(255,255,255,0.90)',
      white: '#FFFFFF',
      bgCard: '#0f303d',
      darkRed: '#8B0000FF',
      red: '#FF0000FF',
      greyShade: '#627f89',
    },
    fontFamily: {
      josefinSans: ['"Josefin Sans"', 'serif']
    },
    extend: {},
  },
  plugins: [],
}
