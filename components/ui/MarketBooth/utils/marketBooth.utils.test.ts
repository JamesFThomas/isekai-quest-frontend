import { formatPriceDisplay, canAffordItem } from "./marketBooth.utils";
import { Coins } from "@/types/character";

/*
 * Story: Market booth displays accurate pricing and purchase eligibility
 * In order to make informed purchases,
 * a player wants to see correctly formatted prices and know which items they can afford.
 *
 * Scenario: formatPriceDisplay returns gold label when gold value is set
 *   Given a price with a gold value
 *   When formatPriceDisplay is called
 *   Then it should return a formatted gold label and amount
 *
 * Scenario: formatPriceDisplay returns silver label when only silver is set
 *   Given a price with a silver value and no gold
 *   When formatPriceDisplay is called
 *   Then it should return a formatted silver label and amount
 *
 * Scenario: formatPriceDisplay returns copper label when only copper is set
 *   Given a price with a copper value and no gold or silver
 *   When formatPriceDisplay is called
 *   Then it should return a formatted copper label and amount
 *
 * Scenario: formatPriceDisplay returns empty label when all values are zero
 *   Given a price with all zero values
 *   When formatPriceDisplay is called
 *   Then it should return an empty label and zero amount
 *
 * Scenario: canAffordItem returns true when character has enough coins
 *   Given a character with sufficient coins
 *   When canAffordItem is called
 *   Then it should return true
 *
 * Scenario: canAffordItem returns false when character cannot afford the item
 *   Given a character with insufficient coins
 *   When canAffordItem is called
 *   Then it should return false
 *
 * Scenario: canAffordItem returns false when character coins are undefined
 *   Given no character coins are provided
 *   When canAffordItem is called
 *   Then it should return false
 */
describe("marketBooth.utils", () => {
  describe("formatPriceDisplay", () => {
    it("returns gold label and amount when gold value is set", () => {
      const price: Coins = { gold: 10, silver: 0, copper: 0 };
      const result = formatPriceDisplay(price);
      expect(result.label).toBe("10 Gold");
      expect(result.shortLabel).toBe("10G");
      expect(result.amount).toBe(10);
    });

    it("returns silver label and amount when only silver is set", () => {
      const price: Coins = { gold: 0, silver: 5, copper: 0 };
      const result = formatPriceDisplay(price);
      expect(result.label).toBe("5 Silver");
      expect(result.shortLabel).toBe("5S");
      expect(result.amount).toBe(5);
    });

    it("returns copper label and amount when only copper is set", () => {
      const price: Coins = { gold: 0, silver: 0, copper: 25 };
      const result = formatPriceDisplay(price);
      expect(result.label).toBe("25 Copper");
      expect(result.shortLabel).toBe("25C");
      expect(result.amount).toBe(25);
    });

    it("returns empty label and zero amount when all values are zero", () => {
      const price: Coins = { gold: 0, silver: 0, copper: 0 };
      const result = formatPriceDisplay(price);
      expect(result.label).toBe("");
      expect(result.amount).toBe(0);
    });
  });

  describe("canAffordItem", () => {
    it("returns true when character has enough gold", () => {
      const characterCoins: Coins = { gold: 20, silver: 0, copper: 0 };
      const price: Coins = { gold: 10, silver: 0, copper: 0 };
      expect(canAffordItem(characterCoins, price)).toBe(true);
    });

    it("returns false when character does not have enough gold", () => {
      const characterCoins: Coins = { gold: 5, silver: 0, copper: 0 };
      const price: Coins = { gold: 10, silver: 0, copper: 0 };
      expect(canAffordItem(characterCoins, price)).toBe(false);
    });

    it("returns false when character coins are undefined", () => {
      const price: Coins = { gold: 10, silver: 0, copper: 0 };
      expect(canAffordItem(undefined, price)).toBe(false);
    });
  });
});
