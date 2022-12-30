import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../Login';

jest.mock('../../StateProvider', () => ({
  useStateValue: () => [{}, jest.fn()]
}));

describe('Login Component Tests', () => {
  // smoke test
  it('renders without crashing', () => {
    render(<Login />);
  });

  // snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });
});
