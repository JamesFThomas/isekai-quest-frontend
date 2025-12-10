'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

const Potions = () => {
    useProtectedRoute();
    return (
        <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/potionsBooth_background.png")] bg-cover bg-no-repeat bg-center'>
            <ControlPanel />
            <div
                className='home-screen-container flex flex-col justify-center items-center gap-4'
                style={{
                    flexGrow: 1
                }}
            >
                <h1 className='text-4xl font-bold'>Potions Booth</h1>
                <p className='mt-4'>Coming Soon!</p>
            </div>
        </div>
    );
};

export default Potions;