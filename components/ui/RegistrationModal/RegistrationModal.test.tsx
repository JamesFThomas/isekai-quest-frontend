import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import RegistrationModal from "./RegistrationModal";
import { NewPlayerData } from "../../screens/CreateCharacterScreen/CreateCharacterScreen";

const mockCloseModal = jest.fn();
const mockHandleCharacterCreationAndLogin = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock("@/lib/persistence/localPersistence", () => ({
  saveSessionRefreshData: jest.fn(),
}));

jest.mock("@/lib/persistence/persistence", () => ({
  persistence: {
    createAccount: jest.fn(),
  },
}));

const mockPlayerData: NewPlayerData = {
  characterName: "Aric",
  userName: "aric@test.com",
  password: "password123",
  avatar: "/character_avatars/default_avatar.png",
  characterClass: "warrior",
};

const defaultProps = {
  isOpen: true,
  closeModal: mockCloseModal,
  handleCharacterCreationAndLogin: mockHandleCharacterCreationAndLogin,
};

/*
 * Story: Player reviews and confirms their character data before registration
 * In order to create their account and begin their adventure,
 * a player wants to review their chosen character details and submit registration.
 *
 * Scenario: Modal renders with title text
 *   Given the RegistrationModal is open
 *   When the component mounts
 *   Then I should see the modal title
 *
 * Scenario: Modal displays player data when provided
 *   Given the RegistrationModal is open with player data
 *   When the component mounts
 *   Then I should see the character name and username
 *
 * Scenario: Player clicks Back
 *   Given the RegistrationModal is open
 *   When I click the Back button
 *   Then the modal should close
 */
describe("RegistrationModal", () => {
  beforeAll(() => {
    Element.prototype.getAnimations = () => [];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with title text", async () => {
    await act(async () => {
      render(<RegistrationModal {...defaultProps} />);
    });
    expect(screen.getByText("Your Player Data!")).toBeInTheDocument();
  });

  it("renders player data when provided", async () => {
    await act(async () => {
      render(<RegistrationModal {...defaultProps} playerData={mockPlayerData} />);
    });
    expect(screen.getByText("Aric")).toBeInTheDocument();
    expect(screen.getByText("aric@test.com")).toBeInTheDocument();
  });

  it("clicking Back closes the modal", async () => {
    await act(async () => {
      render(<RegistrationModal {...defaultProps} />);
    });
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
