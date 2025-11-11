'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import Image from 'next/image';

import {
  // useAppDispatch,
  useAppSelector,
} from '@/lib/reduxHooks';

import {
  selectActiveCharacter,
  selectCharacterParty,
} from '@/lib/features/character/CharacterSlice';
import CharacterDisplayCard from '@/components/ui/CharacterDisplayCard/CharacterDisplayCard';

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
        <div
          id="character-data"
          className="character-data p-4 flex flex-col md:flex-row md:space-x-6 md:items-stretch"
        >
          <figure className='character-image w-full md:w-1/3 flex items-center justify-center md:h-auto'>
            <Image
              alt={activeCharacter?.name || 'Default Avatar'}
              src={activeCharacter?.avatar || '/default_avatar.png'}
              width={400}
              height={400}
            />
          </figure>
          <div
            id="character-stats-display"
            className="w-full md:w-2/3 border-2 border-white rounded-lg bg-black/50 text-white flex flex-col justify-center px-6 py-4 space-y-2"
          >
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2'>
                Name: {activeCharacter?.name || 'No Active Character'}
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

            {/*<div className='mb-4'>
               <label className='block text-white text-sm font-bold mb-2'>
                Attacks:
                {activeCharacter?.inventory?.attacks &&
                  activeCharacter.inventory.attacks.length > 0
                  ? activeCharacter.inventory.attacks.join(', ')
                  : 'None'}
              </label>
            </div>*/}
          </div>
        </div>
        <div className="character-inventory p-4 flex flex-col md:flex-row md:space-x-4 md:items-stretch">
          <div
            id="inventory-buttons"
            className="w-full md:w-1/3 mb-4 md:mb-0 flex flex-col border-2 border-white rounded-md bg-black/40 overflow-hidden"
          >
            <button
              className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15"
            >
              Attacks
            </button>
            <button className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15">
              Skills
            </button>
            <button className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15">
              Coins
            </button>
            <button className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15">
              Weapons
            </button>
            <button className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15">
              Equipment
            </button>
            <button className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15">
              Rations
            </button>
            <button className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15">
              Potions
            </button>
          </div>
          <div
            id="inventory-display"
            className="w-full md:w-2/3 min-h-[220px] border-2 border-white bg-black/50 rounded-lg"
          >
            {/* Inventory details will be displayed here based on selected category */}
          </div>
        </div>

        <div id="party-members-grid" className="w-full p-4">
          <div className="flex flex-row flex-wrap gap-2 border-2 border-white rounded-lg bg-black/50 p-4">
            {characterParty.length > 0 ? (
              characterParty.map((character) => (
                <CharacterDisplayCard
                  key={character.id}
                  character={character}
                />
              ))
            ) : activeCharacter?.partyMembers &&
              activeCharacter.partyMembers.length > 0 ? (
              activeCharacter.partyMembers.map((character) => (
                <CharacterDisplayCard
                  key={character.id}
                  character={character}
                />
              ))
            ) : (
              <p className="w-full text-white text-center font-semibold">
                You have no party members yet. Complete quests to recruit allies.
              </p>
            )}
          </div>
        </div>


      </div>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
