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
        'pengakap-green': '#2D5016',     // Forest green for Pengakap
        'pengakap-blue': '#1e40af',      // Deep blue
        'pengakap-gold': '#d97706',      // Gold accent
      },
    },
  },
  plugins: [],
}
