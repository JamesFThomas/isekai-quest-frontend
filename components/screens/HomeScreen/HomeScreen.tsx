'use client';

import InteractionPanel from '@/components/ui/InteractionPanel/InteractionPanel';
import LogoutButton from '../../ui/LogoutButton/LogoutButton';

export default function HomeScreen() {
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
        <InteractionPanel
          title='Controls'
          optionArray={[{ name: 'Map' }, { name: 'Party' }]}
        />
        <InteractionPanel
          title='StartsVille'
          optionArray={[{ name: 'Guild' }, { name: 'Inn' }, { name: 'Market' }]}
        />
      </div>
    </div>
  );
}
