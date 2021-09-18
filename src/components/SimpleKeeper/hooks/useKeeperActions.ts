import type { KeeperAction } from './types'
import type { PlayerData } from '../Player/types'
import { useMemo } from 'react'

export const useKeeperActions = (dispatch: React.Dispatch<KeeperAction>) => {
  return useMemo(
    () => ({
      addPlayer: () => {
        dispatch({ type: 'add_player' })
      },
      removePlayer: () => dispatch({ type: 'remove_player' }),
      updatePlayer: (data: PlayerData) => dispatch({ type: 'update_player', payload: data }),
    }),
    [dispatch],
  )
}
