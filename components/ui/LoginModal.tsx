'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ isOpen, closeModal }: LoginModalProps) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  console.log('username', username);

  console.log('email', emailAddress);

  const setOpen = () => {
    closeModal(!isOpen);
  };

  const handleLogin = () => {
    setOpen();
    router.push('/homescreen');
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
                      Continue your quest!
                    </DialogTitle>
                    <div className='mt-2'>
                      <div className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2'>
                          Username
                        </label>
                        <input
                          className='bg-white shadow appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                          id='username'
                          type='text'
                          placeholder='User Name'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className='block text-white text-sm font-bold mb-2'>
                          Password
                        </label>
                        <input
                          className='bg-white shadow appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                          id='email'
                          type='email'
                          placeholder='Email Address'
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=' px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  onClick={handleLogin}
                  className='inline-flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold text-white sm:ml-3 hover:cursor-crosshair'
                  style={{
                    backgroundColor: '#8E9CC9',
                    flex: 1,
                    flexBasis: 0,
                  }}
                >
                  Login
                </button>
                <button
                  type='button'
                  data-autofocus
                  onClick={setOpen}
                  className='mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-white sm:mt-0 hover:cursor-crosshair'
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
