export const titleCase = (str: string) => {
  const words = str.split(' ')
  return words.map(capitalizeFirst).join(' ')
}

export const capitalizeFirst = (word: string) => {
  const [first, ...rest] = word
  return `${first.toUpperCase()}${rest.join('')}`
}
