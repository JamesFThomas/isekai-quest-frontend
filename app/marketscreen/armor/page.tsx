'use client';

import Image from 'next/image';
import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';
import { selectActiveCharacter } from '@/lib/features/character/CharacterSlice';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';
import { useAppSelector } from '@/lib/reduxHooks';
import CoinsPanel from '@/components/ui/CoinPanel/CoinsPanel';

const Armor = () => {
    useProtectedRoute();
    const activeCharacter = useAppSelector(selectActiveCharacter);

    return (
        <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/armorBooth_background.png")] bg-cover bg-no-repeat bg-center'>
            <ControlPanel />
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
                            className="w-full md:w-2/3 border-2 border-white rounded-lg bg-black/50 text-white flex flex-col justify-center px-6 py-4 space-y-2"
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
                            <div className='mb-4'>
                                <label className='block text-white text-sm font-bold mb-2'>
                                    Armor Booth Items Coming Soon!
                                </label>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Armor;