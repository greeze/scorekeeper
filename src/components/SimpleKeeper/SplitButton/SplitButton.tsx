import type { ReactNode } from 'react'

import React, { memo } from 'react'
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material'
import { ArrowDropDownRounded } from '@mui/icons-material'

interface SplitButtonProps {
  icon?: ReactNode
  options: string[] | number[]
  onClick?: (index: number) => void
  onSelect?: (index: number) => void
}

export default memo(function SplitButton({
  icon,
  onClick = () => null,
  options,
  onSelect = () => null,
}: SplitButtonProps) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleClick = () => {
    onClick(selectedIndex)
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    onSelect(index)
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <ButtonGroup variant='contained' aria-label='split button'>
        <Button onClick={handleClick}>
          {icon}
          {options[selectedIndex]}
        </Button>
        <Button
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
          ref={anchorRef}
          size='small'
        >
          <ArrowDropDownRounded />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu'>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
})
