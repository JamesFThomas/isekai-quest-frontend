'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import InteractionPanel from '@/components/ui/InteractionPanel/InteractionPanel';
import { guildOptions } from '@/data/screenOptions/guildOptions';
import { marketOptions } from '@/data/screenOptions/marketOptions';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

export default function MarketScreen() {
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='home-screen-container flex flex-col items-center gap-4'>
        <InteractionPanel title='Town Market' optionArray={marketOptions} />
      </div>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
