import type { KeeperState } from 'components/SimpleKeeper/types'
import type { PlayerData } from 'components/SimpleKeeper/Player/types'

export type KeeperAction =
  | { type: 'add_player' }
  | { type: 'remove_player' }
  | { type: 'update_player'; payload: PlayerData }
  | { type: 'update_state'; payload: KeeperState }
