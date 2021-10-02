import type { PayloadAction } from '@reduxjs/toolkit'
import type { Types as AblyTypes } from 'ably'
import type { RootState } from 'features/app/store'
import type { BroadcastAction, RealtimeState } from 'features/realtime/types'

import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState: RealtimeState = {
  broadcast: null,
  received: [],
}

const sortByTimestamp = {
  ascending: (a: AblyTypes.Message, b: AblyTypes.Message) => a.timestamp - b.timestamp,
  descending: (a: AblyTypes.Message, b: AblyTypes.Message) => b.timestamp - a.timestamp,
}

const slice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    setNextBroadcast: (state, action: PayloadAction<BroadcastAction>) => {
      state.broadcast = action.payload
    },

    deleteMessage: (state, action: PayloadAction<AblyTypes.Message>) => {
      const { payload } = action
      const { received } = state
      const index = received.findIndex((message) => message.id === payload.id)
      received.splice(index, 1)
    },

    addReceivedMessage: (state, action: PayloadAction<AblyTypes.Message>) => {
      state.received.push(action.payload)
      state.received.sort(sortByTimestamp.ascending)
    },
  },
})

const selectRealtimeState = ({ realtime }: RootState) => realtime
const selectNextBroadcast = createSelector(selectRealtimeState, ({ broadcast }) => broadcast)
const selectReceivedMessages = createSelector(selectRealtimeState, ({ received }) => received)
const selectEarliestMessage = createSelector(selectReceivedMessages, (received) => received[0])
const selectEarliestMessageId = createSelector(selectEarliestMessage, (message) => message?.id)
const selectLastMessage = createSelector(selectReceivedMessages, (received) => received.slice(-1).pop())

const { actions, reducer } = slice
const selectors = {
  selectRealtimeState,
  selectNextBroadcast,
  selectReceivedMessages,
  selectEarliestMessage,
  selectEarliestMessageId,
  selectLastMessage,
}

export { actions, reducer, selectors }
