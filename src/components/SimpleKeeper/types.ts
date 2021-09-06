export interface PlayerData {
  id: number
  name: string
  score: number
}

export interface KeeperState {
  players: PlayerData[]
}

// ============================================================================
// MOCKS
// ============================================================================

export function mockPlayerData(overrides: Partial<PlayerData> = {}): PlayerData {
  return {
    id: 3,
    name: 'Harold Ballz',
    score: 69,
    ...overrides,
  }
}

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
