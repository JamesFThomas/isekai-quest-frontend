'use client';

import { useState } from 'react';

import InteractionPanel, {
  PanelOption,
} from '@/components/ui/InteractionPanel/InteractionPanel';

import LogoutButton from '../../ui/LogoutButton/LogoutButton';

import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/lib/reduxHooks';

import { logout } from '../../../lib/features/auth/AuthSlice';

import controlOptions from '@/data/contolOptions';

import startsVilleOptions from '@/data/startsVilleOptions';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

export default function HomeScreen() {
  const router = useRouter();

  useProtectedRoute();

  const [controlArray] = useState<PanelOption[]>(controlOptions);

  const [startsVilleArray] = useState<PanelOption[]>(startsVilleOptions);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/table_background.png")] bg-cover bg-no-repeat bg-center'>
      <div className='home-screen-container flex flex-col items-center gap-4'>
        <InteractionPanel title='Controls' optionArray={controlArray} />
        <InteractionPanel title='StartsVille' optionArray={startsVilleArray} />
      </div>
      <div className='flex flex-col items-center w-fit m-2'>
        <LogoutButton onLogout={handleLogout} />
      </div>
    </div>
  );
}
