'use client';

import { useState } from 'react';
import Image from 'next/image';

import useProtectedRoute from '@/lib/hooks/useProtectedRoute';
import questStories from '../../../data/screenOptions/questsOptions';
import DetailsModal from '@/components/ui/DetailsModal/DetailsModal';
import { QuestStory } from '@/types/quest';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import { setAcceptedQuest } from '@/lib/features/quest/QuestSlice';
import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';

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
    <div className='flex flex-col items-center justify-start p-6 min-h-screen bg-[url("/background_images/guild_wall.png")] bg-cover bg-no-repeat bg-center'>
      <ControlPanel />

      <div
        className='flex flex-1 w-full items-center justify-center'
        style={{}}
      >
        <div className="questBoard-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-[100%] max-w-[900px] min-h-[600px] bg-[url('/background_images/quest_board2.png')] bg-cover bg-no-repeat bg-center">
          {questStories.map((quest) => {
            const isAccepted = acceptedQuest?.id === quest.id;
            return (
              <button
                key={quest.id}
                className={`flex flex-col items-center justify-center ${quest.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} transition-transform duration-200`}
                onClick={() => handleQuestClick(quest)}
                disabled={quest.disabled}
              >
                <Image
                  key={quest.id}
                  className={`flex items-center justify-center ${
                    isAccepted
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
