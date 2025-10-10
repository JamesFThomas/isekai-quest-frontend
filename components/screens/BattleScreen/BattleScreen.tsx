'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

export default function BattleScreen() {
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Battle Screen</h1>
      <p className='mt-4'>Coming Soon!</p>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
