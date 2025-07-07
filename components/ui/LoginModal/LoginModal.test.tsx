import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LoginModal from './LoginModal';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginModal', () => {
  it('Component renders with title text', () => {
    render(<LoginModal isOpen={true} closeModal={() => {}} />);

    const title = screen.getByText('Continue your quest!');

    expect(title).toBeInTheDocument();
  });

  // Add test for input validation
});
