import React from 'react'
import { render, screen } from '@testing-library/react'
import SimpleKeeper from './SimpleKeeper'

describe('<SimpleKeeper>', () => {
  it('renders players header', () => {
    render(<SimpleKeeper />)
    const headerElement = screen.getByText(/players/i)
    expect(headerElement).toBeInTheDocument()
  })
})
