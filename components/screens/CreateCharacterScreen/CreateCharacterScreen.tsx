'use client';

import { useState } from 'react';

import { useAppDispatch } from '@/lib/reduxHooks';

import { login, User } from '../../../lib/features/auth/AuthSlice';

import Image from 'next/image';

import RegistrationModal from '../../ui/RegistrationModal/RegistrationModal';

import avatarImages from '../../../data/avatarOptions';

export type AvatarOption = {
  id: number;
  src: string;
  alt: string;
  type: string;
};

export type NewPlayerData = {
  avatar: string;
  characterName: string;
  userName: string;
  password: string;
};

export default function CreateCharacterScreen() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const dispatch = useAppDispatch();

  const handleLogin = (user: User) => {
    dispatch(login(user));
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [avatarOptions] = useState<AvatarOption[]>(avatarImages);

  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption | null>(
    null
  );

  const [newPlayerData, setNewPlayerData] = useState<NewPlayerData>({
    avatar: '',
    characterName: '',
    userName: '',
    password: '',
  });

  const [characterNameError, setCharacterNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  // const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({
    characterName: false,
    username: false,
    password: false,
  });

  const valuesAreValid =
    !usernameError &&
    !passwordError &&
    !characterNameError &&
    newPlayerData.characterName &&
    newPlayerData.userName &&
    newPlayerData.password;

  const validateCharacterName = (): void => {
    if (newPlayerData.characterName.trim() === '') {
      setCharacterNameError('Character name is required');
    } else {
      setCharacterNameError('');
    }
  };

  const validateUsername = (): void => {
    if (newPlayerData.userName.trim() === '') {
      setUsernameError('Username is required');
    } else if (!emailPattern.test(newPlayerData.userName)) {
      setUsernameError('Username should be an email@address.com format');
    } else {
      setUsernameError('');
    }
  };

  const validatePassword = (): void => {
    if (newPlayerData.password?.trim() === '') {
      setPasswordError('Password is required');
    } else if (newPlayerData.password?.length <= 6) {
      setPasswordError('Password must be at least 7 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleBlur = (field: 'characterName' | 'username' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'characterName') {
      validateCharacterName();
    }

    if (field === 'username') {
      validateUsername();
    }

    if (field === 'password') {
      validatePassword();
    }
  };

  const handleAvatarSelect = (src: string) => {
    const selected = avatarOptions.find((avatar) => avatar.src === src);
    if (selected) {
      setSelectedAvatar(selected);
      setNewPlayerData({
        ...newPlayerData,
        avatar: selected.src,
      });
    }
  };

  const handleCreateCharacter = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div
      className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/town_background2.png")] bg-cover bg-no-repeat bg-center'
      style={{
        backgroundColor: '#d9d9d9',
      }}
    >
      <div className='flex flex-col items-center'>
        <header
          className='text-center text-4xl text-white p-3.5'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          Choose Your Avatar
        </header>
        <div
          className='mt-4'
          style={{
            backgroundColor: 'white',
            maxWidth: '600px',
            minHeight: 'fit-content',
            width: '100%',
          }}
        >
          <div className='avatar-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
            {avatarOptions.map((avatar) => (
              <button
                onClick={() => handleAvatarSelect(avatar.src)}
                key={avatar.id}
                className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200'
              >
                <Image
                  key={avatar.id}
                  className='flex items-center justify-center'
                  style={{
                    border:
                      selectedAvatar?.src === avatar.src
                        ? '5px solid #000000'
                        : 'none',
                  }}
                  alt={avatar.alt}
                  src={avatar.src}
                  width={200}
                  height={200}
                />
                <span className='text-center text-sm text-black mt-2'>
                  {avatar.type}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div
          className='mt-4 text-white'
          style={{
            backgroundColor: '#C87D7D',
            maxWidth: '600px',
            minHeight: 'fit-content',
            width: '100%',
          }}
        >
          <div className='character-grid p-4 flex flex-col md:flex-row md:space-x-6'>
            <figure className='bg-white character-image w-full md:w-1/3 flex items-center justify-center md:h-auto'>
              <Image
                alt={selectedAvatar ? selectedAvatar.alt : 'Default Avatar'}
                src={
                  selectedAvatar
                    ? selectedAvatar.src
                    : '/character_avatars/default_avatar.png'
                }
                width={300}
                height={300}
              />
            </figure>
            <div className='character-data w-full md:w-2/3'>
              <div className='mb-4'>
                <label className='block text-sm font-bold mb-2'>
                  Character Name
                </label>
                <input
                  className='bg-white shadow appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                  id='character-name'
                  type='text'
                  placeholder='Character Name'
                  value={newPlayerData.characterName}
                  onChange={(e) =>
                    setNewPlayerData({
                      ...newPlayerData,
                      characterName: e.target.value,
                    })
                  }
                  onBlur={() => handleBlur('characterName')}
                  onFocus={() =>
                    setTouched((prev) => ({
                      ...prev,
                      characterName: true,
                    }))
                  }
                />
                {touched.characterName && characterNameError && (
                  <p className='text-red-800 font-bold text-sm mt-1'>
                    {characterNameError}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-bold mb-2'>
                  User Name
                </label>
                <input
                  className='bg-white shadow appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='email'
                  placeholder='User Name'
                  value={newPlayerData.userName}
                  onChange={(e) =>
                    setNewPlayerData({
                      ...newPlayerData,
                      userName: e.target.value,
                    })
                  }
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

              <div className='mb-4'>
                <label className='block text-sm font-bold mb-2'>Password</label>
                <input
                  className='bg-white shadow appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='Password'
                  value={newPlayerData.password}
                  onChange={(e) =>
                    setNewPlayerData({
                      ...newPlayerData,
                      password: e.target.value,
                    })
                  }
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
        <div className='flex flex-col sm:flex-row justify-around w-full mt-3 bg-transparent'>
          <button
            className='rounded-full text-center text-2xl text-white p-4 m-1 hover:cursor-pointer disabled:cursor-not-allowed'
            disabled={!valuesAreValid}
            style={{
              backgroundColor: !valuesAreValid ? '#9CA3AF' : '#8E9CC9',
              flex: 1,
              flexBasis: 0,
            }}
            onClick={handleCreateCharacter}
          >
            Create Character
          </button>
        </div>
      </div>
      <RegistrationModal
        isOpen={isLoginModalOpen}
        playerData={newPlayerData ?? undefined}
        closeModal={setIsLoginModalOpen}
        handleLogin={handleLogin}
      />
    </div>
  );
}
