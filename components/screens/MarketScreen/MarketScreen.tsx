'use client';

import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';
import InteractionPanel from '@/components/ui/InteractionPanel/InteractionPanel';
import { marketOptions } from '@/data/screenOptions/marketOptions';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

export default function MarketScreen() {
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/market_background.png")] bg-cover bg-no-repeat bg-center'>
      <ControlPanel />
      <div
        className='market-screen-container flex flex-col justify-center items-center gap-4'
        style={{
          flexGrow: 1
        }}
      >
        <InteractionPanel title='Town Market' optionArray={marketOptions} />
      </div>
    </div>
  );
}
