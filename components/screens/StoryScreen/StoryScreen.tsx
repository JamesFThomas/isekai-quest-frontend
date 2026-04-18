'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import {
  selectAcceptedQuest,
  selectCurrentStoryPoint,
  setCurrentStoryPointId,
  setPendingBattleDetails,
  markQuestCompletedAndClearState,
  markQuestFailedAndClearState,
} from '@/lib/features/quest/QuestSlice';

import {
  resetBattleState,
  setBattleStartContext,
} from '@/lib/features/battle/BattleSlice';

import {
  selectActiveCharacter,
  applyQuestEffect,
} from '@/lib/features/character/CharacterSlice';

import { StoryPointChoice } from '@/types/quest';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StoryScreen() {
  useProtectedRoute();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const quest = useAppSelector(selectAcceptedQuest);
  const currentStoryPoint = useAppSelector(selectCurrentStoryPoint);
  const activeCharacter = useAppSelector(selectActiveCharacter);

  const handleChoiceSelection = (choice: StoryPointChoice) => {
    if (!quest) return;

    if (choice.outcome?.battle) {
      const battle = choice.outcome.battle;
      dispatch(resetBattleState());
      dispatch(setPendingBattleDetails(battle));
      dispatch(setBattleStartContext({
        activeCharacter,
        activeOpponent: battle.opponent,
        escapeAllowed: battle.escapeAllowed ?? false,
        reward: battle.reward,
        escapePenalty: battle.escapePenalty,
        nextPoints: battle.nextPoints,
      }));
      router.push('/battlescreen');
      return;
    }

    if (choice.outcome?.endState === 'completed') {
      dispatch(markQuestCompletedAndClearState());
      router.push('/homescreen');
      return;
    }

    if (choice.outcome?.endState === 'failed') {
      dispatch(markQuestFailedAndClearState());
      router.push('/homescreen');
      return;
    }

    if (choice.outcome?.effect) {
      dispatch(applyQuestEffect(choice.outcome.effect));
    }

    if (choice.nextPointId) {
      dispatch(setCurrentStoryPointId(choice.nextPointId));
    }
  };

  return (
    <div className='story-screen-container p-4 flex flex-col items-center justify-center h-screen bg-[url("/background_images/dark_hills.png")] bg-cover bg-no-repeat bg-center'>
      <div className='story-screen-content px-6 flex flex-col items-center justify-center w-fit h-fit bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'>
        {quest && (
          <h1 className='text-4xl text-white font-bold mt-3'>{quest.name}</h1>
        )}
        {currentStoryPoint && (
          <div className='story-point-content flex flex-col items-center p-4 max-w-[800px] w-full'>
            <Image
              src={currentStoryPoint.imageSrc}
              alt='Story Point Image'
              width={800}
              height={500}
              className='mt-4 rounded-lg'
            />
            <p className='mt-4 text-center text-white font-bold'>
              {currentStoryPoint.text}
            </p>
            <div className='choice-button-container mt-4 p-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center'>
              {currentStoryPoint.choices.map((choice, index) => (
                <button
                  key={index}
                  className='bg-[#8E9CC9] inline-flex justify-center rounded-full px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer min-w-[200px] max-w-[240px]'
                  onClick={() => handleChoiceSelection(choice)}
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
