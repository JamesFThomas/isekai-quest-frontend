'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

import { User } from '@/lib/features/auth/AuthSlice';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  handleLogin: (user: User) => void;
}

export default function LoginModal({
  isOpen,
  closeModal,
  handleLogin,
}: LoginModalProps) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const valuesAreValid =
    !usernameError && !passwordError && username && password;

  const validateUsername = (): void => {
    if (username.trim() === '') {
      setUsernameError('Username is required');
    } else if (!emailPattern.test(username)) {
      setUsernameError('Username should be an email@domain.com format');
    } else {
      setUsernameError('');
    }
  };

  const validatePassword = (): void => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
    } else if (password.length <= 6) {
      setPasswordError('Password must be at least 7 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleBlur = (field: 'username' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'username') {
      validateUsername();
    }

    if (field === 'password') {
      validatePassword();
    }
  };

  const setOpen = () => {
    closeModal(!isOpen);
  };

  const handleLoginClick = () => {
    validateUsername();
    validatePassword();

    if (!usernameError && !passwordError) {
      setIsLoading(true);
      setTimeout(() => {
        const user = {
          userId: `${Math.floor(Math.random() * 10000)}`, // Simulating a user ID
          username: username,
        };

        handleLogin(user);
        setIsLoading(false);
        router.push('/homescreen');
        setOpen();
      }, 1500);
    }
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
                          type='email'
                          placeholder='email@address.com '
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          onBlur={() => handleBlur('username')}
                          onFocus={() =>
                            setTouched((prev) => ({ ...prev, username: true }))
                          }
                        />
                        {touched.username && usernameError && (
                          <p className='text-red-800 font-bold text-sm mt-1'>
                            {usernameError}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className='block text-white text-sm font-bold mb-2'>
                          Password
                        </label>
                        <input
                          className='bg-white shadow appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                          id='password'
                          type='password'
                          placeholder='Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={() => handleBlur('password')}
                          onFocus={() =>
                            setTouched((prev) => ({
                              ...prev,
                              password: true,
                            }))
                          }
                        />
                        {touched.password && passwordError && (
                          <p className='text-red-800 font-bold text-sm mt-1'>
                            {passwordError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=' px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  disabled={!valuesAreValid}
                  onClick={handleLoginClick}
                  className='inline-flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold text-white sm:ml-3 hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed'
                  style={{
                    backgroundColor: !valuesAreValid ? 'gray-400' : '#8E9CC9',
                    flex: 1,
                    flexBasis: 0,
                  }}
                >
                  {isLoading ? <LoadingSpinner /> : 'Login'}
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
