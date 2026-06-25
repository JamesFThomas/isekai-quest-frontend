import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "../../store";

import { Character } from "@/types/character";

import {
  BattleAction,
  BattleResolution,
  BattleState,
  Opponent,
  BattleStartContext,
} from "@/types/battle";

import { addToast } from "@/lib/features/toast/ToastSlice";

export const initialState: BattleState = {
  battleId: null,
  activeCharacter: null,
  activeOpponent: null,
  isPlayerTurn: true,
  battleLog: [],
  phase: null,
  result: null,
  round: null,
  resolution: null,
  escapeAllowed: false,
  escapePenalty: null,
  reward: null,
  nextPoints: null,
};

const waitForToastClear = (getState: () => RootState): Promise<void> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const queue = getState().toast?.queue;
      if (!queue || queue.length === 0 || queue[0]?.length === 0) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
};

// Helper to dispatch battle action toast for character and opponent
const dispatchBattleActionToast = (
  dispatch: AppDispatch,
  actor: { name: string },
  target: { name: string },
  battleAction: BattleAction,
  isPlayer: boolean,
): void => {
  const message =
    isPlayer && battleAction.details.type === "potion"
      ? `${actor.name} used ${battleAction.details.title}`
      : `${actor.name} used ${battleAction.details.title} on ${target.name}`;

  dispatch(
    addToast([
      {
        id: `battle_action_${Date.now()}`,
        characterName: actor.name,
        message,
        type: "battle",
        sound: isPlayer ? "battle_damage_dealt" : "battle_damage_received",
        duration: 2000,
        timestamp: Date.now(),
      },
    ]),
  );
};

// Helper method to dispatch toast when battle is won or lost
const checkBattleResult = (
  getState: () => RootState,
  dispatch: AppDispatch,
): boolean => {
  const { result, activeCharacter, activeOpponent } = getState().battle;

  if (result === "win") {
    dispatch(
      addToast([
        {
          id: `battle_victory_${Date.now()}`,
          characterName: activeCharacter?.name ?? "",
          message: `${activeCharacter?.name} defeated ${activeOpponent?.name}!`,
          type: "battle",
          sound: "battle_victory",
          duration: 3000,
          timestamp: Date.now(),
        },
      ]),
    );
    return true; // battle over
  }

  if (result === "lose") {
    dispatch(
      addToast([
        {
          id: `battle_defeat_${Date.now()}`,
          characterName: activeCharacter?.name ?? "",
          message: `${activeCharacter?.name} was defeated by ${activeOpponent?.name}!`,
          type: "battle",
          sound: "battle_defeat",
          duration: 3000,
          timestamp: Date.now(),
        },
      ]),
    );
    return true; // battle over
  }

  return false; // battle continues
};

export const performBattleAction = createAsyncThunk<
  void, // return type
  BattleAction, // argument type
  { state: RootState } // thunkAPI typings
>(
  "battle/performBattleAction", // action type name
  async (battleAction, { dispatch, getState }) => {
    // thunk logic here

    const { result, activeCharacter, activeOpponent } = getState().battle;

    // ensure payload has needed values, and screen state
    if (result !== null) return; // terminal battle → stop
    if (!activeCharacter || !activeOpponent) return; // missing combatants → stop

    // ensure payload ids match battle participants
    const validIds = [activeCharacter.id, activeOpponent.id];

    const isValidActor = validIds.includes(battleAction.actorId);
    const isValidTarget = validIds.includes(battleAction.targetId);

    if (!isValidActor || !isValidTarget) return;

    dispatch(updateBattleState(battleAction)); // the thunk return

    if (checkBattleResult(getState, dispatch as AppDispatch)) return;

    await waitForToastClear(getState);

    // dispatch player toast
    dispatchBattleActionToast(
      dispatch as AppDispatch,
      activeCharacter,
      activeOpponent,
      battleAction,
      true,
    );

    await waitForToastClear(getState);

    // new state check
    const {
      result: r2,
      phase: p2,
      activeCharacter: aC2,
      activeOpponent: aO2,
    } = getState().battle;

    // read fresh state for opponent auto response
    if (r2 === null && p2 === "idle" && aC2 && aO2) {
      // TODO: replace random selection with strategy-based logic (e.g. weighted by hp, mp, or opponent type)
      const opponentAttack =
        aO2.attacks[Math.floor(Math.random() * aO2.attacks.length)];

      const battleAction: BattleAction = {
        actorId: aO2.id,
        targetId: aC2.id,
        details: {
          id: aO2.id,
          title: opponentAttack.title,
          type: opponentAttack.type,
        },
        effect: opponentAttack.effect,
      };

      dispatch(updateBattleState(battleAction));

      if (checkBattleResult(getState, dispatch as AppDispatch)) return;

      dispatchBattleActionToast(
        dispatch as AppDispatch,
        aO2,
        aC2,
        battleAction,
        false,
      );
    }
  },
);

// Battle Slice Store
export const battleSlice = createSlice({
  name: "battle",
  initialState: initialState,
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
    setBattleStartContext: (
      state,
      action: PayloadAction<BattleStartContext>,
    ) => {
      const {
        activeCharacter,
        activeOpponent,
        escapeAllowed,
        reward,
        escapePenalty,
        nextPoints,
      } = action.payload;

      state.activeCharacter = activeCharacter;
      state.activeOpponent = activeOpponent;
      state.escapeAllowed = escapeAllowed;
      state.reward = reward ?? null;
      state.escapePenalty = escapePenalty ?? null;
      state.nextPoints = nextPoints ?? null;
    },
    setBattleResult: (
      state,
      action: PayloadAction<"win" | "lose" | "flee" | null>,
    ) => {
      state.result = action.payload;
    },
    // combine reducers for setting escapeAllowed, reward, and escapePenalty once story integration is done
    setEscapeAllowed: (state, action: PayloadAction<boolean>) => {
      state.escapeAllowed = action.payload;
    },
    setRewardAndPenalty: (
      state,
      action: PayloadAction<{
        reward?: BattleState["reward"];
        escapePenalty?: BattleState["escapePenalty"];
      }>,
    ) => {
      state.reward = action.payload.reward;
      state.escapePenalty = action.payload.escapePenalty;
    },
    setBattleResolution: (
      state,
      action: PayloadAction<BattleResolution | null>,
    ) => {
      state.resolution = action.payload;
    },
    updateBattleState: (state, action: PayloadAction<BattleAction>) => {
      // identify the action target - set the actor & target
      const actor =
        action.payload.actorId === state.activeCharacter?.id
          ? state.activeCharacter
          : state.activeOpponent;
      const target =
        action.payload.targetId === state.activeCharacter?.id
          ? state.activeCharacter
          : state.activeOpponent;

      // apply action.payload.effects to the target
      if (target && action.payload.effect.hp) {
        target.hp += action.payload.effect.hp;
      }
      if (target && action.payload.effect.mp) {
        target.mp += action.payload.effect.mp;
      }

      // check for death
      if (!actor || !target) return;
      if (actor.hp <= 0 || target.hp <= 0) {
        // set battle result
        if (actor.hp <= 0 && actor.id === state.activeCharacter?.id) {
          state.result = "lose";
        } else if (target.hp <= 0 && target.id === state.activeOpponent?.id) {
          state.result = "win";
        } else if (target.hp <= 0 && target.id === state.activeCharacter?.id) {
          state.result = "lose";
        }
      }

      // update battle log
      const logEntry = `${actor?.name} performed ${action.payload.details.title} on ${target?.name}`;
      state.battleLog.push(logEntry);

      // flip isPlayerTurn flag
      state.isPlayerTurn = !state.isPlayerTurn;

      // derive battle phase from current state
      state.phase = state.isPlayerTurn ? "chooseAction" : "idle";

      // increment round if state.phase = "chooseAction"
      if (state.round && state.isPlayerTurn) state.round++;
    },
    resetBattleState: (state) => {
      const resetBattleState: BattleState = {
        battleId: null,
        activeCharacter: state.activeCharacter,
        activeOpponent: null,
        isPlayerTurn: true,
        battleLog: [],
        phase: null,
        result: null,
        round: null,
        resolution: null,
        escapeAllowed: false,
        escapePenalty: null,
        reward: null,
        nextPoints: null,
      };
      Object.assign(state, resetBattleState);
    },
  },
});

// Export actions
export const {
  setActiveCharacter,
  setActiveOpponent,
  togglePlayerTurn,
  logBattleAction,
  setBattleResult,
  updateBattleState,
  setEscapeAllowed,
  setRewardAndPenalty,
  setBattleResolution,
  resetBattleState,
  setBattleStartContext,
} = battleSlice.actions;

export const selectActiveCharacter = (state: RootState) =>
  state.battle.activeCharacter;

export const selectActiveOpponent = (state: RootState) =>
  state.battle.activeOpponent;

export const selectIsPlayerTurn = (state: RootState) =>
  state.battle.isPlayerTurn;

export const selectBattleLog = (state: RootState) => state.battle.battleLog;

export const selectCharacterAttacks = (state: RootState) =>
  state.battle.activeCharacter?.inventory?.attacks;

export const selectCharacterSkills = (state: RootState) =>
  state.battle.activeCharacter?.inventory?.skills;

export const selectCharacterPotions = (state: RootState) =>
  state.battle.activeCharacter?.inventory?.potions;

export const selectBattleResult = (state: RootState) => state.battle.result;

export const selectEscapeAllowed = (state: RootState) =>
  state.battle.escapeAllowed;

export const selectEscapePenalty = (state: RootState) =>
  state.battle.escapePenalty;

export const selectBattleReward = (state: RootState) => state.battle.reward;

export const selectBattleResolution = (state: RootState) =>
  state.battle.resolution;

export const selectBattleNextPoints = (state: RootState) =>
  state.battle.nextPoints;

// Export reducer
export default battleSlice.reducer;
