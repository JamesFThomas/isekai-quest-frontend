'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/ useProtectedRoute';

import Image from 'next/image';

export default function MapScreen() {
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/map_hands.png")] bg-cover bg-no-repeat bg-center'>
      <button className='compass-image flex items-center justify-center cursor-pointer'>
        <Image
          alt={'Compass Icon'}
          src={'/mapscreen_icons/compass_icon.png'}
          width={300}
          height={300}
        />
      </button>
      <button className='shield-image flex items-center justify-center cursor-pointer'>
        <Image
          alt={'Compass Icon'}
          src={'/mapscreen_icons/shield_icon.png'}
          width={300}
          height={300}
        />
      </button>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
