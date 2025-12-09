'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

const Rations = () => {
    useProtectedRoute();
    return (
        <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/rationsBooth_background.png")] bg-cover bg-no-repeat bg-center'>
            <h1 className='text-4xl font-bold'>Rations Booth</h1>
            <p className='mt-4'>Coming Soon!</p>
            <div className='mt-2'>
                <BackButton />
            </div>
        </div>
    );
};

export default Rations;