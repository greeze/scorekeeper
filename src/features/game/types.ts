import { getRandomString } from 'common/utils/getRandomString'

export interface GameState {
  name: string
}

// ============================================================================
// MOCKS
// ============================================================================
export const mockName = (override?: string): GameState['name'] => override ?? getRandomString()
export const mockGameState = (overrides: Partial<GameState> = {}): GameState => {
  return {
    name: mockName(),
    ...overrides,
  }
}
