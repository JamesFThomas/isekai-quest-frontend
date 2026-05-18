import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import LoginModal from "./LoginModal";

const mockCloseModal = jest.fn();
const mockHandleLoginAndLoadCharacter = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

const defaultProps = {
  isOpen: true,
  closeModal: mockCloseModal,
  handleLoginAndLoadCharacter: mockHandleLoginAndLoadCharacter,
};

/*
 * Story: Player logs into their account via the Login Modal
 * In order to continue their adventure,
 * a player wants to enter their credentials and authenticate successfully.
 *
 * Scenario: Modal renders with title text
 *   Given the LoginModal is open
 *   When the component mounts
 *   Then I should see the modal title
 *
 * Scenario: Username field shows error on invalid email format
 *   Given the LoginModal is open
 *   When I enter an invalid email and blur the field
 *   Then I should see a username validation error
 *
 * Scenario: Password field shows error when too short
 *   Given the LoginModal is open
 *   When I enter a short password and blur the field
 *   Then I should see a password validation error
 *
 * Scenario: Login button is disabled when fields are invalid
 *   Given the LoginModal is open
 *   When I have not entered valid credentials
 *   Then the Login button should be disabled
 *
 * Scenario: Player clicks Cancel
 *   Given the LoginModal is open
 *   When I click the Cancel button
 *   Then the modal should close
 */
describe("LoginModal", () => {
  beforeAll(() => {
    Element.prototype.getAnimations = () => [];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with title text", async () => {
    await act(async () => {
      render(<LoginModal {...defaultProps} />);
    });
    expect(screen.getByText("Continue your quest!")).toBeInTheDocument();
  });

  it("shows validation error for invalid email format", async () => {
    await act(async () => {
      render(<LoginModal {...defaultProps} />);
    });

    const usernameInput = screen.getByPlaceholderText("email@address.com");
    fireEvent.change(usernameInput, { target: { value: "notanemail" } });
    fireEvent.blur(usernameInput);

    expect(
      screen.getByText("Username should be an email@domain.com format"),
    ).toBeInTheDocument();
  });

  it("shows validation error for short password", async () => {
    await act(async () => {
      render(<LoginModal {...defaultProps} />);
    });

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.blur(passwordInput);

    expect(
      screen.getByText("Password must be at least 7 characters long"),
    ).toBeInTheDocument();
  });

  it("Login button is disabled when fields are invalid", async () => {
    await act(async () => {
      render(<LoginModal {...defaultProps} />);
    });
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  it("clicking Cancel closes the modal", async () => {
    await act(async () => {
      render(<LoginModal {...defaultProps} />);
    });
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
