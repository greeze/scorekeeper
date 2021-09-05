import React from 'react'
import { useRecoilState } from 'recoil'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'

import {
  playerListState,
  useAddPlayer,
  useDecrementPlayerScore,
  useIncrementPlayerScore,
  useRemovePlayer,
} from './atoms'
import { CircleIconButton } from 'components/primitives/CircleIconButton'
import { PlayerColumn } from './PlayerColumn'

export default function SimpleKeeper() {
  const [playersList, setPlayers] = useRecoilState(playerListState)
  const addPlayer = useAddPlayer(setPlayers)
  const removePlayer = useRemovePlayer(setPlayers)
  const incrementPlayerScore = useIncrementPlayerScore(setPlayers)
  const decrementPlayerScore = useDecrementPlayerScore(setPlayers)

  return (
    <>
      <div className='flex flex-row p-4 md:px-4 md:mb-4 items-center'>
        <CircleIconButton colorName='red' IconComponent={MinusCircleIcon} onClick={removePlayer} />
        <h1 className='flex-grow text-xl font-semibold md:text-2xl md:font-bold'>Players</h1>
        <CircleIconButton colorName='green' IconComponent={PlusCircleIcon} onClick={addPlayer} />
      </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-${playersList.length} gap-4 bg-gray-100 shadow-md p-4 rounded-md`}
      >
        {playersList.map((player, index) => (
          <PlayerColumn
            decrement={decrementPlayerScore}
            increment={incrementPlayerScore}
            index={index}
            key={player.name}
            name={player.name}
            score={player.score}
          />
        ))}
      </div>
    </>
  )
}
