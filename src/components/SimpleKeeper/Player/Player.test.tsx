import type { PlayerProps } from './Player'

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { mockPlayerData } from './types'
import Player from './Player'

const props: PlayerProps = {
  player: mockPlayerData(),
  onChange: jest.fn(),
}

describe('<Player>', () => {
  it('renders player name', () => {
    render(<Player {...props} />)
    const el = screen.getByText(props.player.name, { exact: false })

    expect(el).toBeInTheDocument()
  })

  it('renders player score', () => {
    render(<Player {...props} />)
    const el = screen.getByText(props.player.score, { exact: false })

    expect(el).toBeInTheDocument()
  })

  it('increments player score when clicking increment', () => {
    render(<Player {...props} />)
    const btn = screen.getByTestId('increment-score')
    const btn10 = screen.getByTestId('increment-score-10')

    fireEvent.click(btn)
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        score: props.player.score + 1,
      }),
    )

    fireEvent.click(btn10)
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        score: props.player.score + 10,
      }),
    )
  })

  it('decrements player score when clicking decrement', () => {
    render(<Player {...props} />)
    const btn = screen.getByTestId('decrement-score')
    const btn10 = screen.getByTestId('decrement-score-10')

    fireEvent.click(btn)
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        score: props.player.score - 1,
      }),
    )

    fireEvent.click(btn10)
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        score: props.player.score - 10,
      }),
    )
  })

  it('renames the player when user finishes editing', () => {
    render(<Player {...props} />)
    const el = screen.getByTestId('player-name')
    const name = 'Splattle'
    el.textContent = name
    fireEvent.blur(el)

    expect(props.onChange).toHaveBeenCalledWith(expect.objectContaining({ name }))
  })
})