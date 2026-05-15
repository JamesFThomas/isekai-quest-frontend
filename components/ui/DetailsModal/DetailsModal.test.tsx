import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DetailsModal from "./DetailsModal";
import type { QuestStory } from "@/types/quest";

const mockCloseModal = jest.fn();
const mockAcceptQuest = jest.fn();

const mockQuest: QuestStory = {
  id: "ambushReconQuest",
  name: "Ambush Alley Recon",
  description: "Scout the bandit camp.",
  coverImageSrc: "/quests/ambush_cover.png",
  storyPoints: [],
};

/*
 * Story: Player views and accepts a quest from the Details Modal
 * In order to commit to an adventure,
 * a player wants to review quest details and accept it from the DetailsModal.
 *
 * Scenario: Modal displays quest details when open
 *   Given I have selected a quest
 *   When the DetailsModal is open
 *   Then I should see the quest name and description
 *
 * Scenario: Player clicks Accept
 *   Given the DetailsModal is open with a quest
 *   When I click the Accept button
 *   Then the acceptQuest callback should be called with the quest
 *
 * Scenario: Player clicks Cancel
 *   Given the DetailsModal is open
 *   When I click the Cancel button
 *   Then the modal should close
 */
describe("DetailsModal", () => {
  beforeAll(() => {
    Element.prototype.getAnimations = () => [];
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders quest details when isOpen is true", async () => {
    await act(async () => {
      render(
        <DetailsModal
          isOpen={true}
          quest={mockQuest}
          closeModal={mockCloseModal}
          acceptQuest={mockAcceptQuest}
        />,
      );
    });

    expect(screen.getByText(mockQuest.name)).toBeInTheDocument();
    expect(screen.getByText(mockQuest.description)).toBeInTheDocument();
  });

  it("clicking Accept dispatches setAcceptedQuest", async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(
        <DetailsModal
          isOpen={true}
          quest={mockQuest}
          closeModal={mockCloseModal}
          acceptQuest={mockAcceptQuest}
        />,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /accept/i }));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(mockAcceptQuest).toHaveBeenCalledTimes(1);
    expect(mockAcceptQuest).toHaveBeenCalledWith(mockQuest);
  });

  it("clicking Cancel closes the modal", async () => {
    await act(async () => {
      render(
        <DetailsModal
          isOpen={true}
          quest={mockQuest}
          closeModal={mockCloseModal}
          acceptQuest={mockAcceptQuest}
        />,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
