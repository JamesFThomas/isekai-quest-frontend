'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { QuestStory } from '@/types/quest';

interface DetailsModalProps {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  quest: QuestStory | null;
  acceptQuest: (quest: QuestStory) => void;
}

export default function DetailsModal({
  isOpen,
  quest,
  closeModal,
  acceptQuest,
}: DetailsModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const setOpen = () => {
    closeModal(!isOpen);
  };

  const handleAcceptClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (quest) {
        acceptQuest(quest);
        setOpen();
      }
    }, 1500);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={() => {}} className='relative z-10'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
        />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
            <DialogPanel
              transition
              className='relative transform overflow-hidden text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'
              style={{
                backgroundColor: '#C87D7D',
              }}
            >
              <div
                className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4'
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
                      {quest ? quest.name : 'Quest Details'}
                    </DialogTitle>
                    <div className='mt-2'>
                      <p className='text-sm text-white'>
                        {quest ? quest.description : 'No details available.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=' px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  onClick={handleAcceptClick}
                  className='inline-flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold text-white sm:ml-3 hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed'
                  style={{
                    backgroundColor: '#8E9CC9',
                    flex: 1,
                    flexBasis: 0,
                  }}
                >
                  {isLoading ? <LoadingSpinner /> : 'Accept'}
                </button>
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
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
