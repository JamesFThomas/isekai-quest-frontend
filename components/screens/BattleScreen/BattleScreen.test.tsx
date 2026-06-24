import {
  performBattleAction,
  setActiveCharacter,
  setActiveOpponent,
} from "../../../lib/features/battle/BattleSlice";
import { makeStore, RootState } from "../../../lib/store";
import { initialTestState } from "../../../data/testData/battleTestData";
import { BattleAction } from "../../../types/battle";

// create with access to Rootstate and all redux slices
const buildStore = (preloadedState?: Partial<RootState>) =>
  makeStore(preloadedState);

const playerAction = (): BattleAction => ({
  actorId: initialTestState.activeCharacter!.id,
  targetId: initialTestState.activeOpponent!.id,
  details: { id: "test-attack", title: "Test Attack", type: "battleOption" },
  effect: { hp: -5 },
});

// Mock addToast action to prevent queue from filling during tests
jest.mock("@/lib/features/toast/ToastSlice", () => {
  const actual = jest.requireActual("@/lib/features/toast/ToastSlice");
  return {
    ...actual,
    addToast: jest.fn(() => ({ type: "@@NOOP" })),
  };
});

describe("BattleSlice — opponent AI", () => {
  afterEach(() => jest.restoreAllMocks());

  it("uses Math.random to select an opponent attack", async () => {
    const spy = jest.spyOn(Math, "random").mockReturnValue(0.5);
    const store = buildStore();
    store.dispatch(setActiveCharacter(initialTestState.activeCharacter));
    store.dispatch(setActiveOpponent(initialTestState.activeOpponent));

    await store.dispatch(performBattleAction(playerAction()));

    expect(spy).toHaveBeenCalled();
  });

  it("picks different attacks based on Math.random value", async () => {
    const opponent = {
      ...initialTestState.activeOpponent!,
      attacks: [
        { ...initialTestState.activeOpponent!.attacks[0], title: "Slash" },
        { ...initialTestState.activeOpponent!.attacks[0], title: "Smash" },
      ],
    };

    const pickAt = async (rand: number) => {
      jest.spyOn(Math, "random").mockReturnValue(rand);
      const store = buildStore();
      store.dispatch(setActiveCharacter(initialTestState.activeCharacter));
      store.dispatch(setActiveOpponent(opponent));
      await store.dispatch(performBattleAction(playerAction()));
      const log = store.getState().battle.battleLog;
      return log[log.length - 1] ?? "";
    };

    const first = await pickAt(0.0);
    jest.restoreAllMocks();
    const second = await pickAt(0.99);

    expect(first).not.toEqual(second);
  });
});
