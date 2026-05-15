import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import LocationModal from "./LocationModal";

const mockCloseModal = jest.fn();

/*
 * Story: Player views location details on the map
 * In order to learn about and change their character's location,
 * a player wants to open a modal that displays location information.
 *
 * Scenario: Modal content is visible when open
 *   Given I am on a screen with a LocationModal
 *   When the modal is open
 *   Then I should see the modal title and description
 *
 * Scenario: Modal content is not visible when closed
 *   Given I am on a screen with a LocationModal
 *   When the modal is closed
 *   Then the modal title should not be present in the DOM
 */
describe("LocationModal", () => {
  beforeAll(() => {
    Element.prototype.getAnimations = () => [];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal when isOpen is true", async () => {
    await act(async () => {
      render(<LocationModal isOpen={true} closeModal={mockCloseModal} />);
    });
    expect(screen.getByText("Location Modal")).toBeInTheDocument();
  });

  it("does not render modal content when isOpen is false", async () => {
    await act(async () => {
      render(<LocationModal isOpen={false} closeModal={mockCloseModal} />);
    });
    expect(screen.queryByText("Location Modal")).not.toBeInTheDocument();
  });
});
