import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'features/app/store'
import type { GameState } from 'features/game/types'

import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState: GameState = {
  name: '',
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

const selectGameState = ({ game }: RootState) => game
const selectName = createSelector(selectGameState, ({ name }) => name)

const { actions, reducer } = slice
const selectors = {
  selectGameState,
  selectName,
}

export { actions, reducer, selectors }
