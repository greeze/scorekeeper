import React from 'react'
import { screen } from '@testing-library/react'
import { renderWrapped } from 'common/testHelpers'
import SimpleKeeper from 'components/SimpleKeeper'

describe('<SimpleKeeper>', () => {
  it('renders players header', () => {
    renderWrapped(<SimpleKeeper />, { game: { name: 'Bloop' } })
    const headerElement = screen.getByText('Bloop')
    expect(headerElement).toBeInTheDocument()
  })
})
