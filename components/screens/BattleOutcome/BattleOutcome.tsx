'use client';

import { useAppSelector } from '@/lib/reduxHooks';
import { useRouter } from 'next/navigation';

import { selectBattleResolution } from '@/lib/features/battle/BattleSlice';

export function BattleOutcome() {
  const router = useRouter();
  const battleResolution = useAppSelector(selectBattleResolution);

  console.log('Battle Resolution:', battleResolution);

  const outcomeBackground =
    battleResolution?.result === 'win'
      ? '/battleoutcome_images/win_outcome.png'
      : battleResolution?.result === 'lose'
        ? '/battleoutcome_images/lose_outcome.png'
        : '/battleoutcome_images/flee_outcome.png';

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 min-h-screen bg-cover bg-no-repeat bg-center`}
      style={{ backgroundImage: `url(${outcomeBackground})` }}
    >
      <div
        className='battleoutcome-container flex flex-col justify-center items-center gap-4'
        style={{
          flexGrow: 1,
        }}
      >
        <div className='story-screen-content flex flex-col items-center justify-center w-fit h-fit bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'>
          <h1 className='text-4xl text-black font-bold mt-3'>
            Battle Outcome Screen
          </h1>
          <button
            className='w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition'
            onClick={() => router.push('/homescreen')}
          >
            Return to Home Screen
          </button>
        </div>
      </div>
    </div>
  );
}
