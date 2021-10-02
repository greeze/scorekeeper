import { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector, usePrevious } from 'common/hooks'
import { selectors as gameSelectors } from 'features/game'
import {
  BroadcastActionType,
  useActions as useRealtimeActions,
  useRealtime,
  useRealtimeChannel,
  useRealtimeSubscribe,
} from 'features/realtime'
import { useRealtimeLog, useSendNextBroadcast, useRealtimeSyncToState } from 'features/realtime'

export default memo(function Realtime() {
  const dispatch = useAppDispatch()
  const realtimeOperations = useRealtimeActions(dispatch)
  const gameName = useAppSelector(gameSelectors.selectName)

  const realtime = useRealtime()
  const channel = useRealtimeChannel(realtime, gameName)
  const isSubscribed = useRealtimeSubscribe(channel, realtimeOperations.addReceivedMessage)
  const prevIsSubscribed = usePrevious(isSubscribed)

  useSendNextBroadcast(channel)
  useRealtimeSyncToState()
  useRealtimeLog()

  useEffect(() => {
    if (isSubscribed && !prevIsSubscribed) {
      realtimeOperations.setNextBroadcast({ type: BroadcastActionType.Subscribed })
    }
  }, [isSubscribed, prevIsSubscribed, realtimeOperations])

  return null
})
