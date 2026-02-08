'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CommenceModal from '@/components/ui/CommenceModal/CommenceModal';
import LocationModal from '@/components/ui/LocationModal/LocationModal';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';

import {
  resetFailedQuestToFirstPoint,
  selectAcceptedQuest,
  selectLastEndedQuestId
 } from '@/lib/features/quest/QuestSlice';

 import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';

export default function MapScreen() {
  useProtectedRoute();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCommenceModalOpen, setIsCommenceModalOpen] = useState(false);

  const acceptedQuest = useAppSelector(selectAcceptedQuest);
  const lastEndedQuestId = useAppSelector(selectLastEndedQuestId);

  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  const openCommenceModal = () => {
    if (!acceptedQuest) {
      console.warn('No quest accepted to commence');
      return;
    }
    setIsCommenceModalOpen(true);
  };

  const onCommenceQuest = () => {  // Logic to handle quest commencement
    if (acceptedQuest) {

      if (lastEndedQuestId !== null && acceptedQuest.id === lastEndedQuestId) { // check quest slice for last failed quest ID

        dispatch(resetFailedQuestToFirstPoint());  // reset failed quest to first story point and restart quest
      }

      router.push('/storyscreen');    // redirect user to storyScreen if quest was accepted
      setIsCommenceModalOpen(false);  // close the commence modal
    }
  };

  const currentLocation = useAppSelector(
    (state) => state.character.characterLocation,
  );

  const questName = useAppSelector((state) => state.quest.acceptedQuest?.name);

  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/map_hands.png")] bg-cover bg-no-repeat bg-center'>
      <ControlPanel />

      <div
        className='mapscreen-container flex flex-col justify-center items-center gap-4'
        style={{
          flexGrow: 1,
        }}
      >
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
          className={`shield-image flex flex-col items-center justify-center ${
            acceptedQuest ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          }`}
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
