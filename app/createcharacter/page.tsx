'use client';

export default function CreateCharacter() {
  return (
    <div
      className='flex flex-col items-center justify-center p-8 min-h-screen'
      style={{
        backgroundColor: '#d9d9d9',
      }}
    >
      <div className='flex flex-col items-center'>
        <header
          className='text-center text-5xl text-white p-3.5'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          Choose Your Avatar
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
          <div className='grid grid-cols-3 gap-4 p-4'>
            <div className='bg-gray-200 h-32 flex items-center justify-center'>
              Avatar 1
            </div>
            <div className='bg-gray-200 h-32 flex items-center justify-center'>
              Avatar 2
            </div>
            <div className='bg-gray-200 h-32 flex items-center justify-center'>
              Avatar 3
            </div>
            <div className='bg-gray-200 h-32 flex items-center justify-center'>
              Avatar 4
            </div>
            <div className='bg-gray-200 h-32 flex items-center justify-center'>
              Avatar 5
            </div>
            <div className='bg-gray-200 h-32 flex items-center justify-center'>
              Avatar 6
            </div>
          </div>
        </div>
        <div
          className='mt-4 text-white'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            minHeight: '400px',
            width: '100%',
          }}
        >
          Avatar Preview + Data
        </div>
        <div // Button Box
          className='flex flex-col sm:flex-row justify-around w-full mt-3'
          style={{ backgroundColor: '#d9d9d9' }}
        >
          <button
            className='rounded-full text-center text-2xl text-white p-4 m-1 hover:cursor-pointer'
            style={{
              backgroundColor: '#8E9CC9',
              flex: 1,
              flexBasis: 0,
            }}
            // onClick={handleStartQuest}
          >
            Create Character
          </button>
        </div>
      </div>
    </div>
  );
}
