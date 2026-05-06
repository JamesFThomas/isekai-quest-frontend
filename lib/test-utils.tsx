import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';
import type { RootState } from '@/lib/store';

export function renderWithStore(ui: React.ReactElement, preloadedState?: Partial<RootState>) {
  const store = makeStore(preloadedState);
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
}
