import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from 'features/app/store'
import { useDispatch, useSelector } from 'react-redux'

// Use instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
