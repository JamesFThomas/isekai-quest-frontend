'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/ useProtectedRoute';

export default function PartyScreen() {
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[url("/background_images/dark_hills.png")] bg-cover bg-no-repeat bg-center'>
      <div className='story-screen-container flex flex-col items-center justify-center w-[100%] max-w-[600px] h-[100%] max-h-[600px] bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'>
        <h1 className='text-4xl font-bold text-white'>Story Screen</h1>
        <p className='mt-4 text-white'>Coming Soon!</p>
        <div className='mt-2'>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
