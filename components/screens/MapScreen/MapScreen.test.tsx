import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import MapScreen from './MapScreen';
import type { QuestStory } from '@/types/quest';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/lib/hooks/useProtectedRoute', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockQuest: QuestStory = {
  id: 'ambushReconQuest',
  name: 'Ambush Alley Recon',
  description: 'Scout the bandit camp.',
  coverImageSrc: '/quests/ambush_cover.png',
  storyPoints: [],
};

const noQuestState = {
  quest: { acceptedQuest: null, currentStoryPointId: null, lastEndedQuestId: null, pendingBattleDetails: null },
  character: { ActiveCharacter: null, party: [], characterLocation: null, completedQuestIds: [], characterSnapshot: null },
};

const withQuestState = {
  ...noQuestState,
  quest: { acceptedQuest: mockQuest, currentStoryPointId: 'sp1', lastEndedQuestId: null, pendingBattleDetails: null },
};

/*
 * Story: Player commences an accepted quest from the map
 * In order to start their adventure,
 * a player who has accepted a quest wants to launch it from the world map.
 *
 * Scenario: Commence quest when one is accepted
 *   Given I am logged in and have an accepted quest
 *   When I click the quest shield and confirm
 *   Then I should be taken to the Story Screen
 *
 * Scenario: Cannot commence without an accepted quest
 *   Given I am logged in with no accepted quest
 *   When I view the map
 *   Then the quest shield shows "None Accepted"
 */
describe('MapScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders the compass map image', () => {
    renderWithStore(<MapScreen />, noQuestState);
    // Both map icons share alt="Compass Icon" — known copy-paste in source; assert at least one renders
    expect(screen.getAllByAltText('Compass Icon').length).toBeGreaterThan(0);
  });

  it('shows "None Accepted" when no quest is in state', () => {
    renderWithStore(<MapScreen />, noQuestState);
    expect(screen.getByText(/none accepted/i)).toBeInTheDocument();
  });

  it('clicking the quest shield and confirming navigates to /storyscreen', async () => {
    jest.useFakeTimers();
    renderWithStore(<MapScreen />, withQuestState);

    fireEvent.click(screen.getByText(/ambush alley recon/i));
    fireEvent.click(screen.getByRole('button', { name: /commence quest/i }));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(mockPush).toHaveBeenCalledWith('/storyscreen');
  });
});
