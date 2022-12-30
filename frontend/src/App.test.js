import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./StateProvider', () => ({
  useStateValue: () => [{}, jest.fn()]
}));

describe('App Component Tests', () => {
  // smoke test
  it('renders without crashing', function () {
    render(<App />);
  });
});
