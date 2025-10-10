'use client';

import { useState } from 'react';
import Image from 'next/image';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';
import questStories from '../../../data/questsOptions';
import DetailsModal from '@/components/ui/DetailsModal/DetailsModal';
import { QuestStory } from '@/types/quest';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import { setAcceptedQuest } from '@/lib/features/quest/QuestSlice';

export default function QuestBoardScreen() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<QuestStory | null>(null);

  const dispatch = useAppDispatch();

  const acceptedQuest = useAppSelector((state) => state.quest.acceptedQuest);

  const handleAcceptClick = (quest: QuestStory) => {
    dispatch(setAcceptedQuest(quest));
  };

  const handleQuestClick = (quest: QuestStory) => {
    setSelectedQuest(quest);
    setIsDetailsModalOpen(true);
  };
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center p-6 min-h-screen bg-[url("/background_images/guild_wall.png")] bg-cover bg-no-repeat bg-center'>
      <div className="avatar-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-[100%] max-w-[900px] h-[100%] min-h-[600px] bg-[url('/background_images/quest_board2.png')] bg-cover bg-no-repeat bg-center">
        {questStories.map((quest) => {
          const isAccepted = acceptedQuest?.id === quest.id;
          return (
            <button
              key={quest.id}
              className={`flex flex-col items-center justify-center cursor-pointer transition-transform duration-200`}
              onClick={() => handleQuestClick(quest)}
            >
              <Image
                key={quest.id}
                className={`flex items-center justify-center ${isAccepted
                    ? 'opacity-60 ring-3 ring-yellow-300 scale-110'
                    : 'hover:scale-125'
                  }`}
                alt={`${quest.name} Quest Image`}
                src={'/guildscreen_icons/scrollimage.png'}
                height={120}
                width={120}
              />
              <span className='text-center text-sm text-white font-semibold z-1'>
                {quest.name}
              </span>
            </button>
          );
        })}
      </div>
      <div>
        <BackButton />
      </div>
      <DetailsModal
        isOpen={isDetailsModalOpen}
        quest={selectedQuest}
        closeModal={setIsDetailsModalOpen}
        acceptQuest={handleAcceptClick}
      />
    </div>
  );
}
