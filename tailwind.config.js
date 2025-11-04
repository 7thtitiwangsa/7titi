/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pengakap: {
          green: '#006747',
          gold: '#FFD700',
          navy: '#003B5C',
        },
      },
    },
  },
  plugins: [],
}
