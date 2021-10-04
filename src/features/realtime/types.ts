import type { Types as AblyTypes } from 'ably'
import type {
  PlayerData,
  PlayerNameChangePayload,
  PlayerScoreIncrementPayload,
  PlayerUpdatePayload,
} from 'features/players'
import { getRandomInteger, getRandomString, getRandomWords } from 'common/utils'

export enum BroadcastActionType {
  GameNameChange = 'GameNameChange',
  PlayerAdd = 'PlayerAdd',
  PlayerNameChange = 'PlayerNameChange',
  PlayerRemove = 'PlayerRemove',
  PlayerUpdate = 'PlayerUpdate',
  PlayersUpdate = 'PlayersUpdate',
  ScoreIncrement = 'ScoreIncrement',
  Subscribed = 'Subscribed',
}

export interface IBroadcastAction {
  type: BroadcastActionType
  payload?: unknown
}

export interface GameNameChangeBroadcastAction extends IBroadcastAction {
  type: BroadcastActionType.GameNameChange
  payload: string
}

export interface PlayerAddBroadcastAction extends IBroadcastAction {
  type: BroadcastActionType.PlayerAdd
  payload: PlayerData
}

export interface PlayerNameChangeBroadcastAction extends IBroadcastAction {
  type: BroadcastActionType.PlayerNameChange
  payload: PlayerNameChangePayload
}

export interface PlayerRemoveBroadcastAction extends IBroadcastAction {
  type: BroadcastActionType.PlayerRemove
  payload: PlayerData
}

export interface PlayerUpdateBroadcastAction extends IBroadcastAction {
  type: BroadcastActionType.PlayerUpdate
  payload: PlayerUpdatePayload
}

export interface PlayersUpdateBroadcastAction extends IBroadcastAction {
  type: BroadcastActionType.PlayersUpdate
  payload: PlayerData[]
}

export interface ScoreIncrementBroadcastAction extends IBroadcastAction {
  type: BroadcastActionType.ScoreIncrement
  payload: PlayerScoreIncrementPayload
}

export interface SubscribedBroadcastAction extends IBroadcastAction {
  type: BroadcastActionType.Subscribed
}

export type BroadcastAction =
  | GameNameChangeBroadcastAction
  | PlayerAddBroadcastAction
  | PlayerNameChangeBroadcastAction
  | PlayerUpdateBroadcastAction
  | PlayerRemoveBroadcastAction
  | PlayersUpdateBroadcastAction
  | ScoreIncrementBroadcastAction
  | SubscribedBroadcastAction

export interface RealtimeState {
  received: AblyTypes.Message[]
  broadcast: BroadcastAction | null
}

// ============================================================================
// MOCKS
// ============================================================================
export const mockRealtimeMessage = (overrides: Partial<AblyTypes.Message> = {}): AblyTypes.Message => {
  return {
    clientId: getRandomString(),
    connectionId: getRandomString(),
    data: getRandomWords(),
    encoding: getRandomString(),
    extras: getRandomWords(),
    id: getRandomString(),
    name: getRandomString(),
    timestamp: getRandomInteger(1, 1000),
    ...overrides,
  }
}

export const mockRealtimeState = (overrides: Partial<RealtimeState> = {}): RealtimeState => {
  return {
    received: [mockRealtimeMessage()],
    broadcast: null,
    ...overrides,
  }
}
