import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'

import React, { memo } from 'react'
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material'
import { ArrowDropDownRounded } from '@mui/icons-material'

interface SplitButtonProps {
  fullWidth?: ButtonProps['fullWidth']
  icon?: ReactNode
  options: string[] | number[]
  onClick?: (index: number) => void
  onSelect?: (index: number) => void
  selectedIndex: number
  size?: ButtonProps['size']
  sx?: ButtonProps['sx']
}

export default memo(function SplitButton({
  fullWidth,
  icon,
  onClick = () => null,
  onSelect = () => null,
  options,
  selectedIndex,
  size,
  sx,
}: SplitButtonProps) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    onClick(selectedIndex)
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    onSelect(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current?.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  return (
    <ButtonGroup fullWidth={fullWidth} sx={sx} variant='contained' aria-label='split button'>
      <Button onClick={handleClick} size={size} sx={{ borderRadius: '0', px: 0 }}>
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
        size={size}
        sx={{ borderRadius: '0', minWidth: '20px !important', maxWidth: '40px', px: 0, width: 'unset' }}
      >
        <ArrowDropDownRounded />
      </Button>
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
    </ButtonGroup>
  )
})
