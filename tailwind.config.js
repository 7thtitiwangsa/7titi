/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pengakap-green': '#2D5016',
        'pengakap-blue': '#1e40af',
        'pengakap-gold': '#d97706',
      },
    },
  },
  plugins: [],
}
