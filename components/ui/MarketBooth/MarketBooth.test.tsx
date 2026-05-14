import React from "react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithStore } from "@/lib/test-utils";
import { MarketBooth } from "./MarketBooth";
import { usePathname } from "next/navigation";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
  usePathname: jest.fn(),
}));

/* 
Modal mocked to avoid headless UI error about missing app element in tests, 
allowing for testing of modal open state without needing to interact with 
the actual modal content.
*/
jest.mock("./components/ItemPurchaseModal", () => ({
  ItemPurchaseModal: ({
    isOpen,
    children,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
  }) => (isOpen ? <div data-testid="purchase-modal">{children}</div> : null),
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
    ActiveCharacter: {
      id: "char-001",
      name: "Aric",
      avatar: "/character_avatars/aric.png",
      hp: 100,
      mp: 50,
      inventory: {
        attacks: [],
        skills: [],
        coins: { gold: 100, silver: 50, copper: 25 },
        weapons: [],
        equipment: [],
        rations: [],
        potions: [],
        questItems: [],
      },
    },
    characterLocation: null,
    party: [],
    completedQuestIds: [],
    characterData: null,
    location: null,
    characterSnapshot: null,
  },
};

/*
 * Story: Player browses and purchases items at the Market Booth
 * In order to equip their character,
 * a player wants to view items available in the current market section and purchase them.
 *
 * Scenario: Booth renders no items on an unrecognized route
 *   Given I am on a route that is not a market section
 *   When the MarketBooth renders
 *   Then no booth items should be displayed
 *
 * Scenario: Booth renders items for the weapons market route
 *   Given I am on the weapons market route
 *   When the MarketBooth renders
 *   Then weapon items should be displayed
 *
 * Scenario: Clicking a booth item opens the purchase modal
 *   Given I am on the weapons market route with affordable items
 *   When I click a booth item
 *   Then the purchase modal should open
 */
describe("MarketBooth", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders no booth items on an unrecognized route", () => {
    (usePathname as jest.Mock).mockReturnValue("/marketscreen");
    renderWithStore(<MarketBooth />, baseState);
    expect(
      screen.queryByRole("button", { name: /gold|silver|copper/i }),
    ).not.toBeInTheDocument();
  });

  it("renders booth items for the weapons market route", () => {
    (usePathname as jest.Mock).mockReturnValue("/marketscreen/weapons");
    renderWithStore(<MarketBooth />, baseState);
    const items = screen.getAllByRole("button");
    expect(items.length).toBeGreaterThan(0);
  });

  it("clicking a booth item opens the purchase modal", () => {
    (usePathname as jest.Mock).mockReturnValue("/marketscreen/weapons");
    renderWithStore(<MarketBooth />, baseState);
    const enabledItems = screen
      .getAllByRole("button")
      .filter((btn) => !btn.hasAttribute("disabled"));
    expect(enabledItems.length).toBeGreaterThan(0);
    fireEvent.click(enabledItems[0]);
    expect(screen.getByTestId("purchase-modal")).toBeInTheDocument();
  });
});
