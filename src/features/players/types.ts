import { getRandomInteger } from 'common/utils/getRandomInteger'
import { getRandomWords } from 'common/utils/getRandomString'

export interface PlayerData {
  id: number
  name: string
  score: number
}

export type PlayerUpdatePayload = Partial<PlayerData> & { id: number }

export interface PlayerScoreIncrementPayload {
  id: PlayerData['id']
  increment: number
}

export interface PlayersState {
  increment: number
  players: PlayerData[]
}

// ============================================================================
// MOCKS
// ============================================================================
export function mockPlayerData(overrides: Partial<PlayerData> = {}): PlayerData {
  return {
    id: getRandomInteger(1, 100),
    name: getRandomWords(2, true, 8),
    score: getRandomInteger(1, 100),
    ...overrides,
  }
}

export function mockPlayersState(overrides: Partial<PlayersState> = {}, numPlayers = 3): PlayersState {
  const players = []
  for (let i = 0; i < numPlayers; i++) {
    players.push(mockPlayerData())
  }

  return {
    increment: 10,
    players,
    ...overrides,
  }
}
