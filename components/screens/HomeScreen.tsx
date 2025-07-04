'use client';

import LogoutButton from '../ui/LogoutButton';

export default function HomeScreen() {
  return (
    <div
      className='flex flex-col items-center justify-center p-8 min-h-screen'
      style={{
        backgroundColor: '#d9d9d9',
      }}
    >
      <div className='flex flex-col items-center w-fit'>
        <LogoutButton />
      </div>

      <div className='flex flex-col items-center'>
        <header
          className='text-center text-4xl text-white p-3.5'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          Controls
        </header>
        <div
          className='mt-4'
          style={{
            backgroundColor: 'white',
            maxWidth: '600px',
            minHeight: 'fit-content',
            width: '100%',
          }}
        >
          <div className='controls-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
            <div className='flex items-center justify-center'>Map</div>
            <div className='flex items-center justify-center'>Party</div>
          </div>
        </div>
        <header
          className='text-center text-4xl text-white p-3.5'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          StartsVille
        </header>
        <div
          className='mt-4 text-white'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            minHeight: 'fit-content',
            width: '100%',
          }}
        >
          <div className='town-grid p-4 flex flex-col md:flex-row md:space-x-6'>
            <div className='bg-white character-image w-full md:w-1/3 flex items-center justify-center md:h-auto'>
              Guild
            </div>
            <div className='bg-white character-image w-full md:w-1/3 flex items-center justify-center md:h-auto'>
              Inn
            </div>
            <div className='bg-white character-image w-full md:w-1/3 flex items-center justify-center md:h-auto'>
              Market
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
