'use client';

export default function CreateCharacter() {
  return (
    <div
      className='flex flex-col items-center p-8 min-h-screen'
      style={{
        backgroundColor: '#d9d9d9',
      }}
    >
      <div className='flex flex-col items-center w-fit'>
        <header
          className='text-center text-5xl text-white pt-3.5 pb-3.5'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          Create Character
        </header>
        <div
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
