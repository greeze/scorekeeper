const screenSizes = ['', 'sm:', 'md:', 'lg:', 'xl:']
const colClasses = []
for (let i = 1; i <= 12; i++) {
  screenSizes.forEach((size) => {
    colClasses.push(`${size}grid-cols-${i}`)
  })
}

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [...colClasses],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
