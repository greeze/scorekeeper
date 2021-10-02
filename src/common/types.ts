import type { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import type { RootState } from 'features/app/store'

// For selectors that need to be passed a parameter, ignore the state and passthrough the param
export type ParamSelector<T = unknown> = (_: RootState, param: T) => T

export type AppThunk<ReturnType = void> = ThunkAction<Promise<ReturnType>, RootState, unknown, AnyAction>
