import type { Reducer } from '@reduxjs/toolkit'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'

import { reducer as game } from 'features/game'
import { reducer as players } from 'features/players'
import { reducer as realtime } from 'features/realtime'

export const history = createBrowserHistory()

export const reducer = combineReducers({
  game,
  players,
  realtime,
  router: connectRouter(history) as Reducer<RouterState>,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppGetState = () => RootState
