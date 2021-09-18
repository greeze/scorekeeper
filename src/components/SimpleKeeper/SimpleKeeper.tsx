import type { PlayerData } from './Player/types'

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'
import isEqual from 'lodash/isEqual'

import { useKeeperActions } from './hooks/useKeeperActions'
import { useKeeperReducer } from './hooks/useKeeperReducer'
import { useRealtimeSync } from './hooks/useRealtime'
import Player from './Player'

const useColumns = (players: PlayerData[]) =>
  useMemo(() => {
    const min = (n: number) => Math.min(n, players.length)
    return { xs: min(1), sm: min(2), md: min(3), lg: min(4) }
  }, [players.length])

export default memo(function SimpleKeeper() {
  const isMountedRef = useRef(false)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [keeperState, dispatch] = useKeeperReducer()
  const { players } = keeperState
  const columns = useColumns(players)

  const { addPlayer, removePlayer, updateKeeperState, updatePlayer } = useKeeperActions(dispatch)
  const { broadcastKeeperState, lastUpdateRef } = useRealtimeSync(keeperState, updateKeeperState)

  const handleChangeSelectedIndex = useCallback(
    (newIndex: number) => {
      setSelectedIndex(newIndex)
    },
    [setSelectedIndex],
  )

  useEffect(() => {
    if (isMountedRef.current) {
      if (!isEqual(keeperState, lastUpdateRef.current)) {
        broadcastKeeperState(keeperState)
      }
    } else {
      isMountedRef.current = true
    }
  }, [broadcastKeeperState, keeperState, lastUpdateRef])

  return (
    <Paper>
      <AppBar position='sticky' title='Players'>
        <Toolbar>
          <Grid alignContent='stretch' alignItems='center' container justifyContent='space-between'>
            <IconButton color='inherit' onClick={removePlayer}>
              <RemoveCircleRounded />
            </IconButton>
            <Typography variant='h6'>Players</Typography>
            <IconButton color='inherit' onClick={addPlayer}>
              <AddCircleRounded />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container columns={columns} padding={{ xs: 0, sm: 1, md: 2 }} spacing={1}>
        {players.map((player) => (
          <Grid item key={player.id} xs={1} sm={1} md={1} lg={1} xl={1}>
            <Player
              player={player}
              onChange={updatePlayer}
              onSelect={handleChangeSelectedIndex}
              selectedIndex={selectedIndex}
              valueOptions={[5, 10, 100]}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
})
