'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import InteractionPanel from '@/components/ui/InteractionPanel/InteractionPanel';
import useProtectedRoute from '@/lib/hooks/ useProtectedRoute';
import guildOptions from '@/data/guildOptions';

export default function GuildScreen() {
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/guild_background2.png")] bg-cover bg-no-repeat bg-center'>
      <div className='mt-2'>
        <BackButton />
      </div>
      <div className='home-screen-container flex flex-col items-center gap-4'>
        <InteractionPanel title='Guild Hall' optionArray={guildOptions} />
      </div>
    </div>
  );
}
