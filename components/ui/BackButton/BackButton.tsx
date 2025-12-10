'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <button
      className={`flex flex-row justify-center items-center hover:cursor-pointer `}
      onClick={handleBack}
    >
      <Image
        src={'/homescreen_icons/backStep_image.png'}
        alt={'Back Icon'}
        width={125}
        height={125}
        className='flex items-center justify-center'
      />
    </button>
  );
}
