'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation'

import { selectActiveCharacter } from '@/lib/features/character/CharacterSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import CoinsPanel from '@/components/ui/CoinPanel/CoinsPanel';

import { allEquipment } from '@/data/gameData/equipment';
import { allPotions } from '@/data/gameData/potions';
import { allRations } from '@/data/gameData/rations';
import { allWeapons } from '@/data/gameData/weapons';
import { InventoryItemBase } from '@/types/character';

export const MarketBooth = () => {
    const pathname = usePathname()
    const activeCharacter = useAppSelector(selectActiveCharacter);


    const setDisplayItems = () => {
        switch (pathname) {
            case '/marketscreen/armor':
                return allEquipment;
            case '/marketscreen/weapons':
                return allWeapons;
            case '/marketscreen/potions':
                return allPotions;
            case '/marketscreen/rations':
                return allRations;
            default:
                return [];
        };
    };

    const boothItems: InventoryItemBase[] = setDisplayItems();

    return (
        <div
            className='armor-booth-container flex flex-col justify-center items-center gap-4'
            style={{
                flexGrow: 1
            }}
        >
            <div
                id='Armor-booth-content'
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
                        className="w-full md:w-2/3 border-2 border-white rounded-lg bg-black/50 text-white flex flex-col justify-center items-center px-6 py-4 space-y-2"
                    >
                        <CoinsPanel coins={activeCharacter?.inventory?.coins} />
                    </div>
                </div>

                {/********  Booth Items  *********/}
                <div id="booth-items-container" className="w-full p-4">
                    <div
                        id="booth-items-display"
                        className="flex flex-row flex-wrap gap-2 border-2 border-white rounded-lg bg-black/50 p-4"
                    >
                        {
                            boothItems.map((item) => (
                                <button
                                    key={`${item.id}-${item.title}`}
                                    className="inline-flex flex-col items-center justify-center
                                    min-w-[fit-content] p-4
                                    rounded-md
                                    bg-transparent cursor-pointer hover:scale-105 transition-transform duration-200
                                    text-sm font-bold text-white
                                    transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                                >
                                    <Image
                                        key={`${item.id}-${item.title}`}
                                        className='flex items-center justify-center'
                                        alt={item.title}
                                        src={item.icon}
                                        width={50}
                                        height={50}
                                    />
                                    <span className="mt-2 text-sm text-white font-bold text-center"
                                    >
                                        {item.title}
                                    </span>
                                    <span className="mt-2 text-sm text-white font-bold text-center"
                                    >
                                        {item.price ? `${item.price.gold || 0}G ${item.price.silver || 0}S ${item.price.copper || 0}C` : 'Free'}
                                    </span>
                                </button>
                            ))}

                    </div>

                </div>

            </div>

        </div>
    );
};