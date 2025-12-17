'use client';

import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';
import { MarketBooth } from '@/components/ui/MarketBooth/MarketBooth';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

const Weapons = () => {
    useProtectedRoute();
    return (
        <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/weaponsBooth_background.png")] bg-cover bg-no-repeat bg-center'>
            <ControlPanel />
            <MarketBooth />
        </div>
    );
};

export default Weapons;