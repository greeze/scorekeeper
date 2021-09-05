import { useState } from 'react'
import memoizeOne from 'memoize-one'
import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'

import {
  initialPlayers,
  useAddPlayer,
  useDecrementPlayerScore,
  useIncrementPlayerScore,
  useRemovePlayer,
} from './hooks'
import { PlayerColumn } from './PlayerColumn'

export default function SimpleKeeper() {
  const [playersList, setPlayers] = useState(initialPlayers)
  const addPlayer = useAddPlayer(setPlayers)
  const removePlayer = useRemovePlayer(setPlayers)
  const incrementPlayerScore = useIncrementPlayerScore(setPlayers)
  const decrementPlayerScore = useDecrementPlayerScore(setPlayers)

  const cols = memoizeOne((n: number) => Math.min(n, playersList.length))
  const columns = { xs: cols(2), sm: cols(3), md: cols(4), lg: cols(5), xl: cols(6) }

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
        {playersList.map((player, index) => (
          <Grid item key={player.name} xs={1} sm={1} md={1} lg={1} xl={1}>
            <PlayerColumn
              decrement={decrementPlayerScore}
              increment={incrementPlayerScore}
              index={index}
              name={player.name}
              score={player.score}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
