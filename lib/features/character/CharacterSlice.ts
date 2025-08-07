import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

import { Character } from '@/types/character';
interface CharacterState {
  ActiveCharacter: Character | null;
  characterLocation: string | null;
  party: Character[];
}

const initialState: CharacterState = {
  ActiveCharacter: null,
  characterLocation: null,
  party: [],
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setActiveCharacter: (state, action: PayloadAction<Character | null>) => {
      state.ActiveCharacter = action.payload;
    },
    setCharacterLocation: (state, action: PayloadAction<string | null>) => {
      state.characterLocation = action.payload;
    },
    addCharacterToParty: (state, action: PayloadAction<Character>) => {
      state.party.push(action.payload);
    },
    removeCharacterFromParty: (state, action: PayloadAction<string>) => {
      state.party = state.party.filter(
        (character) => character.characterId !== action.payload
      );
    },
  },
});

// export actions when made
export const {
  setActiveCharacter,
  setCharacterLocation,
  // Will use later when implementing party screen
  addCharacterToParty,
  removeCharacterFromParty,
} = characterSlice.actions;

export const selectActiveCharacter = (state: RootState) =>
  state.character.ActiveCharacter;

export const selectCharacterParty = (state: RootState) => state.character.party;

export const selectCharacterLocation = (state: RootState) =>
  state.character.characterLocation;

export const selectParty = (state: RootState) => state.character.party;

export default characterSlice.reducer;
