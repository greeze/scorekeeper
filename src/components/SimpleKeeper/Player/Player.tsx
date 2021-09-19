import type { PlayerData } from 'components/SimpleKeeper/Player/types'

import React, { memo } from 'react'
import { Button, Card, Divider, Grid, Stack, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'
import { useContentEditableHandlers } from 'common/hooks/useContentEditableHandlers'
import { usePlayerActions } from 'components/SimpleKeeper/Player/hooks'
import SplitButton from 'components/SimpleKeeper/SplitButton'

export interface PlayerProps {
  player: PlayerData
  onChange?: (data: PlayerData) => void
  onSelect?: (index: number) => void
  selectedIndex: number
  valueOptions: number[]
}

export default memo(function PlayerColumn({
  onChange = () => null,
  onSelect = () => null,
  player,
  selectedIndex,
  valueOptions,
}: PlayerProps) {
  const { rename, addScore } = usePlayerActions(player, onChange)
  const { handleBlur, handleFocus, handleKeyDown, handleKeyUp } = useContentEditableHandlers(rename)

  return (
    <Card>
      <Stack
        alignItems='center'
        divider={<Divider flexItem />}
        margin={{ xs: 0, sm: 1, md: 2 }}
        spacing={{ xs: 0, sm: 1, md: 2 }}
      >
        <Typography
          component='div'
          contentEditable
          data-testid='player-name'
          maxWidth='100%'
          noWrap
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          px={1}
          suppressContentEditableWarning
          variant='h6'
        >
          {player.name}
        </Typography>
        <Typography data-testid='player-score' variant='h3'>
          {player.score}
        </Typography>
        <Grid alignItems='center' container flexWrap='nowrap' justifyContent='center' lineHeight={0} spacing='1px'>
          <Grid item xs>
            <Button
              data-testid='decrement-score'
              fullWidth
              onClick={() => addScore(-1)}
              size='small'
              sx={{ borderRadius: '4px 0 0 4px', px: 0 }}
              variant='contained'
            >
              <RemoveCircleRounded /> 1
            </Button>
          </Grid>
          <Grid item xs>
            <SplitButton
              fullWidth
              icon={<RemoveCircleRounded />}
              onClick={(index) => addScore(-valueOptions[index])}
              onSelect={onSelect}
              options={valueOptions}
              selectedIndex={selectedIndex}
              size='small'
              sx={{ px: 0 }}
            />
          </Grid>
          <Grid item xs>
            <SplitButton
              fullWidth
              icon={<AddCircleRounded />}
              onClick={(index) => addScore(valueOptions[index])}
              onSelect={onSelect}
              options={valueOptions}
              selectedIndex={selectedIndex}
              size='small'
              sx={{ px: 0 }}
            />
          </Grid>
          <Grid item xs>
            <Button
              data-testid='increment-score'
              fullWidth
              onClick={() => addScore(1)}
              size='small'
              sx={{ borderRadius: '0 4px 4px 0', px: 0 }}
              variant='contained'
            >
              <AddCircleRounded /> 1
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  )
})
