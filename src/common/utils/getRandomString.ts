import { titleCase } from 'common/utils/capitalizeString'
import { getRandomInteger } from 'common/utils/getRandomInteger'

const vowels = 'aeiou'
const consonants = 'bcdfghjklmnpqrstvwxyz'

const getCharacter = (characters: string) => characters.charAt(getRandomInteger(0, characters.length))

export const getRandomString = (length = 8) => {
  let result = ''
  let getConsonant = true
  for (let i = 0; i < length; i++) {
    result += getConsonant ? getCharacter(consonants) : getCharacter(vowels)
    getConsonant = !getConsonant
  }
  return result
}

export const getRandomWords = (num = 2, capitalize = true, length?: number) => {
  let result = ''
  for (let i = 0; i < num; i++) {
    result += i > 0 ? ` ${getRandomString(length)}` : getRandomString(length)
  }
  return capitalize ? titleCase(result) : result
}
