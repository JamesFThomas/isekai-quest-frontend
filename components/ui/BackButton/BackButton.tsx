'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <button
      className='rounded-full text-center text-2xl text-white p-3 m-1 hover:cursor-pointer'
      style={{
        backgroundColor: '#8E9CC9',
        flex: 1,
        flexBasis: 0,
      }}
      onClick={handleBack}
    >
      Back
    </button>
  );
}
