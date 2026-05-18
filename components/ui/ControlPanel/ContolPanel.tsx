'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LogoutButton from '../LogoutButton/LogoutButton';
import BackButton from '../BackButton/BackButton';
import { usePathname } from 'next/navigation';
import { InformationIcon } from '@/components/ui/InformationIcon/InformationIcon';
import { InformationPageKey } from '@/types/information';

type ControlPanelProps = {
  pageKey?: InformationPageKey;
};

export const ControlPanel = ({ pageKey }: ControlPanelProps) => {

    const router = useRouter();
    const pathname = usePathname();

    const shouldHideMap = pathname.includes('mapscreen');
    const shouldHideParty = pathname.includes('partyscreen');
    const shouldHideBack = pathname.includes('homescreen');


    return (
        <div className='ControlPanel-container flex flex-row items-start justify-between h-auto pb-4 gap-3 w-full'>
            <div className='flex flex-row items-start gap-3'>
                <LogoutButton />

                {
                    !shouldHideMap && (

                        <button
                            id='MapScreen-button'
                            className="flex flex-col items-center justify-center cursor-pointer"
                            onClick={() => router.push('/mapscreen')}
                        >
                            <Image
                                src={'/homescreen_icons/map_image.png'}
                                alt={'Map Icon'}
                                width={125}
                                height={125}
                                className='flex items-center justify-center'
                            />
                        </button>
                    )
                }
                {
                    !shouldHideParty && (

                        <button
                            id='PartyScreen-button'
                            className="flex flex-row items-center justify-center cursor-pointer"
                            onClick={() => router.push('/partyscreen/test-character')}
                        >
                            <Image
                                src='/homescreen_icons/party_image.png'
                                alt='Party Icon'
                                width={125}
                                height={125}
                                className='flex items-center justify-center'
                            />
                        </button>
                    )
                }

                {
                    !shouldHideBack && (
                        <BackButton />
                    )
                }
            </div>
            {pageKey && (
                <div className='ml-auto'>
                    <InformationIcon pageKey={pageKey} />
                </div>
            )}
        </div>
    );
};