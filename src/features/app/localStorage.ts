import type { RootState } from './store'
import { constants } from './constants'

interface StoredGame {
  createdAt: number
  updatedAt: number
  data: RootState
}

type StoredGames = Record<string, StoredGame>

export const getPreloadedState = () => {
  const gameName = new URLSearchParams(window?.location?.search).get(constants.GAME_NAME_QUERY_PARAM)
  let preloadedState = {}
  if (gameName) {
    try {
      const persistedJson = localStorage.getItem(constants.APP_NAME)
      if (persistedJson) {
        const persistedGames: StoredGames = JSON.parse(persistedJson)
        const persistedGame: StoredGame['data'] = persistedGames[gameName]?.data
        preloadedState = persistedGame || preloadedState
      }
    } catch (e) {
      console.error(e)
    }
  }
  return preloadedState
}

export const saveState = async (state: RootState) => {
  const gameName = state.game.name
  if (gameName) {
    try {
      const persistedGamesJson = localStorage.getItem(constants.APP_NAME)
      const persistedGames: StoredGames = persistedGamesJson ? JSON.parse(persistedGamesJson) : {}
      const persistedGame = persistedGames[gameName] || {
        createdAt: new Date().getTime(),
      }
      persistedGame.updatedAt = new Date().getTime()
      persistedGame.data = state
      persistedGames[gameName] = persistedGame
      if (Object.keys(persistedGames).length > 100) {
        const sortedGames = Object.values(persistedGames).sort((a, b) => a.updatedAt - b.updatedAt)
        const earliestGame = sortedGames[0]
        const earliestGameName = earliestGame.data.game.name
        console.group('Too many stored games. Deleting the oldest game:', earliestGameName)
        console.table(earliestGame.data.players.players, ['name', 'score'])
        console.groupEnd()
        delete persistedGames[earliestGameName]
      }
      localStorage.setItem('simplekeeper', JSON.stringify(persistedGames))
    } catch (e) {
      console.error(e)
    }
  }
}
