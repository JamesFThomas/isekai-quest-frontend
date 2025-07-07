import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RegistrationModal from './RegistrationModal';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// TODO: mock player data object and pass to RegistrationModal in later tests

describe('RegistrationModal', () => {
  it('Component renders with title text', () => {
    render(<RegistrationModal isOpen={true} closeModal={() => {}} />);

    const title = screen.getByText('Your Player Data!');

    expect(title).toBeInTheDocument();
  });

  // Add test for registration button functionality
});
