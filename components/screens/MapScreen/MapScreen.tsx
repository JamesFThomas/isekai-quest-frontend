'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/ useProtectedRoute';
import {
  // useAppDispatch,
  useAppSelector,
} from '@/lib/reduxHooks';

import Image from 'next/image';

export default function MapScreen() {
  useProtectedRoute();

  // const dispatch = useAppDispatch();

  const currentLocation = useAppSelector(
    (state) => state.character.characterLocation
  );

  const questName = useAppSelector((state) => state.quest.acceptedQuest?.name);

  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/map_hands.png")] bg-cover bg-no-repeat bg-center'>
      <button className='compass-image flex flex-col items-center justify-center cursor-pointer'>
        <Image
          alt={'Compass Icon'}
          src={'/mapscreen_icons/compass_icon.png'}
          width={300}
          height={300}
        />
        <span className='text-center  text-white font-semibold z-1 mt-[-4rem]'>
          Location: {currentLocation}
        </span>
      </button>
      <button className='shield-image flex flex-col items-center justify-center cursor-pointer'>
        <Image
          alt={'Compass Icon'}
          src={'/mapscreen_icons/shield_icon.png'}
          width={300}
          height={300}
        />
        <span className='text-center text-white font-semibold z-1'>
          Quest: {questName ? questName : 'None Accepted'}
        </span>
      </button>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
