import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {
  selectActiveCharacter,
  setActiveCharacter,
  setCharacterLocation,
} from '../features/character/CharacterSlice';

import characterOptions from '../../data/screenOptions/characterOptions';

// This function will load a random mock character object into the Redux CharacterSlice for testing purposes
export default function useMockCharacter() {
  const activeCharacter = useSelector(selectActiveCharacter);
  const dispatch = useDispatch();

  // Load a mock character if no active character is set
  useEffect(() => {
    if (activeCharacter === null) {
      const randomIndex = Math.floor(Math.random() * characterOptions.length);
      const mockCharacter = characterOptions[randomIndex];
      dispatch(setActiveCharacter(mockCharacter));
      dispatch(setCharacterLocation('StartsVille'));
    }
  }, [activeCharacter, dispatch]);
}
