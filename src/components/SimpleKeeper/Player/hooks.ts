import type { FocusEvent, KeyboardEvent } from 'react'
import type { PlayerData } from './types'

import { useCallback, useMemo } from 'react'

export const useHandleFocus = () =>
  useCallback((e: FocusEvent) => {
    window.getSelection()?.selectAllChildren(e.target)
  }, [])

export const useHandleEnterKey = () =>
  useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLDivElement
      target.blur()
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])

export const useHandleBlur = (rename: (name: string) => void) =>
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
