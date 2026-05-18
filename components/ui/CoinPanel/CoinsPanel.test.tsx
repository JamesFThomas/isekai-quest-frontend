import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CoinsPanel, { formatCoinsForDisplay } from "./CoinsPanel";
import { Coins } from "@/types/character";

const mockCoins: Coins = {
  gold: 10,
  silver: 25,
  copper: 50,
};

/*
 * Story: Player views their coin totals in the Coins Panel
 * In order to track their wealth,
 * a player wants to see their gold, silver, and copper counts displayed.
 *
 * Scenario: Panel renders all three coin types with correct counts
 *   Given a player with coins
 *   When the CoinsPanel renders
 *   Then I should see gold, silver, and copper counts
 *
 * Scenario: Panel renders with zero counts when no coins are provided
 *   Given no coin data is passed
 *   When the CoinsPanel renders
 *   Then all coin counts should display as zero
 *
 * Scenario: formatCoinsForDisplay returns correct structure
 *   Given a coins object
 *   When formatCoinsForDisplay is called
 *   Then it should return gold, silver, and copper in the correct order with correct counts
 */
describe("CoinsPanel", () => {
  it("renders all three coin types with correct counts", () => {
    render(<CoinsPanel coins={mockCoins} />);
    expect(screen.getByText("Gold: 10")).toBeInTheDocument();
    expect(screen.getByText("Silver: 25")).toBeInTheDocument();
    expect(screen.getByText("Copper: 50")).toBeInTheDocument();
  });

  it("renders zero counts when no coins are provided", () => {
    render(<CoinsPanel coins={undefined} />);
    expect(screen.getByText("Gold: 0")).toBeInTheDocument();
    expect(screen.getByText("Silver: 0")).toBeInTheDocument();
    expect(screen.getByText("Copper: 0")).toBeInTheDocument();
  });

  describe("formatCoinsForDisplay", () => {
    it("returns correct structure and order for given coins", () => {
      const result = formatCoinsForDisplay(mockCoins);
      expect(result[0]).toMatchObject({ title: "Gold", count: 10 });
      expect(result[1]).toMatchObject({ title: "Silver", count: 25 });
      expect(result[2]).toMatchObject({ title: "Copper", count: 50 });
    });
  });
});
