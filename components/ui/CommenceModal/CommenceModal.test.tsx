import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CommenceModal from "./CommenceModal";
import type { QuestStory } from "@/types/quest";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

const mockCloseModal = jest.fn();
const mockCommenceQuest = jest.fn();

const mockQuest: QuestStory = {
  id: "ambushReconQuest",
  name: "Ambush Alley Recon",
  description: "Scout the bandit camp.",
  coverImageSrc: "/quests/ambush_cover.png",
  storyPoints: [],
};

/*
 * Story: Player commences an accepted quest
 * In order to begin their adventure,
 * a player wants to confirm and start their accepted quest via the CommenceModal.
 *
 * Scenario: Modal displays quest info when open
 *   Given I have an accepted quest
 *   When the CommenceModal is open
 *   Then I should see the quest name and description
 *
 * Scenario: Player clicks Commence Quest
 *   Given the CommenceModal is open with a quest
 *   When I click the Commence Quest button
 *   Then the commenceQuest callback should be called
 *
 * Scenario: Player clicks Cancel
 *   Given the CommenceModal is open
 *   When I click the Cancel button
 *   Then the modal should close
 */
describe("CommenceModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders quest info when isOpen is true", () => {
    render(
      <CommenceModal
        isOpen={true}
        quest={mockQuest}
        closeModal={mockCloseModal}
        commenceQuest={mockCommenceQuest}
      />,
    );

    expect(screen.getByText(mockQuest.name)).toBeInTheDocument();
    expect(screen.getByText(mockQuest.description)).toBeInTheDocument();
  });

  it("clicking Commence Quest calls commenceQuest callback", async () => {
    jest.useFakeTimers();

    render(
      <CommenceModal
        isOpen={true}
        quest={mockQuest}
        closeModal={mockCloseModal}
        commenceQuest={mockCommenceQuest}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /commence quest/i }));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(mockCommenceQuest).toHaveBeenCalledTimes(1);
  });

  it("clicking Cancel closes the modal", () => {
    render(
      <CommenceModal
        isOpen={true}
        quest={mockQuest}
        closeModal={mockCloseModal}
        commenceQuest={mockCommenceQuest}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
