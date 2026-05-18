import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithStore } from "@/lib/test-utils";
import { ControlPanel } from "./ContolPanel";
import { usePathname } from "next/navigation";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
  usePathname: jest.fn(),
}));

jest.mock("@/lib/persistence/localPersistence", () => ({
  clearSessionRefreshData: jest.fn(),
}));

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
 * Story: Player navigates using the Control Panel
 * In order to move between screens,
 * a player wants to see relevant navigation buttons based on which screen they are on.
 *
 * Scenario: Map and Party buttons are visible on a standard screen
 *   Given I am on a screen that is not the map, party, or home screen
 *   When the ControlPanel renders
 *   Then I should see the Map and Party buttons
 *
 * Scenario: Map button is hidden on the map screen
 *   Given I am on the map screen
 *   When the ControlPanel renders
 *   Then the Map button should not be visible
 *
 * Scenario: Party button is hidden on the party screen
 *   Given I am on the party screen
 *   When the ControlPanel renders
 *   Then the Party button should not be visible
 *
 * Scenario: Back button is hidden on the home screen
 *   Given I am on the home screen
 *   When the ControlPanel renders
 *   Then the Back button should not be visible
 */
describe("ControlPanel", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Map and Party buttons on a standard screen", () => {
    (usePathname as jest.Mock).mockReturnValue("/questboard");
    renderWithStore(<ControlPanel />, baseState);
    expect(screen.getByAltText("Map Icon")).toBeInTheDocument();
    expect(screen.getByAltText("Party Icon")).toBeInTheDocument();
  });

  it("hides the Map button on the map screen", () => {
    (usePathname as jest.Mock).mockReturnValue("/mapscreen");
    renderWithStore(<ControlPanel />, baseState);
    expect(screen.queryByAltText("Map Icon")).not.toBeInTheDocument();
  });

  it("hides the Party button on the party screen", () => {
    (usePathname as jest.Mock).mockReturnValue("/partyscreen");
    renderWithStore(<ControlPanel />, baseState);
    expect(screen.queryByAltText("Party Icon")).not.toBeInTheDocument();
  });

  it("hides the Back button on the home screen", () => {
    (usePathname as jest.Mock).mockReturnValue("/homescreen");
    renderWithStore(<ControlPanel />, baseState);
    expect(screen.queryByAltText("Back Icon")).not.toBeInTheDocument();
  });
});
