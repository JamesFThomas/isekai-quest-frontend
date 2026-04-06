'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import LoginModal from '../..//ui/LoginModal/LoginModal';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';

import Image from 'next/image';

import { useAppDispatch } from '@/lib/reduxHooks';

import { login, User } from '../../../lib/features/auth/AuthSlice';
import { InformationIcon } from '@/components/ui/InformationIcon/InformationIcon';
import { 
  // authenticateAccountLocalStorage, 
  // loadPlayerSaveDataLocalStorage, 
  savePlayerProgressLocalStorage
}
   from '@/lib/persistence/localPersistence';
import { SavePlayerProgressInput } from '@/types/persistence';

export default function SplashScreen() {
  const router = useRouter();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleContinueQuest = () => {
    setIsLoginModalOpen(true);
  };

  const handleStartQuest = () => {
    setIsNavigating(true);
    router.push('/createcharacter');
  };

  const dispatch = useAppDispatch();

  const handleLogin = (user: User) => {
    dispatch(login(user));
  };

  // const testAuthentication = async () => {
  //       console.log('button clicked');
  //         // Test authentication method
  //         const testCredentials = {
  //           email: "testingjft+1@gmail.com",
  //           password: "testingAccountPassword1",

  //         };
  //         const response = await authenticateAccountLocalStorage(testCredentials);
  //         console.log('Authentication response:', response);
  // }

  // const testLoadPlayerSaveData = async () => {
  //   // Implement a test for loading player save data based on account ID
  //   console.log('Testing loadPlayerSaveData with accountId:');
  //   // You would call the actual loadPlayerSaveData function here and log the response

  //   const testSaveInput = {
  //     // Replace with a valid account ID for testing
  //     accountId: "", 
  //   };
  //   const response = await loadPlayerSaveDataLocalStorage(testSaveInput);
  //   console.log('Load Player Save Data response:', response);

  // }

  const testSavePlayerProgress = async () => {
    // Implement a test for saving player progress
    console.log('Testing savePlayerProgress with playerId and sample data:');
    // You would call the actual savePlayerProgress function here and log the response
const testSaveProgressInput: SavePlayerProgressInput = {
  playerId: '',
  characterData: {
    id: '6f4c8663-8a82-4fcd-b588-d14ce4d942cf',
    name: 'Barry Barbarian',
    avatar: '/character_avatars/barbarian_avatar3.png',
    hp: 85,
    maxHp: 100,
    mp: 90,
    maxMp: 100,
    class: 'barbarian',
    level: 2,
    inventory: {
      attacks: [],
      skills: [],
      coins: {
        gold: 5,
        silver: 2,
        copper: 0,
      },
      weapons: [],
      equipment: [],
      rations: [],
      potions: [],
    },
    partyMembers: [],
  },
  progressionData: {
    completedQuestIds: ['ambush-alley-recon'],
    currentTown: 'GuildHall',
  },
};
    const response = await savePlayerProgressLocalStorage(testSaveProgressInput);
    console.log('Save Player Progress response:', response);
  };


  return (
    <div className="relative flex p-8 justify-center items-center min-h-screen bg-[url('/background_images/avatars_townScene2.png')] bg-cover bg-center bg-no-repeat">
      {/* Button to test authentication method in localstorage */}
      <button
        aria-label='Test Authentication Button'
        className='z-50 absolute top-1 right-1 bg-[#8E9CC9] hover:bg-[#7A8FB6] text-white p-2 rounded-full hover:cursor-pointer'
        onClick={ () => testSavePlayerProgress()}
        >
        click me
      </button>
      {/* Button to test authentication method in localstorage */}
      
      <div className='absolute top-1 right-1 pt-8'>
        <InformationIcon pageKey='splash' />
      </div>
      <div className='flex flex-col items-center'>
        <div className='logo-container max-w-[600px] w-full flex justify-center'>
          <figure>
            <Image
              alt='Isekai Quest Logo'
              aria-label='Isekai Quest Logo'
              src='/logos/SplashLogo_ShortSword.png'
              width={600}
              height={400}
              className='w-full h-auto'
            />
          </figure>
        </div>

        <section
          aria-label='Quest Actions'
          className='w-full max-w-[600px] flex flex-col sm:flex-row justify-around items-center gap-4'
        >
          <button
            aria-label='Continue Quest Button'
            className='rounded-full text-center text-2xl text-white p-4 hover:cursor-pointer w-full sm:w-auto flex-1 bg-[#8E9CC9] hover:bg-[#7A8FB6] transition-colors duration-300e'
            onClick={handleContinueQuest}
          >
            Continue Quest
          </button>
          <button
            aria-label='Start Quest Button'
            className={`rounded-full text-2xl text-white p-4 hover:cursor-pointer
              w-full sm:w-auto flex-1 bg-[#8E9CC9] hover:bg-[#7A8FB6]
              transition-colors duration-300 disabled:opacity-70
              disabled:cursor-not-allowed`}
            disabled={isNavigating}
            onClick={handleStartQuest}
          >
            <div className='flex items-center justify-center gap-2'>
              Start Quest
              {isNavigating && <LoadingSpinner />}
            </div>
          </button>
        </section>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        closeModal={setIsLoginModalOpen}
        handleLogin={handleLogin}
      />
    </div>
  );
}


