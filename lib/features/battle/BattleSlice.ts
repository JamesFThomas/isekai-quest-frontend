import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Character } from '@/types/character';
import { Opponent } from '@/types/battle';

type BattlePhase = null | 'idle' | 'chooseAction' | 'resolving' | 'result';
type BattleResult = null | 'win' | 'lose' | 'flee';

export interface BattleState // battleSlice initial state shape (typo/casing fixes)
{
  battleId: string | null,
  activeCharacter: Character | null,   // fixed: activeCharater → activeCharacter
  activeOpponent: Opponent | null,    // fixed: activeOpenent → activeOpponent
  isPlayerTurn: boolean,
  battleLog: string[],                  // fixed: battlelog → battleLog
  phase: BattlePhase,
  result: BattleResult,
}

export interface BattleAction {
  actorId: string;
  targetId: string;
  phase: BattlePhase;
  actionDetails: { id: string, title: string, type: string };
  effects: {
    hp?: number,
    mp?: number
  }
}


const initialState: BattleState = {
  battleId: null,
  activeCharacter: null,
  activeOpponent: null,
  isPlayerTurn: true,
  battleLog: [],
  phase: null,
  result: null
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
    updateBattleState: (state, action: PayloadAction<BattleAction>) => {
      // identify the action target
      let target, actor, logEntry;

      // set the actor
      action.payload.actorId === state.activeCharacter?.id ? actor = state.activeCharacter
        : actor = state.activeOpponent;

      // set the target
      action.payload.targetId === state.activeCharacter?.id ? target = state.activeCharacter
        : target = state.activeOpponent;


      // apply action.payload.effects to the target
      if (target && action.payload.effects.hp) {
        target.hp += action.payload.effects.hp
      }
      if (target && action.payload.effects.mp) {
        target.mp += action.payload.effects.mp
      }

      // check for death
      if (!actor?.hp || !target?.hp) {
        !actor?.hp && action.payload.actorId === state.activeCharacter?.id ? state.result = 'lose' : state.result = 'win'

        !target?.hp && action.payload.targetId === state.activeOpponent?.id ? state.result = 'win' : state.result = 'lose'
      }

      // update battle log
      logEntry = `${actor?.name} performed ${action.payload.actionDetails.title} on ${target?.name}`
      state.battleLog.push(logEntry)


      // flip isPlayerTurn flag
      state.isPlayerTurn = !state.isPlayerTurn;

      // derive battle phase from current state
      state.isPlayerTurn === true ? state.phase = "chooseAction" : state.phase = "idle"

      // increment round if state.phase = "chooseAction"
    }
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
