import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SplashScreen from './SplashScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SplashScreen', () => {
  it('Component renders', () => {
    render(<SplashScreen />);

    const title = screen.getByText('Isekai Quest');

    expect(title).toBeInTheDocument();
  });
});
