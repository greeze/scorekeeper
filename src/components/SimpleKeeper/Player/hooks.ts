import type { PlayerData } from 'features/players'

import { useCallback } from 'react'
import { useAppDispatch } from 'common/hooks'
import { useActions } from 'features/players'

export const useHandleRenamePlayer = (player: PlayerData) => {
  const dispatch = useAppDispatch()
  const playersActions = useActions(dispatch)

  return useCallback(
    (name: string) => {
      playersActions.changeName({
        id: player.id,
        name,
      })
    },
    [player.id, playersActions],
  )
}

export const useHandleAddScore = (player: PlayerData) => {
  const dispatch = useAppDispatch()
  const playersActions = useActions(dispatch)
  return useCallback(
    (amt: number) => {
      playersActions.incrementScore({
        id: player.id,
        increment: amt,
      })
    },
    [player.id, playersActions],
  )
}
