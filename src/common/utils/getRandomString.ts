const vowels = 'aeiou'
const consonants = 'bcdfghjklmnpqrstvwxyz'

const getCharacter = (characters: string) => characters.charAt(Math.floor(Math.random() * characters.length))

export const getRandomString = (length = 8) => {
  let result = ''
  let getConsonant = true
  for (let i = 0; i < length; i++) {
    result += getConsonant ? getCharacter(consonants) : getCharacter(vowels)
    getConsonant = !getConsonant
  }
  return result
}
