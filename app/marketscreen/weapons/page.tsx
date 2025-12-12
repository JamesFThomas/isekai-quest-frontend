'use client';

import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

const Weapons = () => {
    useProtectedRoute();
    return (
        <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/weaponsBooth_background.png")] bg-cover bg-no-repeat bg-center'>
            <ControlPanel />
            <div
                className='weapons-booth-container flex flex-col justify-center items-center gap-4'
                style={{
                    flexGrow: 1
                }}
            >
                <div
                    id='weapons-booth-content'
                    className='mt-4 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
                    style={{
                        maxWidth: '600px',
                        minHeight: 'fit-content',
                        width: '100%',
                    }}
                >

                    <h1 className='text-4xl font-bold'>Weapons Booth</h1>
                    <p className='mt-4'>Coming Soon!</p>
                </div>
            </div>
        </div>
    );
};

export default Weapons;