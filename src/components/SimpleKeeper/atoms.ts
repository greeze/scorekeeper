import { useCallback } from 'react'
import { atom, SetterOrUpdater } from 'recoil'

interface PlayerData {
  name: string
  score: number
}

const initialPlayers: PlayerData[] = [
  { name: 'Player 1', score: 0 },
  { name: 'Player 2', score: 0 },
]

export const playerListState = atom<PlayerData[]>({
  key: 'playerListState',
  default: [...initialPlayers],
})

export const useAddPlayer = (setPlayers: SetterOrUpdater<PlayerData[]>) => {
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

export const useRemovePlayer = (setPlayers: SetterOrUpdater<PlayerData[]>) => {
  return useCallback(() => {
    setPlayers((players) => players.slice(0, -1))
  }, [setPlayers])
}

export const useIncrementPlayerScore = (setPlayers: SetterOrUpdater<PlayerData[]>) => {
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

export const useDecrementPlayerScore = (setPlayers: SetterOrUpdater<PlayerData[]>) => {
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
