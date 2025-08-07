'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/ useProtectedRoute';

import Image from 'next/image';

import {
  // useAppDispatch,
  useAppSelector,
} from '@/lib/reduxHooks';

import {
  selectActiveCharacter,
  selectCharacterParty,
} from '@/lib/features/character/CharacterSlice';

export default function PartyScreen() {
  useProtectedRoute();
  // const dispatch = useAppDispatch();
  const activeCharacter = useAppSelector(selectActiveCharacter);
  const characterParty = useAppSelector(selectCharacterParty);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[url("/background_images/supply_room.png")] bg-cover bg-no-repeat bg-center'>
      <div
        className='mt-4 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
        style={{
          maxWidth: '600px',
          minHeight: 'fit-content',
          width: '100%',
        }}
      >
        <div className='character-grid p-4 flex flex-col md:flex-row md:space-x-6'>
          <figure className='character-image w-full md:w-1/3 flex items-center justify-center md:h-auto'>
            <Image
              alt={activeCharacter?.characterName || 'Default Avatar'}
              src={activeCharacter?.avatar || '/default_avatar.png'}
              width={400}
              height={400}
            />
          </figure>
          <div className='character-data w-full md:w-2/3'>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                Name: {activeCharacter?.characterName || 'No Active Character'}
              </label>
            </div>

            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                HP: {activeCharacter?.hp ?? 'N/A'}
              </label>
            </div>

            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                MP: {activeCharacter?.mp ?? 'N/A'}
              </label>
            </div>

            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                Attacks:
                {activeCharacter?.baseAttackIds &&
                activeCharacter.baseAttackIds.length > 0
                  ? activeCharacter.baseAttackIds.join(', ')
                  : 'None'}
              </label>
            </div>
          </div>
        </div>
        <div className='avatar-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
          {characterParty.length > 0 ? (
            characterParty.map((character) => (
              <button
                key={character.characterId}
                className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200'
                onClick={() =>
                  console.log(
                    `Party member icon clicked: ${character.characterName}`
                  )
                }
              >
                <Image
                  className='flex items-center justify-center'
                  src={character.avatar}
                  alt={character.characterName}
                  width={200}
                  height={200}
                />
                <span className='text-center text-sm text-white font-bold mt-2'>
                  {character.characterName}
                </span>
              </button>
            ))
          ) : (
            <p className='text-white text-center font-semibold col-span-full'>
              No party members yet. Complete quests to recruit allies.
            </p>
          )}
        </div>
      </div>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
