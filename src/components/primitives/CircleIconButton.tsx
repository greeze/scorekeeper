import type { MouseEventHandler } from 'react'
import type { HeroIcon, TailwindColorName } from 'types'

import React from 'react'

interface CircleIconButtonProps {
  colorName?: TailwindColorName
  IconComponent: HeroIcon
  onClick: MouseEventHandler
}

export const CircleIconButton = ({ colorName = 'gray', IconComponent, onClick }: CircleIconButtonProps) => {
  return (
    <button className='group' onClick={onClick}>
      <IconComponent className={`h-8 w-8 md:h-12 md:w-12 group-hover:shadow rounded-full text-${colorName}-500`} />
    </button>
  )
}
