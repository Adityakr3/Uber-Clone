/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'spread': '2px 12px 15px 6px rgba(0, 0, 0, 0.1)', // Add spread value (4px in this case)
      },

    },
  },
  plugins: [],
  
}