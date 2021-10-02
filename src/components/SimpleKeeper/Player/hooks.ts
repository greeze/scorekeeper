import type { PlayerData } from 'features/players'

import { useCallback } from 'react'

export const useHandleRename = (player: PlayerData, onChange: (data: PlayerData) => void) =>
  useCallback(
    (name: string) => {
      onChange({ ...player, name })
    },
    [onChange, player],
  )

export const useHandleAddScore = (player: PlayerData, onChange: (data: PlayerData) => void) =>
  useCallback(
    (amt: number) => {
      onChange({ ...player, score: player.score + amt })
    },
    [onChange, player],
  )
