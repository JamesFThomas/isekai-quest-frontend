'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import Image from 'next/image';

import {
  useAppDispatch,
  useAppSelector,
} from '@/lib/reduxHooks';

import {
  selectActiveCharacter,
  selectCharacterParty,
  useInventoryItemThunk,
} from '@/lib/features/character/CharacterSlice';
import CharacterDisplayCard from '@/components/ui/CharacterDisplayCard/CharacterDisplayCard';
import { useState } from 'react';
import { BattleOption } from '@/types/battle';
import { InventoryItemBase } from '@/types/character';
import CoinsPanel from './components/CoinsPanel';
import { InventoryItemModal } from './components/InventoryItemModal';



export default function PartyScreen() {
  useProtectedRoute();

  const [selectedItems, setSelectedItems] = useState<(BattleOption | InventoryItemBase)[]>();
  const [selectedCategory, setSelectedCategory] = useState<'coins' | 'items' | undefined>();

  const [selectedInventoryItem, setSelectedInventoryItem] = useState<BattleOption | InventoryItemBase>();
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const activeCharacter = useAppSelector(selectActiveCharacter);
  const characterParty = useAppSelector(selectCharacterParty);

  const handleInventoryButtonClick = (buttonType: string) => {
    if (activeCharacter && activeCharacter.inventory) {
      switch (buttonType) {
        case 'attacks':
          setSelectedItems(activeCharacter.inventory.attacks)
          setSelectedCategory('items')
          break;
        case 'skills':
          setSelectedItems(activeCharacter.inventory.skills)
          setSelectedCategory('items')
          break;
        case 'potions':
          setSelectedCategory('items')
          setSelectedItems(activeCharacter.inventory.potions)
          break;
        case 'weapons':
          setSelectedItems(activeCharacter.inventory.weapons)
          setSelectedCategory('items')
          break;
        case 'equipment':
          setSelectedItems(activeCharacter.inventory.equipment)
          setSelectedCategory('items')
          break;
        case 'rations':
          setSelectedItems(activeCharacter.inventory.rations)
          setSelectedCategory('items')
          break;
        case 'coins':
          setSelectedItems([])
          setSelectedCategory('coins')
          break;
      }
    }
  };

  const handleInventoryItemClick = (itemId: string) => {

    const selectedItem = selectedItems?.find(item => item.id === itemId)

    if (selectedItem) {
      setSelectedInventoryItem(selectedItem)
      setIsItemModalOpen(true);
    }
  }

  const handleItemSelect = (item: BattleOption | InventoryItemBase) => {
    // remove item from selectedItems component state
    // upgrade later to direvive lists from redux state directery not through component state
    if (item.type === 'potion' || item.type === 'ration') {
      setSelectedItems(prev =>
        prev?.filter(invItem => invItem.id !== item.id) || []
      );
    }

    dispatch(useInventoryItemThunk(item));
  }


  return (
    <div
      id='PartyScreen-wrapper'
      className='flex flex-col items-center min-h-screen p-4 bg-[url("/background_images/supply_room.png")] bg-cover bg-no-repeat bg-center'>

      <div
        id='PartyScreen-content'
        className='mt-4 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
        style={{
          maxWidth: '600px',
          minHeight: 'fit-content',
          width: '100%',
        }}
      >
        {/********  Character Data Section  *********/}
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
            {
              (activeCharacter && activeCharacter.equippedWeapon) && (
                <div className='mb-4'>
                  <label className='block text-white text-sm font-bold mb-2'>
                    Weapon: {activeCharacter.equippedWeapon.title}
                  </label>
                </div>
              )
            }
            {
              (activeCharacter && activeCharacter.equippedArmor) && (
                <div className='mb-4'>
                  <label className='block text-white text-sm font-bold mb-2'>
                    Armor: {activeCharacter?.equippedArmor?.title ?? 'N/A'}
                  </label>
                </div>
              )
            }
          </div>
        </div>


        {/**********   Inventory Section   **********/}
        <div
          id="character-inventory"
          className="character-inventory p-4 flex flex-col md:flex-row md:space-x-4 md:items-stretch"
        >
          <div
            id="inventory-buttons"
            className="w-full md:w-1/3 mb-4 md:mb-0 flex flex-col border-2 border-white rounded-md bg-black/40 overflow-hidden"
          >
            <button
              className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15"
              onClick={() => handleInventoryButtonClick('attacks')}
            >
              Attacks
            </button>
            <button
              className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15"
              onClick={() => handleInventoryButtonClick('skills')}
            >
              Skills
            </button>
            <button
              className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15"
              onClick={() => handleInventoryButtonClick('potions')}
            >
              Potions
            </button>
            <button
              className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15"
              onClick={() => handleInventoryButtonClick('weapons')}
            >
              Weapons
            </button>
            <button
              className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15"
              onClick={() => handleInventoryButtonClick('equipment')}
            >
              Equipment
            </button>
            <button
              className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15"
              onClick={() => handleInventoryButtonClick('rations')}
            >
              Rations
            </button>
            <button
              className="w-full px-4 py-3 text-sm font-semibold text-white border-b border-white last:border-b-0 hover:bg-white/10 focus:outline-none focus:bg-white/15"
              onClick={() => handleInventoryButtonClick('coins')}
            >
              Coins
            </button>
          </div>
          <div
            id="inventory-items-display"
            className="w-full md:w-2/3 min-h-[220px] border-2 border-white bg-black/50 rounded-lg"
          >
            {/* Inventory details will be displayed here based on selected category */}
            {selectedCategory === 'coins'
              ? <CoinsPanel coins={activeCharacter?.inventory?.coins} />
              : selectedItems?.map((option: BattleOption | InventoryItemBase) => (
                <button
                  type="button"
                  onClick={() => handleInventoryItemClick(option.id)}
                  key={`${option.id}-${option.title}`}
                  className="inline-flex flex-col items-center justify-center
                          min-w-[fit-content] p-4
                          rounded-md
                          bg-transparent cursor-pointer hover:scale-105 transition-transform duration-200
                          text-sm font-bold text-white
                          
                          transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Image
                    key={`${option.id}-${option.title}`}
                    className='flex items-center justify-center'
                    style={{
                      border:
                        selectedInventoryItem?.id === option.id
                          ? '3px solid #FCE300'
                          : 'none',
                    }}
                    alt={''}
                    src={option.icon}
                    width={50}
                    height={50}
                  />
                  <span className="mt-2 text-sm text-white font-bold text-center"
                  >
                    {option.title}
                  </span>
                </button>
              ))}

          </div>
        </div>


        {/************ Party Members Section  **********/}
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

        {
          selectedInventoryItem &&
          < InventoryItemModal
            isOpen={isItemModalOpen}
            closeModal={setIsItemModalOpen}
            inventoryItem={selectedInventoryItem}
            handleInventorySelect={handleItemSelect}
          />
        }


      </div>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
