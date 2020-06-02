import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders', () => {
  const { getByText } = render(<App />);
  const bodyText = getByText(/Activity reports/i);
  expect(bodyText).toBeInTheDocument();
});
