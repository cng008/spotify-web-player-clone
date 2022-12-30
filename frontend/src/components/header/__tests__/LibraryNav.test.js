import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import LibraryNav from '../LibraryNav';

describe('LibraryNav Component Tests', () => {
  // smoke test
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <LibraryNav />
      </MemoryRouter>
    );
  });

  // snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LibraryNav />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
