'use client';

import { useState } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type LogoutButtonProps = {
  onLogout: () => void;
};

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogout();
    }, 1500);
  };

  return (
    <button
      className={`flex flex-row justify-center items-center w-full p-3 rounded-full font-semibold text-3xl text-white m-1 hover:cursor-pointer `}
      style={{
        backgroundColor: '#8E9CC9',
        flex: 1,
        flexBasis: 0,
      }}
      onClick={handleLogout}
    >
      {isLoading ? <LoadingSpinner /> : 'Logout'}
    </button>
  );
}
