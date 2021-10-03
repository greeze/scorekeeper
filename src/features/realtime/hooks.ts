import type { Types as AblyTypes } from 'ably'
import type { BroadcastAction } from './types'

import Ably from 'ably/promises'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAppDispatch, useAppSelector, usePrevious } from 'common/hooks'
import { useActions } from './operations'
import { selectors } from './slice'

export const useRealtime = () => {
  const [retries, setRetries] = useState(2)
  return useMemo(() => {
    try {
      if (process.env.REACT_APP_ABLY_KEY && process.env.NODE_ENV !== 'test') {
        return new Ably.Realtime.Promise({ echoMessages: false, key: process.env.REACT_APP_ABLY_KEY })
      }
    } catch (err: unknown) {
      console.warn('Realtime instantiation failed:', err)
      if (retries > 0) {
        console.warn(`Retrying ${retries} more time${retries === 1 ? '' : 's'}...`)
        setRetries(retries - 1)
      }
    }
  }, [retries])
}

export const useRealtimeChannel = (realtime: AblyTypes.RealtimePromise | undefined, channelName: string) => {
  return useMemo(() => {
    if (!channelName || !realtime) {
      return
    }
    return realtime.channels.get(channelName)
  }, [channelName, realtime])
}

export const useRealtimeBroadcast = (channel: AblyTypes.RealtimeChannelPromise | undefined) => {
  return useCallback(
    (action: BroadcastAction) => {
      if (!channel) {
        return
      }
      const { type, payload } = action
      channel.publish({ name: type, data: payload })
    },
    [channel],
  )
}

export const useRealtimeSubscribe = (
  channel: AblyTypes.RealtimeChannelPromise | undefined,
  receivedCallback: (msg: AblyTypes.Message) => void,
) => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const prevChannel = usePrevious(channel)

  const handleReceivedMessage = useCallback(
    (message: AblyTypes.Message) => {
      receivedCallback({ ...message }) // prevent non-serializable warnings
    },
    [receivedCallback],
  )

  useEffect(() => {
    if (channel !== prevChannel) {
      prevChannel?.unsubscribe()
      setIsSubscribed(false)
    }
  }, [channel, prevChannel])

  useEffect(() => {
    if (!channel) {
      setIsSubscribed(false)
      return
    }
    const subscribe = async () => {
      await channel.subscribe(handleReceivedMessage)
      setIsSubscribed(true)
    }
    if (!isSubscribed) {
      subscribe()
    }
  }, [channel, handleReceivedMessage, isSubscribed])

  useEffect(
    () => () => {
      channel?.unsubscribe()
      setIsSubscribed(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  return isSubscribed
}

export const useSendNextBroadcast = (channel: AblyTypes.RealtimeChannelPromise | undefined) => {
  const broadcast = useRealtimeBroadcast(channel)
  const nextBroadcast = useAppSelector(selectors.selectNextBroadcast)
  const prevBroadcast = usePrevious(nextBroadcast)
  useEffect(() => {
    if (nextBroadcast && nextBroadcast !== prevBroadcast) {
      broadcast(nextBroadcast)
    }
  }, [broadcast, nextBroadcast, prevBroadcast])
}

export const useRealtimeSyncToState = () => {
  const dispatch = useAppDispatch()
  const { processReceivedMessage } = useActions(dispatch)
  const messages = useAppSelector(selectors.selectReceivedMessages)
  const prevMessages = usePrevious(messages)
  useEffect(() => {
    if (messages.length && messages !== prevMessages) {
      processReceivedMessage()
    }
  }, [messages, prevMessages, processReceivedMessage])
}

export const useRealtimeLog = () => {
  const isDev = process.env.NODE_ENV === 'development'
  const lastMessage = useAppSelector(selectors.selectLastMessage)

  useEffect(() => {
    if (!lastMessage || !isDev) {
      return
    }
    console.info(`[Received ${lastMessage.timestamp}]`, lastMessage.name, lastMessage.data || '')
  }, [isDev, lastMessage])
}
