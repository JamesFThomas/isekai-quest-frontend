import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import MarketScreen from './MarketScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/lib/hooks/useProtectedRoute', () => ({
  __esModule: true,
  default: jest.fn(),
}));

/*
 * Story: Player visits the Town Market
 * In order to browse market categories,
 * a logged-in player wants to see the market navigation panel.
 *
 * Scenario: Market shows navigation panel
 *   Given I am logged in
 *   When I visit the Town Market
 *   Then I should see the title "Town Market"
 *   And I should see market category navigation options
 */
describe('MarketScreen', () => {
  it('renders the Town Market title', () => {
    renderWithStore(<MarketScreen />);
    expect(screen.getByText('Town Market')).toBeInTheDocument();
  });

  it('renders market navigation options', () => {
    renderWithStore(<MarketScreen />);
    expect(screen.getByRole('button', { name: /weapons/i })).toBeInTheDocument();
  });
});
