import type { PlayerData } from '../Player/types'

export type KeeperAction =
  | { type: 'add_player' }
  | { type: 'remove_player' }
  | { type: 'update_player'; payload: PlayerData }
