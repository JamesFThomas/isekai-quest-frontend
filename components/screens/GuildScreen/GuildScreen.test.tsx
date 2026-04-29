import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import GuildScreen from './GuildScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/lib/hooks/useProtectedRoute', () => ({
  __esModule: true,
  default: jest.fn(),
}));

/*
 * Story: Player visits the Guild Hall
 * In order to access guild features,
 * a logged-in player wants to see the Guild Hall with navigation options.
 *
 * Scenario: Guild Hall shows navigation panel
 *   Given I am logged in
 *   When I visit the Guild Hall
 *   Then I should see the title "Guild Hall"
 *   And I should see at least one guild navigation option
 */
describe('GuildScreen', () => {
  it('renders the Guild Hall title', () => {
    renderWithStore(<GuildScreen />);
    expect(screen.getByText('Guild Hall')).toBeInTheDocument();
  });

  it('renders guild navigation options', () => {
    renderWithStore(<GuildScreen />);
    expect(screen.getByRole('button', { name: /quest board/i })).toBeInTheDocument();
  });
});
