import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'

import { useKeeperActions, useKeeperReducer } from './hooks'
import Player from './Player'

export default memo(function SimpleKeeper() {
  const [{ players }, dispatch] = useKeeperReducer()
  const { addPlayer, removePlayer, updatePlayer } = useKeeperActions(dispatch)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const handleChangeSelectedIndex = useCallback(
    (newIndex: number) => {
      setSelectedIndex(newIndex)
    },
    [setSelectedIndex],
  )
  const valueOptions = useRef([5, 10, 100])

  const columns = useMemo(() => {
    const min = (n: number) => Math.min(n, players.length)
    return { xs: min(1), sm: min(2), md: min(3), lg: min(4) }
  }, [players.length])

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
              valueOptions={valueOptions.current}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
})
