import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithStore } from "@/lib/test-utils";
import { GameDataProvider } from "./GameDataProvider";

const baseState = {
  auth: {
    isAuthenticated: false,
    user: null,
  },
  quest: {
    availableQuests: [],
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

/*
 * Story: Game data is loaded when the app initializes
 * In order to populate the game world,
 * the GameDataProvider dispatches available quest data into the Redux store on mount.
 *
 * Scenario: Children are rendered by the provider
 *   Given the GameDataProvider wraps child content
 *   When the component mounts
 *   Then the child content should be visible
 *
 * Scenario: Available quests are dispatched to the store on mount
 *   Given the GameDataProvider mounts with an empty quest state
 *   When the component renders
 *   Then the store should contain the available quests
 */
describe("GameDataProvider", () => {
  it("renders its children", () => {
    renderWithStore(
      <GameDataProvider>
        <div>Child Content</div>
      </GameDataProvider>,
      baseState,
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("dispatches available quests to the store on mount", () => {
    const { store } = renderWithStore(
      <GameDataProvider>
        <div>Child Content</div>
      </GameDataProvider>,
      baseState,
    );
    expect(store.getState().quest.availableQuests.length).toBeGreaterThan(0);
  });
});
