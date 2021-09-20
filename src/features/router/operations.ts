import type { AppDispatch } from 'features/app/store'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { actions } from './slice'

// const myThunk: AppThunk = () => async (dispatch, getState) => {}

const operations = {
  ...actions,
}

const useActions = (dispatch: AppDispatch) => useMemo(() => bindActionCreators(operations, dispatch), [dispatch])

export { operations, useActions }
