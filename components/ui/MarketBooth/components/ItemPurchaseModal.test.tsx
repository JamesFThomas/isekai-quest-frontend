import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ItemPurchaseModal } from "./ItemPurchaseModal";
import { InventoryItemBase } from "@/types/character";

const mockCloseModal = jest.fn();
const mockHandleItemPurchase = jest.fn();

jest.mock("../../ModalBase/ModalBase", () => ({
  ModalBase: ({
    isOpen,
    title,
    children,
  }: {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
  }) =>
    isOpen ? (
      <div data-testid="modal-base">
        <h2>{title}</h2>
        {children}
      </div>
    ) : null,
}));

const mockWeapon: InventoryItemBase = {
  id: "weapon-001",
  title: "Iron Sword",
  description: "A basic iron sword.",
  icon: "/icons/iron_sword.png",
  type: "weapon",
  price: { gold: 10, silver: 0, copper: 0 },
  effect: {},
};

const mockPotion: InventoryItemBase = {
  id: "potion-001",
  title: "Health Potion",
  description: "Restores 50 HP.",
  icon: "/icons/health_potion.png",
  type: "potion",
  price: { gold: 0, silver: 5, copper: 0 },
  effect: {},
};

/*
 * Story: Player reviews and purchases an item from a market booth
 * In order to equip or supply their character,
 * a player wants to see item details and confirm a purchase via the ItemPurchaseModal.
 *
 * Scenario: Modal renders null when no item is provided
 *   Given no booth item is passed
 *   When the ItemPurchaseModal renders
 *   Then nothing should be rendered
 *
 * Scenario: Modal renders item details when open
 *   Given a booth item is passed and the modal is open
 *   When the ItemPurchaseModal renders
 *   Then the item title and description should be visible
 *
 * Scenario: Modal title reflects the item type
 *   Given a weapon item is passed
 *   When the ItemPurchaseModal renders
 *   Then the modal title should be "Weapons"
 *
 * Scenario: Modal title reflects potion item type
 *   Given a potion item is passed
 *   When the ItemPurchaseModal renders
 *   Then the modal title should be "Potions"
 *
 * Scenario: Clicking Purchase calls handleItemPurchase with the item
 *   Given the modal is open with a booth item
 *   When I click the Purchase button
 *   Then handleItemPurchase should be called with the item
 *
 * Scenario: Clicking Close calls closeModal
 *   Given the modal is open with a booth item
 *   When I click the Close button
 *   Then closeModal should be called
 */
describe("ItemPurchaseModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders null when no booth item is provided", () => {
    render(
      <ItemPurchaseModal
        isOpen={true}
        closeModal={mockCloseModal}
        boothItem={null}
        handleItemPurchase={mockHandleItemPurchase}
      />,
    );
    expect(screen.queryByTestId("modal-base")).not.toBeInTheDocument();
  });

  it("renders item title and description when open", () => {
    render(
      <ItemPurchaseModal
        isOpen={true}
        closeModal={mockCloseModal}
        boothItem={mockWeapon}
        handleItemPurchase={mockHandleItemPurchase}
      />,
    );
    expect(screen.getByText("Iron Sword")).toBeInTheDocument();
    expect(screen.getByText("A basic iron sword.")).toBeInTheDocument();
  });

  it("renders the correct title for a weapon item type", () => {
    render(
      <ItemPurchaseModal
        isOpen={true}
        closeModal={mockCloseModal}
        boothItem={mockWeapon}
        handleItemPurchase={mockHandleItemPurchase}
      />,
    );
    expect(screen.getByText("Weapons")).toBeInTheDocument();
  });

  it("renders the correct title for a potion item type", () => {
    render(
      <ItemPurchaseModal
        isOpen={true}
        closeModal={mockCloseModal}
        boothItem={mockPotion}
        handleItemPurchase={mockHandleItemPurchase}
      />,
    );
    expect(screen.getByText("Potions")).toBeInTheDocument();
  });

  it("clicking Purchase calls handleItemPurchase with the item", () => {
    render(
      <ItemPurchaseModal
        isOpen={true}
        closeModal={mockCloseModal}
        boothItem={mockWeapon}
        handleItemPurchase={mockHandleItemPurchase}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /purchase/i }));
    expect(mockHandleItemPurchase).toHaveBeenCalledTimes(1);
    expect(mockHandleItemPurchase).toHaveBeenCalledWith(mockWeapon);
  });

  it("clicking Close calls closeModal", () => {
    render(
      <ItemPurchaseModal
        isOpen={true}
        closeModal={mockCloseModal}
        boothItem={mockWeapon}
        handleItemPurchase={mockHandleItemPurchase}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
