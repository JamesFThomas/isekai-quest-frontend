'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import {
  selectAcceptedQuest,
  setCurrentStoryPointId,
} from '@/lib/features/quest/QuestSlice';

import {
  setActiveCharacter,
  setActiveOpponent,
} from '@/lib/features/battle/BattleSlice';

import { selectActiveCharacter } from '@/lib/features/character/CharacterSlice';

import { useEffect, useState } from 'react';
import { QuestStory, StoryPoint, StoryPointChoice } from '@/types/quest';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StoryScreen() {
  useProtectedRoute();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const acceptedQuest = useAppSelector(selectAcceptedQuest);
  const activeCharacter = useAppSelector(selectActiveCharacter);

  const [quest, setQuest] = useState<QuestStory | null>(null);
  const [currentStoryPoint, setCurrentStoryPoint] = useState<StoryPoint | null>(
    null
  );

  const handleChoiceSelection = (choice: StoryPointChoice) => {
    if (!quest) return;

    // check choice for battle attribute and redirect to battle screen if it exists
    if (choice.outcome?.battle) {
      // set the next story point ID in the quest state
      dispatch(setCurrentStoryPointId(choice.nextPointId));

      // set the active opponent and character for the battle
      dispatch(setActiveOpponent(choice.outcome.battle.opponent));
      dispatch(setActiveCharacter(activeCharacter));

      // redirect to battle screen
      router.push('/battlescreen');
      return;
    }

    // TODO uncomment this when story points are implemented
    // const nextPoint = quest.storyPoints.find(
    //   (point) => point.id === choice.nextPointId
    // );

    // if (nextPoint) {
    //   setCurrentStoryPoint(nextPoint);
    // }

    console.log(`Selected choice: ${choice.label} - ${choice.text}`);
  };

  useEffect(() => {
    if (acceptedQuest) {
      setQuest(acceptedQuest);
      setCurrentStoryPoint(acceptedQuest.storyPoints[0]);
    }
  }, [acceptedQuest]);

  return (
    <div className='story-screen-container p-4 flex flex-col items-center justify-center h-screen bg-[url("/background_images/dark_hills.png")] bg-cover bg-no-repeat bg-center'>
      <div className='story-screen-content flex flex-col items-center justify-center w-fit h-fit bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'>
        {quest && (
          <h1 className='text-4xl text-white font-bold mt-3'>{quest.name}</h1>
        )}
        {currentStoryPoint && (
          <div className='story-point-content flex flex-col items-center justify-center p-4 w-max-[900px]'>
            <Image
              src={currentStoryPoint.imageSrc}
              alt={`Story Point Image`}
              width={800}
              height={500}
              className='mt-4 rounded-lg'
            />
            <p className='mt-2 w-fit text-white font-bold font'>
              {currentStoryPoint.text}
            </p>
            <div className='choice-button-grid grid gap-3 mt-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
              {currentStoryPoint.choices.map((choice, index) => (
                <button
                  key={index}
                  className='bg-[#8E9CC9] w-full inline-flex justify-center rounded-full px-3 py-2 text-sm font-semibold text-white hover:cursor-pointer'
                  onClick={() => {
                    handleChoiceSelection(choice);
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='mt-2'>
        <BackButton />
      </div>
    </div>
  );
}
