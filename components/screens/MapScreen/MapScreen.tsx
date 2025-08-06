'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BackButton from '@/components/ui/BackButton/BackButton';
import CommenceModal from '@/components/ui/CommenceModal /CommenceModal';
import LocationModal from '@/components/ui/LocationModal /LocationModal ';
import useProtectedRoute from '@/lib/hooks/ useProtectedRoute';

import { useAppSelector } from '@/lib/reduxHooks';

import { selectAcceptedQuest } from '@/lib/features/quest/QuestSlice';

export default function MapScreen() {
  const router = useRouter();
  useProtectedRoute();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCommenceModalOpen, setIsCommenceModalOpen] = useState(false);

  const acceptedQuest = useAppSelector(selectAcceptedQuest);

  console.log('Accepted Quest:', acceptedQuest);

  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  const openCommenceModal = () => {
    setIsCommenceModalOpen(true);
  };

  const onCommenceQuest = () => {
    // Logic to handle quest commencement
    if (acceptedQuest) {
      // redirect user to storyScreen if quest was accepted
      router.push('/storyscreen');
      setIsCommenceModalOpen(false);
    }
  };

  const currentLocation = useAppSelector(
    (state) => state.character.characterLocation
  );

  const questName = useAppSelector((state) => state.quest.acceptedQuest?.name);

  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/map_hands.png")] bg-cover bg-no-repeat bg-center'>
      <button
        className='compass-image flex flex-col items-center justify-center cursor-pointer'
        onClick={openLocationModal}
      >
        <Image
          alt={'Compass Icon'}
          src={'/mapscreen_icons/compass_icon.png'}
          width={300}
          height={300}
        />
        <span className='text-center  text-white font-semibold z-1 mt-[-4rem]'>
          Location: {currentLocation}
        </span>
      </button>
      <button
        className='shield-image flex flex-col items-center justify-center cursor-pointer'
        onClick={openCommenceModal}
      >
        <Image
          alt={'Compass Icon'}
          src={'/mapscreen_icons/shield_icon.png'}
          width={300}
          height={300}
        />
        <span className='text-center text-white font-semibold z-1'>
          Quest: {questName ? questName : 'None Accepted'}
        </span>
      </button>
      <div className='mt-2'>
        <BackButton />
      </div>
      <LocationModal
        isOpen={isLocationModalOpen}
        closeModal={setIsLocationModalOpen}
      />
      <CommenceModal
        isOpen={isCommenceModalOpen}
        quest={acceptedQuest ? acceptedQuest : null}
        closeModal={setIsCommenceModalOpen}
        commenceQuest={onCommenceQuest}
      />
    </div>
  );
}
