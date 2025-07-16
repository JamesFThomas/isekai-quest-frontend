'use client';

import InteractionPanel, {
  PanelOption,
} from '@/components/ui/InteractionPanel/InteractionPanel';
import LogoutButton from '../../ui/LogoutButton/LogoutButton';
import controlOptions from '@/data/contolOptions';
import startsVilleOptions from '@/data/startsVilleOptions';
import { useState } from 'react';

export default function HomeScreen() {
  const [controlArray] = useState<PanelOption[]>(controlOptions);
  const [startsVilleArray] = useState<PanelOption[]>(startsVilleOptions);

  return (
    <div
      className='flex flex-col items-center justify-center p-8 min-h-screen'
      style={{
        backgroundColor: '#d9d9d9',
      }}
    >
      <div className='flex flex-col items-center w-fit m-2'>
        <LogoutButton />
      </div>

      <div className='home-screen-container flex flex-col items-center gap-4'>
        <InteractionPanel title='Controls' optionArray={controlArray} />
        <InteractionPanel title='StartsVille' optionArray={startsVilleArray} />
      </div>
    </div>
  );
}
