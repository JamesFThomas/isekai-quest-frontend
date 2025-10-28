import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  phase?: BattlePhase,
  result: BattleResult,
  round?: number | null
}

export interface BattleAction {
  actorId: string;
  targetId: string;
  actionDetails: { id: string, title: string, type: string };
  effects: {
    hp?: number,
    mp?: number
  }
}

const initialTestState: BattleState = {
  battleId: "test-001",
  activeCharacter: {
    id: "char-1",
    name: "Adele the Dev",
    avatar: "/character_avatars/necromancer_avatar2.png",
    hp: 30,
    mp: 10,
    baseAttackIds: ["basic-attack"],
    equippedWeaponId: "wooden-sword",
    learnedSkillIds: ["focus"],
  },
  activeOpponent: {
    id: "opp-1",
    name: "Training Dummy",
    avatar: '/character_avatars/snowElf_avatar2.png',
    hp: 25,
    mp: 0,
    attackIds: ["bonk"],
  },
  isPlayerTurn: true,
  battleLog: [],
  phase: "chooseAction",
  result: null,
  round: 1
};


const initialState: BattleState = {
  battleId: null,
  activeCharacter: null,
  activeOpponent: null,
  isPlayerTurn: true,
  battleLog: [],
  phase: null,
  result: null,
  round: null
};

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
        actionDetails: { id: "auto attack", title: "Auto Slap", type: "auto" },
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
      state.isPlayerTurn === true ? state.phase = "chooseAction" : state.phase = "idle";

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

export const selectBattleLog = (state: RootState) => state.battle.battleLog;

export default battleSlice.reducer;
