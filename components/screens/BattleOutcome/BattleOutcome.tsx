'use client';

import { useAppSelector } from '@/lib/reduxHooks';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {
  selectBattleResolution,
  selectActiveCharacter,
  selectActiveOpponent,
} from '@/lib/features/battle/BattleSlice';

export function BattleOutcome() {
  const router = useRouter();
  const battleResolution = useAppSelector(selectBattleResolution);
  const activeCharacter = useAppSelector(selectActiveCharacter);
  const activeOpponent = useAppSelector(selectActiveOpponent);

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
        <div className='story-screen-content p-6 flex flex-col items-center justify-center w-fit h-fit bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'>
          <div className='flex flex-col gap-1 text-sm'>
            <div className='font-bold text-2xl mb-4 text-center'>
              Battle Outcome: {battleResolution?.result?.toUpperCase()}
            </div>
          </div>
          {/* Character vs Opponent display grid */}
          <div className='p-6'>
            <div
              id='stats-grid'
              className='flex flex-col items-center gap-6 sm:flex-row'
            >
              <figure className='flex flex-col items-center'>
                <div className='relative w-40 h-40 sm:w-48 sm:h-48'>
                  <Image
                    alt='Chosen player avatar'
                    src={activeCharacter.avatar || '/default-avatar.png'}
                    fill
                    className='object-contain'
                  />
                </div>
                <div className='mt-2 font-medium text-center'>
                  {activeCharacter.name}
                </div>
              </figure>

              <div className='font-bold text-2xl'>VS</div>

              <figure className='flex flex-col items-center'>
                <div className='relative w-40 h-40 sm:w-48 sm:h-48'>
                  <Image
                    alt='Chosen opponent avatar'
                    src={activeOpponent?.avatar || '/default-avatar.png'}
                    fill
                    className='object-contain'
                  />
                </div>
                <div className='mt-2 font-medium text-center'>
                  {activeOpponent?.name}
                </div>
              </figure>
            </div>
          </div>
          {/* Character vs Opponent display grid */}

          <div className='mt-4 mb-6 text-center'>
            <button
              className='w-full px-4 py-3 rounded-xl font-semibold shadow-sm border border-black/10 bg-transparent backdrop-blur-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] transition'
              onClick={() => router.push('/homescreen')}
            >
              Return to Home Screen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
