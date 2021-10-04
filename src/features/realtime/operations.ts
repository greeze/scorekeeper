import type { AppThunk } from 'common/types'
import type { AppDispatch } from 'features/app/store'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'

import { operations as gameActions } from 'features/game'
import { operations as playersActions, selectors as playersSelectors } from 'features/players'
import { BroadcastActionType } from './types'
import { actions, selectors } from './slice'

// const myThunk: AppThunk = () => async (dispatch, getState) => {}

const processReceivedMessage = (): AppThunk => async (dispatch, getState) => {
  const earliestMessage = selectors.selectEarliestMessage(getState())
  if (!earliestMessage) {
    return
  }

  dispatch(actions.deleteMessage(earliestMessage))

  switch (earliestMessage.name) {
    case BroadcastActionType.GameNameChange: {
      dispatch(gameActions.changeName(earliestMessage.data, false))
      return
    }

    case BroadcastActionType.Subscribed: {
      const players = playersSelectors.selectPlayers(getState())
      dispatch(actions.setNextBroadcast({ type: BroadcastActionType.PlayersUpdate, payload: players }))
      return
    }

    case BroadcastActionType.PlayerAdd: {
      dispatch(playersActions.addPlayer(false))
      return
    }

    case BroadcastActionType.PlayerNameChange: {
      dispatch(playersActions.changeName(earliestMessage.data, false))
      return
    }

    case BroadcastActionType.PlayerRemove: {
      dispatch(playersActions.removeLastPlayer(false))
      return
    }

    case BroadcastActionType.PlayerUpdate: {
      dispatch(playersActions.updatePlayer(earliestMessage.data, false))
      return
    }

    case BroadcastActionType.PlayersUpdate: {
      dispatch(playersActions.updatePlayers(earliestMessage.data))
      return
    }

    case BroadcastActionType.ScoreIncrement: {
      dispatch(playersActions.incrementScore(earliestMessage.data, false))
      return
    }
  }
}

const operations = {
  ...actions,
  processReceivedMessage,
}

const useActions = (dispatch: AppDispatch) => useMemo(() => bindActionCreators(operations, dispatch), [dispatch])

export { operations, useActions }
