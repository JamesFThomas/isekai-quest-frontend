import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithStore } from "@/lib/test-utils";
import { RefreshDataProvider } from "./RefreshDataProvider";
import { loadSessionRefreshData } from "@/lib/persistence/localPersistence";
import { PersistenceResponse } from "@/types/persistence";

jest.mock("@/lib/persistence/localPersistence", () => ({
  loadSessionRefreshData: jest.fn(),
}));

const mockLoadSessionRefreshData = jest.mocked(loadSessionRefreshData);

const baseState = {
  auth: {
    isAuthenticated: false,
    user: null,
  },
  quest: {
    availableQuests: [
      {
        id: "ambushReconQuest",
        name: "Ambush Alley Recon",
        description: "Scout the bandit camp.",
        coverImageSrc: "/quests/ambush_cover.png",
        storyPoints: [],
      },
    ],
    acceptedQuest: null,
    currentStoryPointId: null,
    lastEndedQuestId: null,
    pendingBattleDetails: null,
  },
  character: {
    ActiveCharacter: null,
    characterLocation: null,
    party: [],
    completedQuestIds: [],
    characterData: null,
    location: null,
    characterSnapshot: null,
  },
};

const mockCharacter = {
  id: "char-001",
  name: "Aric",
  avatar: "/character_avatars/aric.png",
  hp: 100,
  mp: 50,
  inventory: {
    attacks: [],
    skills: [],
    coins: { gold: 0, silver: 0, copper: 0 },
    weapons: [],
    equipment: [],
    rations: [],
    potions: [],
    questItems: [],
  },
};

const mockRefreshData: PersistenceResponse = {
  success: true,
  message: "Session refresh data loaded successfully.",
  data: {
    refreshSessionData: {
      accountId: "account-001",
      email: "aric@test.com",
      playerId: "player-001",
      acceptedQuestId: null,
      currentStoryPointId: null,
      lastEndedQuestId: null,
      characterSnapshot: {
        characterData: mockCharacter,
        progressionData: {
          completedQuestIds: [],
          acceptedQuestId: null,
          currentTown: "StartsVille",
          currentStoryPointId: null,
          lastEndedQuestId: null,
        },
      },
    },
  },
};

/*
 * Story: Player's session is restored after a browser refresh
 * In order to continue their adventure without logging in again,
 * a player's auth, character, and quest state should be rehydrated from local storage on mount.
 *
 * Scenario: Children render after session data loads
 *   Given valid session refresh data exists in local storage
 *   When the RefreshDataProvider mounts
 *   Then children should be visible after rehydration
 *
 * Scenario: Auth state is restored from session refresh data
 *   Given valid session refresh data exists
 *   When the RefreshDataProvider mounts
 *   Then the store should reflect an authenticated user
 *
 * Scenario: Children render when no session data exists
 *   Given no session refresh data exists in local storage
 *   When the RefreshDataProvider mounts
 *   Then children should still be rendered
 */
describe("RefreshDataProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children after session data is loaded", async () => {
    mockLoadSessionRefreshData.mockReturnValue(mockRefreshData);

    renderWithStore(
      <RefreshDataProvider>
        <div>Child Content</div>
      </RefreshDataProvider>,
      baseState,
    );

    expect(await screen.findByText("Child Content")).toBeInTheDocument();
  });

  it("restores auth state from session refresh data", async () => {
    mockLoadSessionRefreshData.mockReturnValue(mockRefreshData);

    const { store } = renderWithStore(
      <RefreshDataProvider>
        <div>Child Content</div>
      </RefreshDataProvider>,
      baseState,
    );

    await screen.findByText("Child Content");

    expect(store.getState().auth.isAuthenticated).toBe(true);
  });

  it("renders children when no session refresh data exists", async () => {
    mockLoadSessionRefreshData.mockReturnValue({
      success: false,
      data: null,
      message: "No session refresh data found.",
    } as PersistenceResponse);

    renderWithStore(
      <RefreshDataProvider>
        <div>Child Content</div>
      </RefreshDataProvider>,
      baseState,
    );

    expect(await screen.findByText("Child Content")).toBeInTheDocument();
  });
});
