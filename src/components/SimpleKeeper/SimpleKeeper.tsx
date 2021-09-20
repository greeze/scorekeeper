import type { PlayerData } from 'features/players'

import React, { memo, useCallback } from 'react'
import { AppBar, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectors as gameSelectors } from 'features/game'
import { selectors as playersSelectors, useActions as usePlayersActions } from 'features/players'
import ShareButton from 'components/SimpleKeeper/ShareButton'
import Player from 'components/SimpleKeeper/Player'
import { useColumns } from './hooks'

export default memo(function SimpleKeeper() {
  const dispatch = useAppDispatch()
  const playersActions = usePlayersActions(dispatch)
  const gameName = useAppSelector(gameSelectors.selectName)
  const players = useAppSelector(playersSelectors.selectPlayers)
  const columns = useColumns(players)
  const handleAddPlayer = useCallback(() => playersActions.addPlayer(), [playersActions])
  const handleRemovePlayer = useCallback(() => playersActions.removeLastPlayer(), [playersActions])
  const handleUpdatePlayer = useCallback((player: PlayerData) => playersActions.updatePlayer(player), [playersActions])

  return (
    <Paper>
      <AppBar position='sticky' title='Players'>
        <Toolbar>
          <Grid alignContent='stretch' alignItems='center' container justifyContent='space-between'>
            <IconButton color='inherit' onClick={handleRemovePlayer} title='Remove Player'>
              <RemoveCircleRounded />
            </IconButton>
            <Typography sx={{ textTransform: 'capitalize' }} variant='h6'>
              {gameName}
              <ShareButton />
            </Typography>
            <IconButton color='inherit' onClick={handleAddPlayer} title='Add Player'>
              <AddCircleRounded />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container columns={columns} padding={{ xs: 0, sm: 1, md: 2 }} spacing={1}>
        {players.map((player) => (
          <Grid item key={player.id} xs={1} sm={1} md={1} lg={1} xl={1}>
            <Player player={player} onChange={handleUpdatePlayer} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
})
