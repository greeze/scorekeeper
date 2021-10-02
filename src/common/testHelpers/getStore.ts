import type { RootState } from 'features/app/store'
import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import { reducer } from 'features/app/store'

export const getStore = (preloadedState: PreloadedState<RootState> = {}) => {
  return configureStore({
    preloadedState,
    reducer,
  })
}
