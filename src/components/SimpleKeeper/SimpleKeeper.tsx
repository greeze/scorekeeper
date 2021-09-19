import type { PlayerData } from 'components/SimpleKeeper/Player/types'

import React, { memo, useCallback, useMemo, useState } from 'react'
import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'

import { useKeeperActions } from 'components/SimpleKeeper/hooks/useKeeperActions'
import { useKeeperReducer } from 'components/SimpleKeeper/hooks/useKeeperReducer'
import { useRealtimeSync } from 'components/SimpleKeeper/hooks/useRealtime'
import Player from 'components/SimpleKeeper/Player'

interface SimpleKeeperProps {
  gameName: string
}

const useColumns = (players: PlayerData[]) =>
  useMemo(() => {
    const min = (n: number) => Math.min(n, players.length)
    return { xs: min(1), sm: min(2), md: min(3), lg: min(4) }
  }, [players.length])

export default memo(function SimpleKeeper({ gameName }: SimpleKeeperProps) {
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [keeperState, dispatch] = useKeeperReducer()
  const { players } = keeperState
  const columns = useColumns(players)

  const { addPlayer, removePlayer, updateKeeperState, updatePlayer } = useKeeperActions(dispatch)
  useRealtimeSync(keeperState, updateKeeperState, gameName)

  const handleChangeSelectedIndex = useCallback(
    (newIndex: number) => {
      setSelectedIndex(newIndex)
    },
    [setSelectedIndex],
  )

  return (
    <Paper>
      <AppBar position='sticky' title='Players'>
        <Toolbar>
          <Grid alignContent='stretch' alignItems='center' container justifyContent='space-between'>
            <IconButton color='inherit' onClick={removePlayer}>
              <RemoveCircleRounded />
            </IconButton>
            <Typography sx={{ textTransform: 'capitalize' }} variant='h6'>
              {gameName}
            </Typography>
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
