import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/lib/test-utils';
import CreateCharacterScreen from './CreateCharacterScreen';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('CreateCharacterScreen', () => {
  it('Component renders', () => {
    renderWithStore(<CreateCharacterScreen />);

    const title = screen.getByText('Choose Your Avatar');

    expect(title).toBeInTheDocument();
  });

  // Expand tests to cover more functionality
  /* Add tests for Avatar image be id number */
});
