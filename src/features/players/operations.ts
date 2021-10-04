import type { AppDispatch } from 'features/app/store'
import type { AppThunk } from 'common/types'
import type { PlayerNameChangePayload, PlayerScoreIncrementPayload, PlayerUpdatePayload } from './types'

import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'

import { BroadcastActionType, operations as realtimeActions } from 'features/realtime'
import { actions, selectors } from './slice'

// const myThunk: AppThunk = () => async (dispatch, getState) => {}

const addPlayer =
  (broadcast = true): AppThunk =>
  async (dispatch, getState) => {
    const lastPlayer = selectors.selectLastPlayer(getState())
    const id = lastPlayer.id + 1
    const newPlayer = {
      id,
      name: `Player ${id}`,
      score: 0,
    }
    dispatch(actions.addPlayer(newPlayer))
    broadcast && dispatch(realtimeActions.setNextBroadcast({ type: BroadcastActionType.PlayerAdd, payload: newPlayer }))
  }

const changeName =
  (payload: PlayerNameChangePayload, broadcast = true): AppThunk =>
  async (dispatch, getState) => {
    dispatch(actions.changeName(payload))
    broadcast && dispatch(realtimeActions.setNextBroadcast({ type: BroadcastActionType.PlayerNameChange, payload }))
  }

const incrementScore =
  (payload: PlayerScoreIncrementPayload, broadcast = true): AppThunk =>
  async (dispatch, getState) => {
    dispatch(actions.incrementScore(payload))
    broadcast && dispatch(realtimeActions.setNextBroadcast({ type: BroadcastActionType.ScoreIncrement, payload }))
  }

const removeLastPlayer =
  (broadcast = true): AppThunk =>
  async (dispatch, getState) => {
    const lastPlayer = selectors.selectLastPlayer(getState())
    dispatch(actions.removePlayer(lastPlayer))
    broadcast &&
      dispatch(realtimeActions.setNextBroadcast({ type: BroadcastActionType.PlayerRemove, payload: lastPlayer }))
  }

const updatePlayer =
  (payload: PlayerUpdatePayload, broadcast = true): AppThunk =>
  async (dispatch, getState) => {
    dispatch(actions.updatePlayer(payload))
    broadcast && dispatch(realtimeActions.setNextBroadcast({ type: BroadcastActionType.PlayerUpdate, payload }))
  }

const operations = {
  ...actions,
  addPlayer,
  changeName,
  incrementScore,
  removeLastPlayer,
  updatePlayer,
}

const useActions = (dispatch: AppDispatch) => useMemo(() => bindActionCreators(operations, dispatch), [dispatch])

export { operations, useActions }
