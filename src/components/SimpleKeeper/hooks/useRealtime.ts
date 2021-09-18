import type { Types as AblyTypes } from 'ably/promises'
import type { KeeperState } from '../types'

import Ably from 'ably/promises'
import { useCallback, useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'

let realtime: Ably.Realtime | null = null
try {
  if (process.env.NODE_ENV !== 'test') {
    realtime = new Ably.Realtime.Promise(process.env.REACT_APP_ABLY_KEY || '')
  }
} catch (err: unknown) {}

export const useRealtimeSync = (
  keeperState: KeeperState,
  updateCallback: (data: KeeperState) => void,
  channelName: string = 'SimpleKeeper',
) => {
  const isSubscribedRef = useRef(false)
  const keeperStateRef = useRef(keeperState)
  const lastUpdateRef = useRef(keeperState)
  const channel = realtime?.channels.get(channelName)

  const broadcastKeeperState = useCallback(
    (data: KeeperState) => {
      channel?.publish({ name: 'updateKeeperState', data })
    },
    [channel],
  )

  useEffect(() => {
    keeperStateRef.current = keeperState
  }, [keeperState])

  useEffect(() => {
    async function subscribe() {
      await channel?.subscribe((message: AblyTypes.Message) => {
        if (message.connectionId !== realtime?.connection.id) {
          const { name } = message
          switch (name) {
            case 'subscribed': {
              broadcastKeeperState(keeperStateRef.current)
              break
            }

            case 'updateKeeperState': {
              const newKeeperState: KeeperState = message.data
              if (!isEqual(newKeeperState, keeperStateRef.current)) {
                lastUpdateRef.current = message.data
                updateCallback(message.data)
              }
              break
            }
          }
        }
      })
      if (!isSubscribedRef.current) {
        isSubscribedRef.current = true
        channel?.publish({ name: 'subscribed' })
      }
    }

    subscribe()

    return function cleanup() {
      channel?.unsubscribe()
    }
  }, [broadcastKeeperState, channel, updateCallback])

  return { broadcastKeeperState, lastUpdateRef }
}
