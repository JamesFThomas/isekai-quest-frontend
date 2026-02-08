'use client';

import useProtectedRoute from '@/lib/hooks/useProtectedRoute';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';

import {
  selectAcceptedQuest,
  setCurrentStoryPointId,
  selectCurrentStoryPoint,
  markQuestCompletedAndClearState,
  setLastEndedQuestId,
} from '@/lib/features/quest/QuestSlice';

import {
  setActiveCharacter,
  setActiveOpponent,
  setEscapeAllowed,
  setRewardAndPenalty,
} from '@/lib/features/battle/BattleSlice';

import { selectActiveCharacter } from '@/lib/features/character/CharacterSlice';

import { StoryPointChoice } from '@/types/quest';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StoryScreen() {
  useProtectedRoute();

  const dispatch = useAppDispatch();
  const router = useRouter();

  // select necessary state from the quest slice and character slice
  const acceptedQuest = useAppSelector(selectAcceptedQuest);
  const activeCharacter = useAppSelector(selectActiveCharacter);
  const currentStoryPoint = useAppSelector(selectCurrentStoryPoint);

  // handle choice selection when a player clicks on a choice button
  const handleChoiceSelection = (choice: StoryPointChoice) => {
    if (!acceptedQuest) return;

    // check choice for battle attribute and redirect to battle screen if it exists
    if (choice.outcome?.battle) {
      // set the next story point ID in the quest state
      dispatch(setCurrentStoryPointId(choice.nextPointId));

      // set the active opponent and character for the battle
      dispatch(setActiveOpponent(choice.outcome.battle.opponent));
      dispatch(setActiveCharacter(activeCharacter));

      // set escape allowed in battle state if applicable
      dispatch(setEscapeAllowed(choice.outcome.battle.escapeAllowed));

      // set reward and escape penalty
      dispatch(
        setRewardAndPenalty({
          reward: choice.outcome.battle.reward,
          escapePenalty: choice.outcome.battle.escapePenalty,
        }),
      );

      // redirect to battle screen
      router.push('/battlescreen');
      return;
    }

    // if no battle, just move to the next story point
    const nextPoint = choice.nextPointId;

    if (nextPoint !== null) {
      dispatch(setCurrentStoryPointId(nextPoint));
    }

    if (nextPoint === null && choice.outcome?.endState) {
      // completed - clear quest state data when quest ends (either completed)
      if (choice.outcome?.endState === 'completed') {
        dispatch(markQuestCompletedAndClearState());
      }
      // failed - set last failed quest ID in state to trigger restart of quest when user commences quest again
      else if (choice.outcome?.endState === 'failed') {
        dispatch(setLastEndedQuestId(acceptedQuest.id));
      }
      // if nextPointId is null, it means the quest has ended (either completed or failed) redirect to homescreen
      router.push('/homescreen');
    }
  };

  return (
    <div className='story-screen-container p-4 flex flex-col items-center justify-center h-screen bg-[url("/background_images/dark_hills.png")] bg-cover bg-no-repeat bg-center'>
      <div className='story-screen-content flex flex-col items-center justify-center w-fit h-fit bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'>
        {acceptedQuest && (
          <h1 className='text-4xl text-white font-bold mt-3'>
            {acceptedQuest.name}
          </h1>
        )}
        {currentStoryPoint && (
          <div className='story-point-content flex flex-col items-center p-4 max-w-[800px] w-full'>
            <Image
              src={currentStoryPoint.imageSrc}
              alt={`Story Point Image`}
              width={800}
              height={500}
              className='mt-4 rounded-lg'
            />
            <p className='mt-4 text-center text-white font-bold'>
              {currentStoryPoint.text}
            </p>
            <div className='choice-button-container mt-4 p-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
              {currentStoryPoint.choices.map((choice, index) => (
                <button
                  key={index}
                  className='bg-[#8E9CC9]   inline-flex justify-center rounded-full px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer min-w-[200px] max-w-[240px]'
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
    </div>
  );
}
