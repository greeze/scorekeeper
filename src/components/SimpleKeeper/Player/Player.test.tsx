import type { PlayerProps } from 'components/SimpleKeeper/Player'

import React from 'react'
import { fireEvent, screen } from '@testing-library/react'

import { renderWrapped } from 'common/testHelpers'
import { mockPlayerData } from 'features/players'
import Player from 'components/SimpleKeeper/Player'

const props: PlayerProps = {
  player: mockPlayerData(),
  onChange: jest.fn(),
}

describe('<Player>', () => {
  it('renders player name', () => {
    renderWrapped(<Player {...props} />)
    const el = screen.getByText(props.player.name, { exact: false })

    expect(el).toBeInTheDocument()
  })

  it('renders player score', () => {
    renderWrapped(<Player {...props} />)
    const el = screen.getByText(props.player.score, { exact: false })

    expect(el).toBeInTheDocument()
  })

  it('increments player score when clicking increment', () => {
    renderWrapped(<Player {...props} />)
    const btn = screen.getByTestId('increment-score')

    fireEvent.click(btn)
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        score: props.player.score + 1,
      }),
    )
  })

  it('decrements player score when clicking decrement', () => {
    renderWrapped(<Player {...props} />)
    const btn = screen.getByTestId('decrement-score')

    fireEvent.click(btn)
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        score: props.player.score - 1,
      }),
    )
  })

  it('renames the player when user finishes editing', () => {
    renderWrapped(<Player {...props} />)
    const el = screen.getByTestId('player-name')
    const name = 'Splattle'
    el.textContent = name
    fireEvent.blur(el)

    expect(props.onChange).toHaveBeenCalledWith(expect.objectContaining({ name }))
  })
})
