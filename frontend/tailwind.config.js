/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ".index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "corporate",
      "synthwave",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "night",
      "winter",
    ],
    darkTheme: 'dracula',
  },
}

