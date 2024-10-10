/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#634da3',
          light: '#d34eb1',
          dark: '#4a3682',
        },
        secondary: {
          DEFAULT: '#db4437',
          light: '#c23321',
        },
        muted: {
          DEFAULT: '#ffffff40',
          dark: '#ffffff14',
        },
      },
      animation: {
        wave: 'wave 2.5s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(5px)' },
          '75%': { transform: 'translateY(-3px)' },
        },
      },
    },
  },
  plugins: [],
}
