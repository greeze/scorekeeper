import { useCallback } from 'react'

interface PlayerData {
  name: string
  score: number
}

export const initialPlayers: PlayerData[] = [
  { name: 'Player 1', score: 0 },
  { name: 'Player 2', score: 0 },
]

export const useAddPlayer = (setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>) => {
  return useCallback(() => {
    setPlayers((players) => [
      ...players,
      {
        name: `Player ${players.length + 1}`,
        score: 0,
      },
    ])
  }, [setPlayers])
}

export const useRemovePlayer = (setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>) => {
  return useCallback(() => {
    setPlayers((players) => players.slice(0, -1))
  }, [setPlayers])
}

export const useIncrementPlayerScore = (setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>) => {
  return useCallback(
    (playerIndex: number) => {
      setPlayers((players) => {
        return players.map((player, index) => {
          return index === playerIndex
            ? {
                ...player,
                score: player.score + 1,
              }
            : player
        })
      })
    },
    [setPlayers],
  )
}

export const useDecrementPlayerScore = (setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>) => {
  return useCallback(
    (playerIndex: number) => {
      setPlayers((players) => {
        return players.map((player, index) => {
          return index === playerIndex
            ? {
                ...player,
                score: player.score - 1,
              }
            : player
        })
      })
    },
    [setPlayers],
  )
}
