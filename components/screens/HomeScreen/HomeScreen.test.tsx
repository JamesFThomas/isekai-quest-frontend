import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import HomeScreen from './HomeScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/lib/hooks/useProtectedRoute', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('HomeScreen', () => {
  it('Component renders', () => {
    renderWithStore(<HomeScreen />);
    expect(screen.getByText('StartsVille')).toBeInTheDocument();
  });

  it('Contains LogoutButton', () => {
    renderWithStore(<HomeScreen />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
});
