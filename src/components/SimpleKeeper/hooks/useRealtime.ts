import type { Types as AblyTypes } from 'ably/promises'
import type { PlayerData } from '../Player/types'

import Ably from 'ably/promises'
import { useCallback, useEffect, useState } from 'react'

let realtime: Ably.Realtime | null = null
try {
  if (process.env.NODE_ENV !== 'test') {
    realtime = new Ably.Realtime.Promise(process.env.REACT_APP_ABLY_KEY || '')
  }
} catch (err: unknown) {}

export const useRealtime = (channelName: string = 'SimpleKeeper') => {
  const channel = realtime?.channels.get(channelName)
  const [messages, updateMessages] = useState<AblyTypes.Message[]>([])

  useEffect(() => {
    async function subscribe() {
      if (!channel) {
        return
      }
      await channel.subscribe((message: AblyTypes.Message) => {
        updateMessages([...messages, message.data])
      })
    }

    subscribe()

    return function cleanup() {
      channel?.unsubscribe()
    }
  }, [channel, messages])

  const broadcastPlayer = useCallback(
    (data: PlayerData) => {
      if (!channel) {
        return
      }
      channel.publish({ name: 'updatePlayer', data })
    },
    [channel],
  )

  return { broadcastPlayer, messages }
}
