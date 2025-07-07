import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CreateCharacterScreen from './CreateCharacterScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateCharacterScreen', () => {
  it('Component renders', () => {
    render(<CreateCharacterScreen />);

    const title = screen.getByText('Choose Your Avatar');

    expect(title).toBeInTheDocument();
  });

  // Expand tests to cover more functionality
  /* Add tests for Avatar image be id number */
});
