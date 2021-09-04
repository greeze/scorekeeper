module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss')('./config/.tailwindrc.js'), require('autoprefixer')],
    },
  },
}
