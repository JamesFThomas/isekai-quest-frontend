import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import InnScreen from './InnScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}));

jest.mock('@/lib/hooks/useProtectedRoute', () => ({
  __esModule: true,
  default: jest.fn(),
}));

/*
 * Story: Player visits the Inn
 * In order to know the Inn is coming soon,
 * a logged-in player wants to see a clear placeholder when they visit.
 *
 * Scenario: Inn shows coming-soon placeholder
 *   Given I am logged in
 *   When I navigate to the Inn
 *   Then I should see the heading "Inn Screen"
 *   And I should see "Coming Soon!" text
 *   And I should see a way to go back
 */
describe('InnScreen', () => {
  it('renders the Inn Screen heading', () => {
    renderWithStore(<InnScreen />);
    expect(screen.getByRole('heading', { name: /inn screen/i })).toBeInTheDocument();
  });

  it('renders the Coming Soon message', () => {
    renderWithStore(<InnScreen />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it('renders a back button', () => {
    renderWithStore(<InnScreen />);
    expect(screen.getByAltText('Back Icon')).toBeInTheDocument();
  });
});
