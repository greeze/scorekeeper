import type { KeeperState } from './types'
import type { PlayerData } from './Player/types'

import { useMemo, useReducer } from 'react'

type KeeperAction = { type: 'add_player' } | { type: 'remove_player' } | { type: 'update_player'; payload: PlayerData }

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

export const useKeeperActions = (dispatch: React.Dispatch<KeeperAction>) => {
  return useMemo(
    () => ({
      addPlayer: () => dispatch({ type: 'add_player' }),
      removePlayer: () => dispatch({ type: 'remove_player' }),
      updatePlayer: (data: PlayerData) => dispatch({ type: 'update_player', payload: data }),
    }),
    [dispatch],
  )
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

      default: {
        return keeperState
      }
    }
  }

  return useReducer(reducer, { players: createPlayers(2) })
}
