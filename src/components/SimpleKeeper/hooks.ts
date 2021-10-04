import type { PlayerData } from 'features/players'

import { useCallback, useMemo } from 'react'
import { useAppDispatch } from 'common/hooks'
import { useActions as useGameActions } from 'features/game'

export const useColumns = (players: PlayerData[]) => {
  return useMemo(() => {
    const min = (n: number) => Math.min(n, players.length)
    return { xs: min(1), sm: min(2), md: min(3), lg: min(4) }
  }, [players.length])
}

export const useHandleRenameGame = () => {
  const dispatch = useAppDispatch()
  const gameActions = useGameActions(dispatch)
  return useCallback(
    (newName: string) => {
      gameActions.changeName(newName.toLowerCase())
    },
    [gameActions],
  )
}
