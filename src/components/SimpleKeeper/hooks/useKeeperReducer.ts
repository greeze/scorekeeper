import type { KeeperState } from 'components/SimpleKeeper/types'
import type { PlayerData } from 'components/SimpleKeeper/Player/types'
import type { KeeperAction } from 'components/SimpleKeeper/hooks/types'
import { useReducer } from 'react'

const createPlayers = (num: number): PlayerData[] => {
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

export const useKeeperReducer = () => {
  const reducer = (keeperState: KeeperState, action: KeeperAction): KeeperState => {
    switch (action.type) {
      case 'add_player': {
        const { players } = keeperState
        return {
          ...keeperState,
          players: [
            ...players,
            {
              id: players.length + 1,
              name: `Player ${players.length + 1}`,
              score: 0,
            },
          ],
        }
      }

      case 'remove_player': {
        const { players } = keeperState
        return {
          ...keeperState,
          players: players.slice(0, -1),
        }
      }

      case 'update_player': {
        const players = [...keeperState.players]
        const data = action.payload
        const index = players.findIndex(({ id }) => id === data.id)
        players[index] = { ...players[index], ...data }
        return {
          ...keeperState,
          players,
        }
      }

      case 'update_state': {
        return action.payload
      }

      default: {
        return keeperState
      }
    }
  }

  return useReducer(reducer, { players: createPlayers(2) })
}
