import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SplashScreen from './SplashScreen';

// userEvent simulates real browser interactions (pointer events, focus, etc.)
// preferred over fireEvent per RTL docs: https://testing-library.com/docs/user-event/intro
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock('@/lib/reduxHooks', () => ({
  useAppDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('@/components/ui/LoginModal/LoginModal', () => ({
  __esModule: true,
  default: () => null,
}));

describe('SplashScreen', () => {
  it('Component renders', () => {
    render(<SplashScreen />);

    const title = screen.getByText('Isekai Quest');

    expect(title).toBeInTheDocument();
  });

  describe('Start Quest loading spinner', () => {
    it('shows a loading spinner when Start Quest is clicked', async () => {
      const user = userEvent.setup();
      render(<SplashScreen />);

      await user.click(screen.getByRole('button', { name: /start quest/i }));

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('does not show a loading spinner before Start Quest is clicked', () => {
      render(<SplashScreen />);

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });
});
