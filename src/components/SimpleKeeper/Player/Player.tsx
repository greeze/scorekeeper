import type { PlayerData } from './types'

import React, { memo } from 'react'
import { Button, Card, Divider, Stack, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'
import { useHandleEnterKey, useHandleFocus, useHandleBlur, usePlayerActions } from './hooks'
import SplitButton from '../SplitButton/SplitButton'

export interface PlayerProps {
  player: PlayerData
  onChange?: (data: PlayerData) => void
}

export default memo(function PlayerColumn({ onChange = () => null, player }: PlayerProps) {
  const { rename, addScore } = usePlayerActions(player, onChange)
  const selectOnFocus = useHandleFocus()
  const blurOnEnterKey = useHandleEnterKey()
  const updateNameOnBlur = useHandleBlur(rename)
  const valueOptions = [5, 10, 100]

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
        <Stack
          alignItems='center'
          direction='row'
          divider={<Divider orientation='vertical' flexItem />}
          justifyContent='center'
          spacing={1}
          width='100%'
        >
          <Button data-testid='decrement-score' onClick={() => addScore(-1)} variant='contained'>
            <RemoveCircleRounded /> 1
          </Button>
          <SplitButton
            icon={<RemoveCircleRounded />}
            onClick={(index) => addScore(-valueOptions[index])}
            options={valueOptions}
          />
          <SplitButton
            icon={<AddCircleRounded />}
            onClick={(index) => addScore(valueOptions[index])}
            options={valueOptions}
          />
          <Button data-testid='increment-score' onClick={() => addScore(1)} variant='contained'>
            <AddCircleRounded /> 1
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
})
