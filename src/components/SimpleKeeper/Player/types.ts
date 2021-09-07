export interface PlayerData {
  id: number
  name: string
  score: number
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
