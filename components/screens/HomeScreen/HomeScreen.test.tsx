import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomeScreen from './HomeScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('HomeScreen', () => {
  it('Component renders', () => {
    render(<HomeScreen />);

    const title = screen.getByText('Controls');

    expect(title).toBeInTheDocument();
  });

  it('Contains LogoutButton', () => {
    render(<HomeScreen />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
});
