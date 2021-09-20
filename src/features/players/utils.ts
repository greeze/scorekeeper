import { PlayerData } from 'features/players/types'

export const createPlayers = (num = 2): PlayerData[] => {
  const players = []
  for (let i = 1; i <= num; i++) {
    players.push({
      id: i,
      name: `Player ${i}`,
      score: 0,
    })
  }
  return players
}
