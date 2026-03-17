/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smb: {
          blue: '#0b1136',
          gold: '#b45309'
        }
      }
    },
  },
  plugins: [],
}
