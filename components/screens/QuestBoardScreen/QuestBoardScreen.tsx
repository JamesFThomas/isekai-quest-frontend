'use client';

import { useState } from 'react';
import Image from 'next/image';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/ useProtectedRoute';
import questStories from '../../../data/questsOptions';
import DetailsModal from '@/components/ui/DetailsModal/DetailsModal';
import { QuestStory } from '@/types/quest';

export default function QuestBoardScreen() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<QuestStory | null>(null);

  const handleQuestClick = (quest: QuestStory) => {
    setSelectedQuest(quest);
    setIsDetailsModalOpen(true);
  };
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center p-6 min-h-screen bg-[url("/background_images/guild_wall.png")] bg-cover bg-no-repeat bg-center'>
      <div className="avatar-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-[100%] max-w-[900px] h-[100%] min-h-[600px] bg-[url('/background_images/quest_board2.png')] bg-cover bg-no-repeat bg-center">
        {questStories.map((quest) => (
          <button
            key={quest.id}
            className='flex flex-col items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-200'
            onClick={() => handleQuestClick(quest)}
          >
            <Image
              key={quest.id}
              className='flex items-center justify-center'
              alt={`${quest.name} Quest Image`}
              src={'/guildscreen_icons/scrollimage.png'}
              height={120}
              width={120}
            />
            <span className='text-center text-sm text-black font-semibold'>
              {quest.name}
            </span>
          </button>
        ))}
      </div>
      <div>
        <BackButton />
      </div>
      <DetailsModal
        isOpen={isDetailsModalOpen}
        closeModal={setIsDetailsModalOpen}
        quest={selectedQuest}
      />
    </div>
  );
}
