'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import InteractionPanel from '@/components/ui/InteractionPanel/InteractionPanel';
import { marketOptions } from '@/data/screenOptions/marketOptions';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

export default function MarketScreen() {
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/market_background.png")] bg-cover bg-no-repeat bg-center'>
      <div className='home-screen-container flex flex-col items-center gap-4'>
        <InteractionPanel title='Town Market' optionArray={marketOptions} />
      </div>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
