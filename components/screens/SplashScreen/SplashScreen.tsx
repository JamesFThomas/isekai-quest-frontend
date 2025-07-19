'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import LoginModal from '../..//ui/LoginModal/LoginModal';

import Image from 'next/image';

import { useAppDispatch } from '@/lib/reduxHooks';

import { login, User } from '../../../lib/features/auth/AuthSlice';

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
    <div className="flex justify-center items-center min-h-screen bg-[url('/background_images/avatars_townScene.png')] bg-cover bg-no-repeat bg-center p-8">
      <div className='flex flex-col items-center'>
        <div className='logo-container max-w-[600px] w-full flex justify-center'>
          <figure>
            <Image
              alt='Isekai Quest Logo'
              src='/logos/SplashLogo_ShortSword.png'
              width={600}
              height={400}
              className='w-full h-auto'
            />
          </figure>
        </div>

        <div className='w-full max-w-[600px] flex flex-col sm:flex-row justify-around items-center gap-4'>
          <button
            className='rounded-full text-center text-2xl text-white p-4 hover:cursor-pointer w-full sm:w-auto flex-1'
            style={{
              backgroundColor: '#8E9CC9',
            }}
            onClick={handleContinueQuest}
          >
            Continue Quest
          </button>
          <button
            className='rounded-full text-center text-2xl text-white p-4 hover:cursor-pointer w-full sm:w-auto flex-1'
            style={{
              backgroundColor: '#8E9CC9',
            }}
            onClick={handleStartQuest}
          >
            Start Quest
          </button>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        closeModal={setIsLoginModalOpen}
        handleLogin={handleLogin}
      />
    </div>
  );
}
