import type { Reducer } from '@reduxjs/toolkit'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'

import { reducer as game } from 'features/game'
import { reducer as players } from 'features/players'
import { reducer as realtime } from 'features/realtime'
import { getPreloadedState, saveState } from './localStorage'

export const history = createBrowserHistory()

export const reducer = combineReducers({
  game,
  players,
  realtime,
  router: connectRouter(history) as Reducer<RouterState>,
})

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
  preloadedState: getPreloadedState(),
  reducer,
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppGetState = () => RootState
