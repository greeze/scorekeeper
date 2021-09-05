import React from 'react'
import { Button, ButtonGroup, Card, Divider, Stack, Typography } from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'

interface PlayerColumnProps {
  index: number
  name: string
  score: number
  increment: (playerIndex: number) => void
  decrement: (playerIndex: number) => void
}

export const PlayerColumn = ({ decrement, increment, index, name, score }: PlayerColumnProps) => {
  return (
    <Card>
      <Stack alignItems='center' divider={<Divider flexItem />} margin={2} spacing={2}>
        <Typography component='div' contentEditable suppressContentEditableWarning variant='h6'>
          {name}:
        </Typography>
        <Typography variant='h3'>{score}</Typography>
        <ButtonGroup fullWidth size='large' variant='contained'>
          <Button onClick={() => decrement(index)}>
            <RemoveCircleRounded />
          </Button>
          <Button onClick={() => increment(index)}>
            <AddCircleRounded />
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  )
}
