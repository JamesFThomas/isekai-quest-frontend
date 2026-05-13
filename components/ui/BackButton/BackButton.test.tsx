import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "./BackButton";

const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ back: mockBack })),
}));

/*
 * Story: Player navigates back from a screen
 * In order to return to the previous screen,
 * a player wants to click a back button that takes them to where they came from.
 *
 * Scenario: Back button is visible on the screen
 *   Given I am on any screen with a BackButton
 *   When the component renders
 *   Then I should see the back button image
 *
 * Scenario: Player clicks the back button
 *   Given I am on a screen with a BackButton
 *   When I click the back button
 *   Then I should be navigated to the previous page
 */
describe("BackButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a back button", () => {
    render(<BackButton />);
    expect(screen.getByAltText("Back Icon")).toBeInTheDocument();
  });

  it("clicking navigates to the previous page", () => {
    render(<BackButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
