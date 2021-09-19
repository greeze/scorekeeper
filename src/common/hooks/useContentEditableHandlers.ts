import type { FocusEvent, KeyboardEvent } from 'react'

import { useCallback } from 'react'

export const useContentEditableHandlers = (onChange: (text: string) => void) => {
  const handleFocus = useCallback((e: FocusEvent) => {
    // Needs to be inside `requestAnimationFrame` because Safari.
    requestAnimationFrame(() => window.getSelection()?.selectAllChildren(e.target))
  }, [])

  const handleBlur = useCallback(
    (e: FocusEvent) => {
      const { textContent } = e.target as HTMLDivElement
      if (textContent) {
        onChange(textContent)
      }
    },
    [onChange],
  )

  const handleEnterKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLDivElement
      target.blur()
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])

  return { handleBlur, handleFocus, handleKeyDown: handleEnterKey, handleKeyUp: handleEnterKey }
}
