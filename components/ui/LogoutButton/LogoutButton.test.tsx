import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LogoutButton from './LogoutButton';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LogoutButton', () => {
  it('Component renders a button with correct text', () => {
    render(<LogoutButton />);

    const button = screen.getByRole('button', { name: /logout/i });
    const buttonText = screen.getByText('Logout');
    expect(button).toBeInTheDocument();
    expect(buttonText).toBeInTheDocument();
  });

  // add test for logout functionality
});
