'use client';

import { useState } from 'react';

import InteractionPanel, {
  PanelOption,
} from '@/components/ui/InteractionPanel/InteractionPanel';

import { useRouter } from 'next/navigation';

import startsVilleOptions from '@/data/screenOptions/startsVilleOptions';

import useProtectedRoute from '@/lib/hooks/useProtectedRoute';
import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';

export default function HomeScreen() {
  const router = useRouter();

  useProtectedRoute();

  const [startsVilleArray] = useState<PanelOption[]>(startsVilleOptions);

  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/table_background.png")] bg-cover bg-no-repeat bg-center'>
      <ControlPanel />
      <div
        className='home-screen-container flex flex-col justify-center items-center gap-4'
        style={{
          flexGrow: 1
        }}
      >
        <InteractionPanel title='StartsVille' optionArray={startsVilleArray} />
      </div>
    </div>
  );
}
