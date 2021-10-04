import type { PlayerProps } from 'components/SimpleKeeper/Player'

import React from 'react'
import { fireEvent, screen } from '@testing-library/react'

import { renderWrapped } from 'common/testHelpers'
import { mockPlayersState } from 'features/players'
import Player from 'components/SimpleKeeper/Player'

const preloadedState = {
  players: mockPlayersState(),
}

const props: PlayerProps = {
  player: { ...preloadedState.players.players[0] },
}

const findPlayerById = (playerId: number, store: ReturnType<typeof renderWrapped>['store']) => {
  return store.getState().players.players.find(({ id }) => id === playerId)
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
    const { store } = renderWrapped(<Player {...props} />, preloadedState)
    const btn = screen.getByTestId('increment-score')

    fireEvent.click(btn)

    const player = findPlayerById(props.player.id, store)
    expect(player?.score).toEqual(props.player.score + 1)
  })

  it('decrements player score when clicking decrement', () => {
    const { store } = renderWrapped(<Player {...props} />, preloadedState)
    const btn = screen.getByTestId('decrement-score')

    fireEvent.click(btn)
    const player = findPlayerById(props.player.id, store)
    expect(player?.score).toEqual(props.player.score - 1)
  })

  it('renames the player when user finishes editing', () => {
    const { store } = renderWrapped(<Player {...props} />, preloadedState)
    const newName = 'Splattle'
    const el = screen.getByTestId('player-name')
    el.textContent = newName
    fireEvent.blur(el)

    const player = findPlayerById(props.player.id, store)
    expect(player?.name).toEqual(newName)
  })
})
