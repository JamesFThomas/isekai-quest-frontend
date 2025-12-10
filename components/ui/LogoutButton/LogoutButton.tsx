'use client';

import { useState } from 'react';
import Image from 'next/image';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { logout } from '@/lib/features/auth/AuthSlice';
import { useAppDispatch } from '@/lib/reduxHooks';
import router from 'next/router';


export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(logout());
      router.push('/');
    }, 1500);
  };

  return (
    <button
      className={`flex flex-row justify-center items-center hover:cursor-pointer `}
      onClick={handleLogout}
    >
      {isLoading ? <LoadingSpinner /> : (
        <Image
          src={'/homescreen_icons/logout_image.png'}
          alt={'Logout Icon'}
          width={125}
          height={125}
          className='flex items-center justify-center'
        />
      )}
    </button>
  );
}
