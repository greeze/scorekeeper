import type { PlayerData } from 'features/players'

import { useMemo } from 'react'

export const useColumns = (players: PlayerData[]) => {
  return useMemo(() => {
    const min = (n: number) => Math.min(n, players.length)
    return { xs: min(1), sm: min(2), md: min(3), lg: min(4) }
  }, [players.length])
}
