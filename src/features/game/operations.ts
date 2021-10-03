import type { AppDispatch } from 'features/app/store'
import type { AppThunk } from 'common/types'

import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'

import { BroadcastActionType, operations as realtimeActions } from 'features/realtime'
import { operations as routerActions } from 'features/router'
import { actions, selectors } from './slice'

const changeName =
  (newName: string, broadcast = true): AppThunk =>
  async (dispatch, getState) => {
    const currentName = selectors.selectName(getState())
    if (newName !== currentName) {
      broadcast &&
        dispatch(
          realtimeActions.setNextBroadcast({
            type: BroadcastActionType.GameNameChange,
            payload: newName,
          }),
        )
      // Broadcast channel is based on the game name, so the broadcast above needs to happen before we change the game name
      await Promise.resolve()
      dispatch(actions.changeName(newName))
      dispatch(routerActions.push({ search: `?game=${encodeURIComponent(newName)}` }))
    }
  }

const operations = {
  ...actions,
  changeName,
}

const useActions = (dispatch: AppDispatch) => useMemo(() => bindActionCreators(operations, dispatch), [dispatch])

export { operations, useActions }
