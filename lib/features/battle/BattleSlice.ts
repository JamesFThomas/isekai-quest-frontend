import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Character } from '@/types/character';

export interface Opponent {
  opponentId: string;
  name: string;
  hp: number;
  mp: number;
  attackIds: string[]; // Available attacks
}

export interface BattleState {
  activeCharacter: Character | null; // Player participant
  activeOpponent: Opponent | null; // Enemy participant
  isPlayerTurn: boolean; // Whose turn it is (player or opponent)
  battleLog: string[]; // Optional: Tracks actions taken (for UI feedback)
}

const initialState: BattleState = {
  activeCharacter: null,
  activeOpponent: null,
  isPlayerTurn: true,
  battleLog: [],
};

export const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setActiveCharacter: (state, action: PayloadAction<Character | null>) => {
      state.activeCharacter = action.payload;
    },
    setActiveOpponent: (state, action: PayloadAction<Opponent | null>) => {
      state.activeOpponent = action.payload;
    },
    togglePlayerTurn: (state) => {
      state.isPlayerTurn = !state.isPlayerTurn;
    },
    logBattleAction: (state, action: PayloadAction<string>) => {
      state.battleLog.push(action.payload);
    },
  },
});

// Export actions
export const {
  setActiveCharacter,
  setActiveOpponent,
  togglePlayerTurn,
  logBattleAction,
} = battleSlice.actions;

export const selectActiveCharacter = (state: RootState) =>
  state.battle.activeCharacter;

export const selectActiveOpponent = (state: RootState) =>
  state.battle.activeOpponent;

export const selectIsPlayerTurn = (state: RootState) =>
  state.battle.isPlayerTurn;

export const selectBattleLog = (state: RootState) => state.battle.battleLog;

export default battleSlice.reducer;
