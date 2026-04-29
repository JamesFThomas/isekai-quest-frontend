import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import QuestBoardScreen from './QuestBoardScreen';
import type { QuestStory } from '@/types/quest';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/lib/hooks/useProtectedRoute', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const baseState = {
  quest: { acceptedQuest: null, currentStoryPointId: null, lastEndedQuestId: null, pendingBattleDetails: null },
};

const enabledQuest: QuestStory = {
  id: 'ambushReconQuest',
  name: 'Ambush Alley Recon',
  description: 'Scout the bandit camp.',
  coverImageSrc: '/quests/ambush_cover.png',
  storyPoints: [
    {
      id: 'sp1',
      imageSrc: '/sp1.png',
      text: 'You reach the ambush point.',
      choices: [{ label: 'a', text: 'Continue', nextPointId: null, outcome: { endState: 'completed' } }],
    },
  ],
};

/*
 * Story: Player accepts a quest at the Quest Board
 * In order to begin their adventure,
 * a player at the Quest Board wants to choose and accept a quest.
 *
 * Scenario: Quest cards are displayed on the board
 *   Given I am logged in
 *   When I visit the Quest Board
 *   Then I should see quest cards for available quests
 *
 * Scenario: Player accepts a quest
 *   Given I am logged in and at the Quest Board
 *   When I click a quest and accept it
 *   Then that quest should be my active quest
 *
 * Scenario: Accepted quest is visually distinguished
 *   Given I have an active quest
 *   When I view the Quest Board
 *   Then the accepted quest image has a highlight class applied
 */
describe('QuestBoardScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders quest cards from the quest data', () => {
    renderWithStore(<QuestBoardScreen />, baseState);
    expect(screen.getByText(enabledQuest.name)).toBeInTheDocument();
  });

  it('clicking a quest and accepting it updates store state', async () => {
    jest.useFakeTimers();
    const { store } = renderWithStore(<QuestBoardScreen />, baseState);

    fireEvent.click(screen.getByAltText(`${enabledQuest.name} Quest Image`));
    fireEvent.click(screen.getByRole('button', { name: /accept/i }));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(store.getState().quest.acceptedQuest?.id).toBe(enabledQuest.id);
  });

  it('the accepted quest image has a highlight class', () => {
    const acceptedState = {
      quest: {
        acceptedQuest: enabledQuest,
        currentStoryPointId: enabledQuest.storyPoints[0]?.id ?? null,
        lastEndedQuestId: null,
        pendingBattleDetails: null,
      },
    };
    renderWithStore(<QuestBoardScreen />, acceptedState);
    const questImg = screen.getByAltText(`${enabledQuest.name} Quest Image`);
    expect(questImg).toHaveClass('ring-yellow-300');
  });
});
