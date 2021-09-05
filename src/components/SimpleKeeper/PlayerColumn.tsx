import React from 'react'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'

interface PlayerColumnProps {
  index: number
  name: string
  score: number
  increment: (playerIndex: number) => void
  decrement: (playerIndex: number) => void
}

export const PlayerColumn = ({ decrement, increment, index, name, score }: PlayerColumnProps) => {
  return (
    <div className='bg-white flex flex-col rounded-md border border-gray-300 p-4 shadow-inner'>
      <div className='md:text-2xl font-thin border-b pb-2'>{name}:</div>
      <div className='text-2xl md:text-4xl md:font-medium py-6 shadow-inner'>{score}</div>
      <div className='flex flex-row justify-evenly gap-x-1 text-2xl font-thin border-t pt-2'>
        <button className='flex-grow text-center p-2 hover:shadow' onClick={() => decrement(index)}>
          <MinusCircleIcon className='w-5 h-5 md:w-10 md:h-10 inline-block' />
        </button>
        <button className='flex-grow text-center p-2 hover:shadow' onClick={() => increment(index)}>
          <PlusCircleIcon className='w-5 h-5 md:w-10 md:h-10 inline-block' />
        </button>
      </div>
    </div>
  )
}
