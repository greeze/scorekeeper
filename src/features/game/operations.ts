import type { AppDispatch } from 'features/app/store'
import type { AppThunk } from 'common/types'

import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'

import { BroadcastActionType, operations as realtimeActions } from 'features/realtime'
import { actions, selectors } from './slice'

const changeName =
  (newName: string, broadcast = true): AppThunk =>
  async (dispatch, getState) => {
    const currentName = selectors.selectName(getState())
    if (newName !== currentName) {
      dispatch(actions.changeName(newName))
      broadcast &&
        dispatch(realtimeActions.setNextBroadcast({ type: BroadcastActionType.GameNameChange, payload: newName }))
    }
  }

const operations = {
  ...actions,
  changeName,
}

const useActions = (dispatch: AppDispatch) => useMemo(() => bindActionCreators(operations, dispatch), [dispatch])

export { operations, useActions }
