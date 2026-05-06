import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import LogoutButton from './LogoutButton';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('@/lib/persistence/localPersistence', () => ({
  clearSessionRefreshData: jest.fn(),
}));

describe('LogoutButton', () => {
  it('renders the logout icon button', () => {
    renderWithStore(<LogoutButton />);
    expect(screen.getByAltText('Logout Icon')).toBeInTheDocument();
  });

  // add test for logout functionality
});
