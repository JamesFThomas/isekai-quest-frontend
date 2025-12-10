'use client';

import BackButton from '@/components/ui/BackButton/BackButton';
import InteractionPanel from '@/components/ui/InteractionPanel/InteractionPanel';
import useProtectedRoute from '@/lib/hooks/useProtectedRoute';
import { guildOptions } from '@/data/screenOptions/guildOptions';
import { ControlPanel } from '@/components/ui/ControlPanel/ContolPanel';

export default function GuildScreen() {
  useProtectedRoute();
  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/guild_background2.png")] bg-cover bg-no-repeat bg-center'>
      <ControlPanel />
      <div
        className='guild-screen-container flex flex-col justify-center items-center gap-4'
        style={{
          flexGrow: 1
        }}
      >
        <InteractionPanel title='Guild Hall' optionArray={guildOptions} />
      </div>
    </div>
  );
}
