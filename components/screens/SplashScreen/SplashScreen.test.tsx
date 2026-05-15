import { render, screen, act } from '@testing-library/react';
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
  beforeAll(() => {
    Element.prototype.getAnimations = () => [];
  });

  it('Component renders', async () => {
    await act(async () => {
      render(<SplashScreen />);
    });
    expect(screen.getByRole('img', { name: /isekai quest logo/i })).toBeInTheDocument();
  });

  describe('Start Quest loading spinner', () => {
    it('shows a loading spinner when Start Quest is clicked', async () => {
      const user = userEvent.setup();
      await act(async () => {
        render(<SplashScreen />);
      });

      await user.click(screen.getByRole('button', { name: /start quest/i }));

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('does not show a loading spinner before Start Quest is clicked', async () => {
      await act(async () => {
        render(<SplashScreen />);
      });

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });
});
