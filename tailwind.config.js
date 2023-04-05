/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-color": "#444444",
        "green-color": "#009933",
        "overlay-color": "rgba(0, 0, 0, 0.4)",
      }
    },
  },
  plugins: [],
}

