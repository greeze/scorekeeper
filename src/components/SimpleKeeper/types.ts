import type { PlayerData } from 'features/players'
import { mockPlayerData } from 'features/players'

export interface KeeperState {
  players: PlayerData[]
}

// ============================================================================
// MOCKS
// ============================================================================
export function mockPlayers(num: number): PlayerData[] {
  const players = []
  for (let i = 1; i <= num; i++) {
    players.push(
      mockPlayerData({
        id: i,
        name: `Player ${i}`,
        score: i * 10,
      }),
    )
  }
  return players
}

export function mockKeeperState(overrides: Partial<KeeperState> = {}): KeeperState {
  return {
    players: mockPlayers(5),
    ...overrides,
  }
}
