'use client';

import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import Image from 'next/image';

import {
  useAppDispatch,
  useAppSelector,
} from '@/lib/reduxHooks';

import {
  selectActiveCharacter,
  selectCharacterParty,
  utilizeInventoryItemThunk,
} from '@/lib/features/character/CharacterSlice';
import CharacterDisplayCard from '@/components/ui/CharacterDisplayCard/CharacterDisplayCard';
import { useLayoutEffect, useRef, useMemo, useState } from 'react';
import { BattleOption } from '@/types/battle';
import { InventoryItemBase } from '@/types/character';
import CoinsPanel from '../../ui/CoinPanel/CoinsPanel';
import { InventoryItemModal } from './components/InventoryItemModal';
import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';



export default function PartyScreen() {
  useProtectedRoute();

  //button height reference for calculating inventory items display height
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const [buttonsHeight, setButtonsHeight] = useState<number>(0);

  // State for selected inventory category and item
  const [selectedInventoryKey, setSelectedInventoryKey] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<'coins' | 'items' | undefined>();
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<BattleOption | InventoryItemBase>();

  // State for item modal visibility
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  // Redux hooks and state selectors
  const dispatch = useAppDispatch();
  const activeCharacter = useAppSelector(selectActiveCharacter);
  const characterParty = useAppSelector(selectCharacterParty);


  const inventoryItems = (activeCharacter && activeCharacter.inventory && selectedInventoryKey) ? activeCharacter.inventory[selectedInventoryKey as keyof typeof activeCharacter.inventory] : [];



  // Update buttons height on mount and when buttonsRef changes
  useLayoutEffect(() => {
    const el = buttonsRef.current;
    if (!el) return;

    const update = () => {
      const next = Math.ceil(el.getBoundingClientRect().height);
      setButtonsHeight(next);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);



  const handleInventoryButtonClick = (buttonType: string) => {
    if (activeCharacter && activeCharacter.inventory) {
      switch (buttonType) {
        case 'attacks':
          setSelectedInventoryKey('attacks')
          setSelectedCategory('items')
          break;
        case 'skills':
          setSelectedInventoryKey('skills')
          setSelectedCategory('items')
          break;
        case 'potions':
          setSelectedInventoryKey('potions')
          setSelectedCategory('items')
          break;
        case 'weapons':
          setSelectedInventoryKey('weapons')
          setSelectedCategory('items')
          break;
        case 'equipment':
          setSelectedInventoryKey('equipment')
          setSelectedCategory('items')
          break;
        case 'rations':
          setSelectedInventoryKey('rations')
          setSelectedCategory('items')
          break;
        case 'coins':
          setSelectedCategory('coins')
          break;
      }
    }
  };



  const handleInventoryItemClick = (itemId: string) => {

    const selectedItem = Array.isArray(inventoryItems) ? inventoryItems.find(item => item.id === itemId) : undefined

    if (selectedItem) {
      setSelectedInventoryItem(selectedItem)
      setIsItemModalOpen(true);
    }
  }

  const handleItemSelect = (item: BattleOption | InventoryItemBase) => {
    dispatch(utilizeInventoryItemThunk(item));
    setIsItemModalOpen(false);
  }

  // build hash object to track item occurences and display count badge if > 1
  const createItemCountMap = () => {

    // create deduplicate array of items
    const uniqueData = [];
    const seenIds = new Set();

    for (const item of inventoryItems as (BattleOption | InventoryItemBase)[]) {
      // Check if the id has already been added to the Set
      if (!seenIds.has(item.id)) {
        // If not, add the id to the Set and the object to the unique array
        seenIds.add(item.id);
        uniqueData.push(item);
      }
    }

    const itemCountMap: { [key: string]: number } = {};
    if (Array.isArray(inventoryItems)) {
      inventoryItems.forEach((item) => {
        if (itemCountMap[item.id]) {
          itemCountMap[item.id] += 1;
        } else {
          itemCountMap[item.id] = 1;
        }
      });
    }

    uniqueData.sort((a, b) => a.title.localeCompare(b.title));
    return [itemCountMap, uniqueData] as const;
  };

  // derived count of items in inventory
  const [itemCountHash, uniqueItems] = createItemCountMap();

  return (
    <div
      id='PartyScreen-wrapper'
      className='flex flex-col items-center min-h-screen p-4 bg-[url("/background_images/supply_room.png")] bg-cover bg-no-repeat bg-center'>
      < ControlPanel />
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
            ref={buttonsRef}
            id="inventory-buttons"
            className="w-full md:w-1/3 mb-4 md:mb-0 flex flex-col border-2 border-white rounded-md bg-black/40"
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
          {/* Inventory details will be displayed here based on selected category */}
          <div
            id="inventory-items-display"
            className="w-full border-2 border-white bg-black/50 rounded-lg overflow-y-auto"
            style={buttonsHeight ? { height: `${buttonsHeight}px` } : undefined}
          >
            {selectedCategory === 'coins'
              ? <CoinsPanel coins={activeCharacter?.inventory?.coins} />
              :
              <div
                id="inventory-items-display-grid"
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  lg:grid-cols-3
                  gap-4
                  p-1
                  place-items-top
                  "
              >

                {uniqueItems.map((option: BattleOption | InventoryItemBase, _index) => (

                  <button
                    type="button"
                    onClick={() => handleInventoryItemClick(option.id)}
                    key={`${option.title}-button-${_index}`}
                    className="inline-flex flex-col items-center justify-center
                          min-w-[fit-content] p-2
                          rounded-md
                          bg-transparent cursor-pointer hover:scale-105 transition-transform duration-200
                          text-sm font-bold text-white
                          transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <Image
                      key={`$${option.title}`}
                      className='flex items-center justify-center'
                      style={{
                        border:
                          selectedInventoryItem?.id === option.id
                            ? '3px solid #FCE300'
                            : 'none',
                      }}
                      alt={option.title}
                      src={option.icon}
                      width={50}
                      height={50}
                    />
                    <span className="mt-2 text-sm text-white font-bold text-center"
                    >
                      {option.title}
                    </span>
                    {/* count badge for multiple items */}
                    {
                      itemCountHash[option.id] > 1 &&
                      <span className="mt-1 text-xs text-yellow-300 font-semibold">
                        x {itemCountHash[option.id]}
                      </span>
                    }
                  </button>
                ))}
              </div>
            }

          </div>
        </div>


        {/************ Party Members Section  **********/}
        <div id="party-members-grid" className="w-full p-4">
          <div className="flex flex-row flex-wrap gap-2 border-2 border-white rounded-lg bg-black/50 p-4">
            {characterParty.length > 0 ? (
              characterParty.map((character, _index) => (
                <CharacterDisplayCard
                  key={`${character.id}-party-member-${_index}`}
                  character={character}
                />
              ))
            ) : activeCharacter?.partyMembers &&
              activeCharacter.partyMembers.length > 0 ? (
              activeCharacter.partyMembers.map((character, _index) => (
                <CharacterDisplayCard
                  key={`${character.id}-party-member-${_index}`}
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
    </div>
  );
}
