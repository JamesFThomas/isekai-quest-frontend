'use client';
import { useRouter } from 'next/navigation';

export function BattleOutcome() {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/map_hands.png")] bg-cover bg-no-repeat bg-center'>
      <div
        className='battleoutcome-container flex flex-col justify-center items-center gap-4'
        style={{
          flexGrow: 1,
        }}
      >
        <h1 className='text-4xl text-white font-bold mt-3'>
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
  );
}
