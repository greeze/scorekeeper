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
    safelist: [
      ...colClasses,
      'text-gray-500',
      'text-red-500',
      'text-yellow-500',
      'text-green-500',
      'text-blue-500',
      'text-indigo-500',
      'text-purple-500',
      'text-pink-500',
    ],
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
