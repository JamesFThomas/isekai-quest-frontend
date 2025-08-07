'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import useProtectedRoute from '@/lib/hooks/ useProtectedRoute';

import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import {
  selectAcceptedQuest,
  setCurrentStoryPointId,
} from '@/lib/features/quest/QuestSlice';
import { useEffect, useState } from 'react';
import { QuestStory, StoryPoint, StoryPointChoice } from '@/types/quest';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StoryScreen() {
  useProtectedRoute();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const acceptedQuest = useAppSelector(selectAcceptedQuest);

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
    <div className='story-screen-container flex flex-col items-center justify-center h-screen bg-[url("/background_images/dark_hills.png")] bg-cover bg-no-repeat bg-center'>
      <div className='story-screen-content flex flex-col items-center justify-center w-fit h-fit bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'>
        {quest && <h2 className='text-2xl font-semibold'>{quest.name}</h2>}
        {currentStoryPoint && (
          <div className='story-point-content flex flex-col items-center justify-center p-4 w-max-[900px]'>
            <Image
              src={currentStoryPoint.imageSrc}
              alt={`Story Point Image`}
              width={800}
              height={500}
              className='mt-4 rounded-lg'
            />
            <p className='mt-2 w-fit'>{currentStoryPoint.text}</p>
            <div className='mt-4 gap-1'>
              {currentStoryPoint.choices.map((choice, index) => (
                <button
                  key={index}
                  className='mt-3 inline-flex justify-center rounded-full bg-[#8E9CC9] px-3 py-2 text-sm font-semibold text-white sm:mt-0 hover:cursor-pointer'
                  onClick={() => {
                    handleChoiceSelection(choice);
                  }}
                >
                  {/* {choice.label} -  */}
                  {choice.text}
                  {/* <p>{choice.text}</p> */}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className='mt-2'>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
