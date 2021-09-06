import type { KeeperState, PlayerData } from './types'
import type { FocusEvent, KeyboardEvent } from 'react'

import { useCallback, useMemo, useReducer } from 'react'

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

export const useHandleEnterKey = () =>
  useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLDivElement
      target.blur()
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])

export const useHandleNameChange = (rename: (name: string) => void) =>
  useCallback(
    (e: FocusEvent) => {
      const { textContent } = e.target as HTMLDivElement
      if (textContent) {
        rename(textContent)
      }
    },
    [rename],
  )

export const usePlayerActions = (player: PlayerData, onChange: (data: PlayerData) => void) => {
  const rename = useCallback(
    (name: string) => {
      onChange({ ...player, name })
    },
    [onChange, player],
  )
  const updateScore = useCallback(
    (amt: number) => {
      onChange({ ...player, score: player.score + amt })
    },
    [onChange, player],
  )
  const decrement = useCallback(() => updateScore(-1), [updateScore])
  const increment = useCallback(() => updateScore(1), [updateScore])

  return useMemo(() => ({ decrement, increment, rename }), [decrement, increment, rename])
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
