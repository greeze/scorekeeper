import type { PlayerData } from './types'

import { useCallback, useMemo } from 'react'

export const usePlayerActions = (player: PlayerData, onChange: (data: PlayerData) => void) => {
  const rename = useCallback(
    (name: string) => {
      onChange({ ...player, name })
    },
    [onChange, player],
  )
  const addScore = useCallback(
    (amt: number) => {
      onChange({ ...player, score: player.score + amt })
    },
    [onChange, player],
  )

  return useMemo(() => ({ rename, addScore }), [rename, addScore])
}
