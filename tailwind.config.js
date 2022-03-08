module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        worksans: "'Work Sans','sans-serif'",
        poppins: "'Poppins', 'sans-serif'"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
