import type { PlayerData } from './types'

import React, { memo } from 'react'
import { Button, ButtonGroup, Card, Divider, Stack, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'
import { useHandleEnterKey, useHandleNameChange, usePlayerActions } from './hooks'

export interface PlayerProps {
  player: PlayerData
  onChange?: (data: PlayerData) => void
}

export default memo(function PlayerColumn({ onChange = () => null, player }: PlayerProps) {
  const { decrement, increment, rename } = usePlayerActions(player, onChange)
  const handleEnterKey = useHandleEnterKey()
  const handleNameChange = useHandleNameChange(rename)

  return (
    <Card>
      <Stack alignItems='center' divider={<Divider flexItem />} margin={2} spacing={2}>
        <Typography
          component='div'
          contentEditable
          data-testid='player-name'
          onBlur={handleNameChange}
          onKeyDown={handleEnterKey}
          suppressContentEditableWarning
          variant='h6'
        >
          {player.name}:
        </Typography>
        <Typography data-testid='player-score' variant='h3'>
          {player.score}
        </Typography>
        <ButtonGroup fullWidth size='large' variant='contained'>
          <Button data-testid='decrement-score' onClick={decrement}>
            <RemoveCircleRounded />
          </Button>
          <Button data-testid='increment-score' onClick={increment}>
            <AddCircleRounded />
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  )
})
