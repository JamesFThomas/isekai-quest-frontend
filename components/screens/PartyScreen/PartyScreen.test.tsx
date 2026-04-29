import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import PartyScreen from './PartyScreen';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/lib/hooks/useProtectedRoute', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockCharacter = {
  id: 'c1',
  name: 'Aria',
  hp: 50,
  maxHp: 50,
  mp: 20,
  maxMp: 20,
  avatar: '/test-avatar.png',
  class: 'elf' as const,
  inventory: {
    attacks: [],
    skills: [],
    potions: [],
    rations: [],
    weapons: [],
    equipment: [],
    questItems: [],
    coins: { gold: 5, silver: 0, copper: 0 },
  },
};

const preloadedState = {
  character: {
    ActiveCharacter: mockCharacter,
    party: [],
    characterLocation: null,
    completedQuestIds: [],
    characterSnapshot: null,
  },
};

/*
 * Story: Player views their active character
 * In order to manage their party and inventory,
 * a logged-in player wants to see their character's name and stats.
 *
 * Scenario: Character stats are shown on the Party Screen
 *   Given I am logged in with an active character named "Aria"
 *   When I visit the Party Screen
 *   Then I should see "Aria" as my character's name
 *   And I should see my character's HP and MP
 */
describe('PartyScreen', () => {
  it('renders without crashing when an active character exists', () => {
    renderWithStore(<PartyScreen />, preloadedState);
    expect(screen.getByText(/aria/i)).toBeInTheDocument();
  });

  it('renders the active character HP from Redux state', () => {
    renderWithStore(<PartyScreen />, preloadedState);
    expect(screen.getByText(/50/)).toBeInTheDocument();
  });

  it('renders the active character MP from Redux state', () => {
    renderWithStore(<PartyScreen />, preloadedState);
    expect(screen.getByText(/20/)).toBeInTheDocument();
  });
});
