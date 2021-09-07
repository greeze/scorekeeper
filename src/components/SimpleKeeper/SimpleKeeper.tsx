import React, { memo, useMemo } from 'react'
import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'

import { useKeeperActions, useKeeperReducer } from './hooks'
import Player from './Player'

export default memo(function SimpleKeeper() {
  const [{ players }, dispatch] = useKeeperReducer()
  const { addPlayer, removePlayer, updatePlayer } = useKeeperActions(dispatch)

  const columns = useMemo(() => {
    const min = (n: number) => Math.min(n, players.length)
    return { xs: min(2), md: min(3), lg: min(4) }
  }, [players.length])

  return (
    <Paper>
      <AppBar position='sticky' title='Players'>
        <Toolbar>
          <Grid container justifyContent='space-between' alignContent='stretch' alignItems='center'>
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
      <Grid container columns={columns} padding={2} spacing={2}>
        {players.map((player) => (
          <Grid item key={player.id} xs={1} sm={1} md={1} lg={1} xl={1}>
            <Player player={player} onChange={updatePlayer} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
})
