import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Character } from '@/types/character';
import { Opponent } from '@/types/battle';

import {
  // BattlePhase,
  // BattleResult,
  BattleAction,
  // BattleState,
  initialTestState
} from '@/types/battle';


// const initialState: BattleState = {
//   battleId: null,
//   activeCharacter: null,
//   activeOpponent: null,
//   isPlayerTurn: true,
//   battleLog: [],
//   phase: null,
//   result: null,
//   round: null
// };

export const performBattleAction = createAsyncThunk<
  void,                // return type
  BattleAction,        // argument type
  { state: RootState } // thunkAPI typings
>(
  "battle/performBattleAction",   // action type name
  async (battleAction, { dispatch, getState }) => {
    // thunk logic here

    const { result, activeCharacter, activeOpponent } = getState().battle;

    // ensure payload has needed values, and screen state 
    if (result !== null) return;                    // terminal battle → stop
    if (!activeCharacter || !activeOpponent) return; // missing combatants → stop


    // ensure payload ids match battle particpants
    const validIds = [activeCharacter.id, activeOpponent.id];

    const isValidActor = validIds.includes(battleAction.actorId);
    const isValidTarget = validIds.includes(battleAction.targetId);

    if (!isValidActor || !isValidTarget) return;


    dispatch(updateBattleState(battleAction)); // the thunk return 

    // new state check 
    const { result: r2, phase: p2, activeCharacter: aC2, activeOpponent: aO2, } = getState().battle;

    // read fresh state for oppoent auto response
    if (r2 === null && p2 === "idle" && aC2 && aO2) {

      const testBattleAction_OpponentAutoAttack: BattleAction = {
        actorId: aO2.id,
        targetId: aC2.id,
        details: { id: "auto attack", title: "Auto Slap", type: "auto" },
        effects: { hp: -2 }
      };

      dispatch(updateBattleState(testBattleAction_OpponentAutoAttack));

    }



  }
);

// Battle Slice Stroe
export const battleSlice = createSlice({
  name: 'battle',
  initialState: initialTestState,
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
      // identify the action target - set the actor & target
      const actor = action.payload.actorId === state.activeCharacter?.id ? state.activeCharacter : state.activeOpponent;
      const target = action.payload.targetId === state.activeCharacter?.id ? state.activeCharacter : state.activeOpponent;

      // apply action.payload.effects to the target
      if (target && action.payload.effects.hp) {
        target.hp += action.payload.effects.hp
      }
      if (target && action.payload.effects.mp) {
        target.mp += action.payload.effects.mp
      }

      // check for death
      if (!actor?.hp || !target?.hp) {
        state.result = !actor?.hp && action.payload.actorId === state.activeCharacter?.id ? 'lose' : 'win';

        state.result = !target?.hp && action.payload.targetId === state.activeOpponent?.id ? 'win' : 'lose';

      }

      // update battle log
      const logEntry = `${actor?.name} performed ${action.payload.details.title} on ${target?.name}`
      state.battleLog.push(logEntry)


      // flip isPlayerTurn flag
      state.isPlayerTurn = !state.isPlayerTurn;

      // derive battle phase from current state
      state.phase = state.isPlayerTurn ? 'chooseAction' : 'idle';


      // increment round if state.phase = "chooseAction"
      if (state.round && state.isPlayerTurn) state.round++;
    }
  },
});

// Export actions
export const {
  setActiveCharacter,
  setActiveOpponent,
  togglePlayerTurn,
  logBattleAction,
  updateBattleState,
} = battleSlice.actions;

export const selectActiveCharacter = (state: RootState) =>
  state.battle.activeCharacter;

export const selectActiveOpponent = (state: RootState) =>
  state.battle.activeOpponent;

export const selectIsPlayerTurn = (state: RootState) =>
  state.battle.isPlayerTurn;

export const selectBattleLog = (state: RootState) =>
  state.battle.battleLog;

export const selectCharacterAttacks = (state: RootState) =>
  state.battle.activeCharacter?.attacks;

export const selectCharacterSkills = (state: RootState) =>
  state.battle.activeCharacter?.skills;

export const selectCharacterPotions = (state: RootState) =>
  state.battle.activeCharacter?.inventory?.potions;

export default battleSlice.reducer;
