'use client';

import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import { MarketBooth } from '@/components/ui/MarketBooth/MarketBooth';

const Armor = () => {
    useProtectedRoute();
    return (
        <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/armorBooth_background.png")] bg-cover bg-no-repeat bg-center'>
            <ControlPanel />
            <MarketBooth />
        </div>
    );
};

export default Armor;