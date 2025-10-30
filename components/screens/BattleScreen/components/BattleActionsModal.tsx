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

interface BattleActionsModalProps {
    isOpen: boolean;
    type: 'Attack' | 'Skill' | 'Item';
    modalOptions: string[] | undefined
    closeModal: Dispatch<SetStateAction<boolean>>;
}

export default function BattleActionsModal({
    isOpen,
    type,
    modalOptions,
    closeModal,
}: BattleActionsModalProps) {
    // const [isLoading, setIsLoading] = useState(false);

    // const [ selectedAction, setSelectedAction ] = useState<string | null>(null);

    const setOpen = () => {
        closeModal(!isOpen);
    };

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

    return (
        <div>
            <Dialog open={isOpen} onClose={() => { }} className='relative z-10'>
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
                                {
                                    !modalOptions || !modalOptions.length && <div>No options available.</div>
                                }
                                {modalOptions?.map((option, _ind) => (
                                    <button
                                        // onClick={() => handleAvatarSelect(avatar.src)}
                                        key={`${option}-${_ind}`}
                                        className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200'
                                    >
                                        {/* Use Image later when Attacks, Skills, Potions have avatars */}
                                        {/* <Image
                                            key={`${option}-${_ind}`}
                                            className='flex items-center justify-center'
                                            style={{
                                                border:
                                                    selectedAction === option
                                                        ? '3px solid #FCE300'
                                                        : 'none',
                                            }}
                                            alt={''}
                                            src={''}
                                            width={200}
                                            height={200}
                                        /> */}
                                        <span className='text-center text-sm text-white font-bold mt-2'>
                                            {option}
                                        </span>
                                    </button>
                                ))}
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
