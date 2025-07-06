'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import LoginModal from '@/components/ui/LoginModal/LoginModal';

import Image from 'next/image';

export default function SplashScreen() {
  const router = useRouter();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleContinueQuest = () => {
    setIsLoginModalOpen(true);
  };

  const handleStartQuest = () => {
    router.push('/createcharacter');
  };

  return (
    <div
      className="flex flex-col items-center p-8 min-h-screen bg-[url('/avatars_townScene.png')] bg-cover bg-no-repeat bg-center"
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
          className='text-center text-balance text-2xl text-white pt-3.5 pb-3.5 p-5'
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
        <div className='flex flex-col sm:flex-row justify-around w-full mt-3 bg-transparent'>
          <button
            className='rounded-full text-center text-2xl text-white p-4 m-1 hover:cursor-crosshair'
            style={{
              backgroundColor: '#8E9CC9',
              flex: 1,
              flexBasis: 0,
            }}
            onClick={handleContinueQuest}
          >
            Continue Quest
          </button>
          <button
            className='rounded-full text-center text-2xl text-white p-4 m-1 hover:cursor-crosshair'
            style={{
              backgroundColor: '#8E9CC9',
              flex: 1,
              flexBasis: 0,
            }}
            onClick={handleStartQuest}
          >
            Start Quest
          </button>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} closeModal={setIsLoginModalOpen} />
    </div>
  );
}
