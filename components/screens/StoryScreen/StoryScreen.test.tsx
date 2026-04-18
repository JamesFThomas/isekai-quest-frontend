import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithStore } from '@/lib/test-utils';
import StoryScreen from './StoryScreen';
import type { QuestStory } from '@/types/quest';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/lib/hooks/useProtectedRoute', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockOpponent = { id: 'opp-1', name: 'Goblin', avatar: '/g.png', hp: 40, mp: 0, attacks: [] };

const mockQuest: QuestStory = {
  id: 'q1',
  name: 'Test Quest',
  description: 'desc',
  coverImageSrc: '/cover.png',
  storyPoints: [
    {
      id: 'sp1',
      imageSrc: '/sp1.png',
      text: 'You stand at the crossroads.',
      choices: [
        { label: 'a', text: 'Go north', nextPointId: 'sp2', outcome: undefined },
        { label: 'b', text: 'Fight', nextPointId: null, outcome: { battle: { opponent: mockOpponent, escapeAllowed: true, nextPoints: { win: 'sp2', lose: 'sp3', flee: 'sp4' } } } },
        { label: 'c', text: 'Complete', nextPointId: null, outcome: { endState: 'completed' } },
        { label: 'd', text: 'Fail', nextPointId: null, outcome: { endState: 'failed' } },
      ],
    },
    {
      id: 'sp2',
      imageSrc: '/sp2.png',
      text: 'You head north.',
      choices: [{ label: 'a', text: 'Pick herb', nextPointId: 'sp2', outcome: { effect: { hp: 5 } } }],
    },
  ],
};

const preloadedState = {
  quest: {
    acceptedQuest: mockQuest,
    currentStoryPointId: 'sp1',
    lastEndedQuestId: null,
    pendingBattleDetails: null,
  },
};

describe('StoryScreen', () => {
  it('renders the current story point text', () => {
    renderWithStore(<StoryScreen />, preloadedState);
    expect(screen.getByText('You stand at the crossroads.')).toBeInTheDocument();
  });

  it('renders choice buttons for the current story point', () => {
    renderWithStore(<StoryScreen />, preloadedState);
    expect(screen.getByText('Go north')).toBeInTheDocument();
    expect(screen.getByText('Fight')).toBeInTheDocument();
  });

  it('clicking a non-battle non-terminal choice dispatches setCurrentStoryPointId with the next point ID', () => {
    const { store } = renderWithStore(<StoryScreen />, preloadedState);
    fireEvent.click(screen.getByText('Go north'));
    expect(store.getState().quest.currentStoryPointId).toBe('sp2');
  });

  it('clicking a battle choice resets battle state, stores pending details, and sets active opponent', () => {
    const { store } = renderWithStore(<StoryScreen />, {
      ...preloadedState,
      battle: { result: 'win', phase: null, round: null, battleLog: [], activeOpponent: null, activeCharacter: null, isPlayerTurn: true, battleId: null, resolution: null, escapeAllowed: false, escapePenalty: null, reward: null, nextPoints: null },
    });
    fireEvent.click(screen.getByText('Fight'));
    expect(store.getState().quest.pendingBattleDetails?.opponent.id).toBe('opp-1');
    expect(store.getState().battle.result).toBeNull();
    expect(store.getState().battle.activeOpponent?.id).toBe('opp-1');
    expect(mockPush).toHaveBeenCalledWith('/battlescreen');
  });

  it('clicking a terminal completed choice dispatches markQuestCompletedAndClearState', () => {
    const { store } = renderWithStore(<StoryScreen />, preloadedState);
    fireEvent.click(screen.getByText('Complete'));
    expect(store.getState().quest.acceptedQuest).toBeNull();
    expect(store.getState().quest.lastEndedQuestId).toBe('q1');
  });

  it('clicking a terminal failed choice dispatches markQuestFailedAndClearState', () => {
    const { store } = renderWithStore(<StoryScreen />, preloadedState);
    fireEvent.click(screen.getByText('Fail'));
    expect(store.getState().quest.acceptedQuest).toBeNull();
    expect(store.getState().quest.lastEndedQuestId).toBe('q1');
  });

  it('clicking an effect choice dispatches applyQuestEffect', () => {
    const mockChar = { id: 'c1', name: 'Hero', hp: 50, mp: 20, avatar: '/a.png', inventory: { attacks: [], skills: [], potions: [], rations: [], weapons: [], equipment: [], questItems: [], coins: { gold: 0, silver: 0, copper: 0 } } };
    const effectState = {
      ...preloadedState,
      quest: { ...preloadedState.quest, currentStoryPointId: 'sp2' },
      character: { ActiveCharacter: mockChar, characterLocation: null, party: [], completedQuestIds: [], characterSnapshot: null },
    };
    const { store } = renderWithStore(<StoryScreen />, effectState);
    fireEvent.click(screen.getByText('Pick herb'));
    expect(store.getState().character.ActiveCharacter?.hp).toBe(55);
  });
});
