'use client';
import Image from 'next/image';

export default function Splash() {
  const handleContinueQuest = () => {
    // Logic to continue the quest
    console.log('Continue Quest clicked');
  };
  const handleStartQuest = () => {
    // Logic to start the quest
    console.log('Start Quest clicked');
  };

  return (
    <div
      className='flex flex-col items-center p-8 min-h-screen'
      style={{
        backgroundColor: '#d9d9d9',
      }}
    >
      <div className='flex flex-col items-center w-fit'>
        <header
          className='text-center text-5xl text-white p-2'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          Isekai Quest
        </header>
        <figure>
          <Image
            alt='Isekai Quest world map'
            src='/WorldMap.svg'
            width={600}
            height={400}
          />
        </figure>
        <p
          className='text-center text-balance text-2xl text-white p-2'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          Isekai Quest is a single-player adventure where you create your
          character and explore a vibrant fantasy world. Engage in quests,
          battle monsters in turn-based combat, and collect rewards. Navigate
          through towns, visit guilds for quests, and shop for supplies.
          Experience nostalgia with a simple UI and immersive gameplay. Future
          updates will enhance social interaction and character attributes.
        </p>
        <div
          className='flex justify-around w-full mt-3'
          style={{ backgroundColor: '#d9d9d9' }}
        >
          <button
            className='rounded-full text-center text-2xl text-white p-4 hover:cursor-pointer'
            style={{ backgroundColor: '#8E9CC9' }}
            onClick={handleContinueQuest}
          >
            Continue Quest
          </button>
          <button
            className='rounded-full text-center text-2xl text-white p-4 hover:cursor-pointer'
            style={{ backgroundColor: '#8E9CC9' }}
            onClick={handleStartQuest}
          >
            Start Quest
          </button>
        </div>
      </div>
    </div>
  );
}
