'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import LoginModal from '../..//ui/LoginModal/LoginModal';

import Image from 'next/image';

import { useAppDispatch } from '@/lib/reduxHooks';

import { login, User } from '../../../lib/features/auth/AuthSlice';
import { InformationIcon } from '@/components/ui/InformationIcon/InformationIcon';

export default function SplashScreen() {
  const router = useRouter();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleContinueQuest = () => {
    setIsLoginModalOpen(true);
  };

  const handleStartQuest = () => {
    router.push('/createcharacter');
  };

  const dispatch = useAppDispatch();

  const handleLogin = (user: User) => {
    dispatch(login(user));
  };

  return (
    <div className="relative flex p-8 justify-center items-center min-h-screen bg-[url('/background_images/avatars_townScene2.png')] bg-cover bg-center bg-no-repeat">
      <div className='absolute top-1 right-1'>
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
            className='rounded-full text-center text-2xl text-white p-4 hover:cursor-pointer w-full sm:w-auto flex-1 bg-[#8E9CC9] hover:bg-[#7A8FB6] transition-colors duration-300e'
            onClick={handleStartQuest}
          >
            {/* TODO add loading spinner here for CreateCharacter screen redirection  */}
            Start Quest
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
