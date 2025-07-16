'use client';

import InteractionPanel, {
  PanelOption,
} from '@/components/ui/InteractionPanel/InteractionPanel';
import LogoutButton from '../../ui/LogoutButton/LogoutButton';

const controlOptions: PanelOption[] = [
  {
    id: 1,
    name: 'Map',
    pageRoute: '/mapscreen',
    src: '/homescreen_icons/map_image.png',
    altText: 'Map Icon',
  },
  {
    id: 2,
    name: 'Party',
    pageRoute: '/partyscreen',
    src: '/homescreen_icons/party_image.png',
    altText: 'Party Icon',
  },
];

const startsVilleOptions: PanelOption[] = [
  {
    id: 1,
    name: 'Guild',
    pageRoute: '/guildscreen',
    src: '/homescreen_icons/guild_building.png',
    altText: 'Guild Icon',
  },
  {
    id: 2,
    name: 'Inn',
    pageRoute: '/innscreen',
    src: '/homescreen_icons/inn_building.png',
    altText: 'Inn Icon',
  },
  {
    id: 3,
    name: 'Market',
    pageRoute: '/marketscreen',
    src: '/homescreen_icons/market_stall.png',
    altText: 'Market Icon',
  },
];

export default function HomeScreen() {
  return (
    <div
      className='flex flex-col items-center justify-center p-8 min-h-screen'
      style={{
        backgroundColor: '#d9d9d9',
      }}
    >
      <div className='flex flex-col items-center w-fit m-2'>
        <LogoutButton />
      </div>

      <div className='home-screen-container flex flex-col items-center gap-4'>
        <InteractionPanel title='Controls' optionArray={controlOptions} />
        <InteractionPanel
          title='StartsVille'
          optionArray={startsVilleOptions}
        />
      </div>
    </div>
  );
}
