import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InteractionPanel, { PanelOption } from "./InteractionPanel";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
}));

const mockOptions: PanelOption[] = [
  {
    id: 1,
    name: "Quest Board",
    pageRoute: "/quest-board",
    src: "/icons/quest_board.png",
    altText: "Quest Board Icon",
  },
  {
    id: 2,
    name: "Market",
    pageRoute: "/market",
    src: "/icons/market.png",
    altText: "Market Icon",
  },
];

/*
 * Story: Player views and interacts with the Interaction Panel
 * In order to navigate the game world,
 * a player wants to see available options and click them to navigate to the correct screen.
 *
 * Scenario: Panel title is displayed
 *   Given the InteractionPanel is rendered with a title
 *   When the component mounts
 *   Then I should see the panel title
 *
 * Scenario: All option items are rendered
 *   Given the InteractionPanel is rendered with an optionArray
 *   When the component mounts
 *   Then I should see a button for each option with the correct name
 */
describe("InteractionPanel", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the panel title", () => {
    render(<InteractionPanel title="Town Square" optionArray={mockOptions} />);
    expect(screen.getByText("Town Square")).toBeInTheDocument();
  });

  it("renders all option items passed via optionArray", () => {
    render(<InteractionPanel title="Town Square" optionArray={mockOptions} />);
    mockOptions.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });
});
