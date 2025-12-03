import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

import { Character, InventoryItemBase } from '@/types/character';
import { BattleOption } from '@/types/battle';
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

export const useInventoryItemThunk = createAsyncThunk<
  void,
  BattleOption | InventoryItemBase,
  { state: RootState }
>(
  'character/useInventoryItemThunk',
  async (item, { dispatch, getState }) => {
    // Thunk logic for using an inventory item
    const { ActiveCharacter } = getState().character;

    console.log('Using inventory item:', item);
    console.log('Active character:', ActiveCharacter);

  }
);

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
        (character) => character.id !== action.payload
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
