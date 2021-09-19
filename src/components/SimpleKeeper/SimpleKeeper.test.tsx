import React from 'react'
import { render, screen } from '@testing-library/react'
import SimpleKeeper from 'components/SimpleKeeper'

describe('<SimpleKeeper>', () => {
  it('renders players header', () => {
    const gameName = 'tootyfartz'
    render(<SimpleKeeper gameName={gameName} />)
    const headerElement = screen.getByText(gameName)
    expect(headerElement).toBeInTheDocument()
  })
})
