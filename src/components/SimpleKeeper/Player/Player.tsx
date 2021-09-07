import type { PlayerData } from './types'

import React, { memo } from 'react'
import { Button, ButtonGroup, Card, Divider, Stack, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'
import { useHandleEnterKey, useHandleFocus, useHandleBlur, usePlayerActions } from './hooks'

export interface PlayerProps {
  player: PlayerData
  onChange?: (data: PlayerData) => void
}

export default memo(function PlayerColumn({ onChange = () => null, player }: PlayerProps) {
  const { rename, addScore } = usePlayerActions(player, onChange)
  const selectOnFocus = useHandleFocus()
  const blurOnEnterKey = useHandleEnterKey()
  const updateNameOnBlur = useHandleBlur(rename)

  return (
    <Card>
      <Stack alignItems='center' divider={<Divider flexItem />} margin={2} spacing={2}>
        <Typography
          component='div'
          contentEditable
          data-testid='player-name'
          maxWidth='100%'
          noWrap
          onBlur={updateNameOnBlur}
          onFocus={selectOnFocus}
          onKeyDown={blurOnEnterKey}
          px={1}
          suppressContentEditableWarning
          variant='h6'
        >
          {player.name}
        </Typography>
        <Typography data-testid='player-score' variant='h3'>
          {player.score}
        </Typography>
        <ButtonGroup fullWidth size='large' variant='contained'>
          <Button data-testid='decrement-score' onClick={() => addScore(-1)}>
            <RemoveCircleRounded /> 1
          </Button>
          <Button data-testid='decrement-score-10' onClick={() => addScore(-10)}>
            <RemoveCircleRounded /> 10
          </Button>
          <Button data-testid='increment-score-10' onClick={() => addScore(10)}>
            <AddCircleRounded /> 10
          </Button>
          <Button data-testid='increment-score' onClick={() => addScore(1)}>
            <AddCircleRounded /> 1
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  )
})
