import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'features/app/store'
import type { ParamSelector } from 'common/types'
import type {
  PlayerData,
  PlayersState,
  PlayerScoreIncrementPayload,
  PlayerUpdatePayload,
  PlayerNameChangePayload,
} from 'features/players/types'

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { createPlayers } from 'features/players/utils'
import { constants } from 'features/players/constants'

const initialState: PlayersState = {
  increment: 10,
  players: createPlayers(2),
}

// ============================================================================
// Slice
// ============================================================================
const slice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<PlayerData>) => {
      const { players } = state
      const { payload } = action
      players.push(payload)
    },

    changeName: (state, action: PayloadAction<PlayerNameChangePayload>) => {
      const { payload } = action
      const player = state.players.find(({ id }) => id === payload.id)
      if (player) {
        player.name = payload.name
      }
    },

    removePlayer: (state, action: PayloadAction<PlayerData>) => {
      const { payload } = action
      const index = state.players.findIndex(({ id }) => id === payload.id)
      if (index > -1) {
        state.players.splice(index, 1)
      }
    },

    incrementScore: (state, action: PayloadAction<PlayerScoreIncrementPayload>) => {
      const { payload } = action
      const player = state.players.find(({ id }) => id === payload.id)
      if (player) {
        player.score += payload.increment
      }
    },

    setIncrement: (state, action: PayloadAction<number>) => {
      state.increment = action.payload
    },

    updatePlayer: (state, action: PayloadAction<PlayerUpdatePayload>) => {
      const { payload } = action
      const index = state.players.findIndex(({ id }) => id === payload.id)
      state.players[index] = { ...state.players[index], ...payload }
    },

    updatePlayers: (state, action: PayloadAction<PlayerData[]>) => {
      state.players = action.payload
    },
  },
})

// ============================================================================
// Selectors
// ============================================================================
const playerIdParam: ParamSelector<number> = (_, id) => id

const selectPlayersState = ({ players }: RootState) => players
const selectIncrement = createSelector(selectPlayersState, ({ increment }) => increment)
const selectIncrementIndex = createSelector(selectIncrement, (increment) => constants.INCREMENTS.indexOf(increment))
const selectPlayers = createSelector(selectPlayersState, ({ players }) => players)
const selectLastPlayer = createSelector(selectPlayers, (players) => players.slice(-1)[0])
const selectPlayerById = createSelector(selectPlayers, playerIdParam, (players, id) =>
  players.find((player) => player.id === id),
)

// ============================================================================
// Exports
// ============================================================================
const { actions, reducer } = slice
const selectors = {
  selectPlayersState,
  selectIncrement,
  selectIncrementIndex,
  selectLastPlayer,
  selectPlayers,
  selectPlayerById,
}

export { actions, reducer, selectors }
