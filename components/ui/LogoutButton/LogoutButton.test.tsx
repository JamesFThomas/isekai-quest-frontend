import React from "react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithStore } from "@/lib/test-utils";
import LogoutButton from "./LogoutButton";
import { clearSessionRefreshData } from "@/lib/persistence/localPersistence";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
}));

jest.mock("@/lib/persistence/localPersistence", () => ({
  clearSessionRefreshData: jest.fn(),
}));

/*
 * Story: Player logs out of their session
 * In order to protect their account and end their session,
 * a player wants to click a logout button that clears their data and returns them to the splash screen.
 *
 * Scenario: Logout button is visible
 *   Given I am on a screen with a LogoutButton
 *   When the component renders
 *   Then I should see the logout icon
 *
 * Scenario: Player clicks the logout button
 *   Given I am logged in
 *   When I click the logout button
 *   Then session data should be cleared and I should be redirected to the splash screen
 */
describe("LogoutButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logout icon button", () => {
    renderWithStore(<LogoutButton />);
    expect(screen.getByAltText("Logout Icon")).toBeInTheDocument();
  });

  it("clicking logout clears session data and redirects to splash screen", () => {
    const mockedClearSession = jest.mocked(clearSessionRefreshData);
    const { store } = renderWithStore(<LogoutButton />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockedClearSession).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(store.getState().auth?.isAuthenticated).toBe(false);
  });
});
