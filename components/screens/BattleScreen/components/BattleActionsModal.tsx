'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';

import LoadingSpinner from '../../../ui/LoadingSpinner/LoadingSpinner';
import { QuestStory } from '@/types/quest';
import Image from 'next/image';
import { BattleOption } from '@/types/battle';

interface BattleActionsModalProps {
    isOpen: boolean;
    player: string;
    type: 'Attack' | 'Skill' | 'Item';
    modalOptions: BattleOption[] | undefined
    closeModal: Dispatch<SetStateAction<boolean>>;
    handleActionSelect: (battleOption: BattleOption) => void;
}

export default function BattleActionsModal({
    isOpen,
    type,
    modalOptions,
    player,
    closeModal,
    handleActionSelect
}: BattleActionsModalProps) {
    // const [isLoading, setIsLoading] = useState(false);

    // const [ selectedAction, setSelectedAction ] = useState<string | null>(null);

    const setOpen = () => {
        closeModal(!isOpen);
    };

    const noAvailableOptions = !modalOptions || modalOptions.length === 0;

    // const handleOptionSelect = (option: string) => {
    //     // setSelectedAction(option);
    // }

    // const handleAcceptClick = () => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         setIsLoading(false);
    //         if (quest) {
    //             acceptQuest(quest);
    //             setOpen();
    //         }
    //     }, 1500);
    // };

    // const testBattleAction_PlayerHitsOpponent: BattleAction = {
    //   actorId: "char-1",
    //   targetId: "opp-1",
    //   actionDetails: { id: "basic-attack", title: "Basic Attack", type: "attack" },
    //   effects: { hp: -5 }
    // };

    // const dispatch = useAppDispatch();

    // const testCall = () => {
    //   dispatch(performBattleAction(testBattleAction_PlayerHitsOpponent));
    // }

    return (
        <div>
            <Dialog open={isOpen} onClose={setOpen} className='relative z-10'>
                <DialogBackdrop
                    transition
                    className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
                />

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
                        <DialogPanel
                            transition
                            className='relative transform overflow-hidden text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
                        >
                            <div
                                className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
                                style={{
                                    backgroundColor: '#C87D7D',
                                }}
                            >
                                <div className='items-center'>
                                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                        <DialogTitle
                                            as='h3'
                                            className='font-semibold text-white text-2xl item'
                                        >
                                            Choose A {type}
                                        </DialogTitle>

                                    </div>
                                </div>
                                <div
                                    id='action button wrapper'
                                    className="flex flex-wrap justify-center gap-4 sm:gap-5 py-2 [&>*]:basis-1/4 [&>*]:shrink-0"
                                >
                                    {
                                        noAvailableOptions && <div> {player} have no {type}s </div>
                                    }
                                    {modalOptions?.map((option) => (
                                        <button
                                            type="button"
                                            onClick={() => handleActionSelect(option)}
                                            key={`${option.id}-${option.title}`}
                                            className="inline-flex flex-col items-center justify-center
                                            min-w-[fit-content] p-4
                                            rounded-md
                                            bg-transparent hover:bg-slate-200/20
                                            text-sm font-bold text-white
                                            
                                            transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                                        >
                                            <Image
                                                key={`${option.id}-${option.title}`}
                                                className='flex items-center justify-center'
                                                alt={''}
                                                src={option.icon}
                                                width={50}
                                                height={50}
                                            />
                                            <span className="mt-2 text-sm text-white font-bold text-center"
                                            >
                                                {option.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className=' px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                <button
                                    type='button'
                                    data-autofocus
                                    onClick={setOpen}
                                    className='mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-white sm:mt-0 hover:cursor-pointer'
                                    style={{
                                        backgroundColor: '#8E9CC9',
                                        flex: 1,
                                        flexBasis: 0,
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
