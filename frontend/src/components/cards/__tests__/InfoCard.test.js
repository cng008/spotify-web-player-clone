import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import InfoCard from '../InfoCard';

describe('InfoCard Component Tests', () => {
  const data = {
    name: 'John Doe',
    description: 'Artist',
    image: 'https://example.com/john-doe.jpg'
  };

  // smoke test
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <InfoCard data={data} />
      </MemoryRouter>
    );
  });

  // snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <InfoCard data={data} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with the correct data', () => {
    const { getByAltText, getByText } = render(<InfoCard data={data} />); // Check that the component has rendered with the correct data
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Artist')).toBeInTheDocument();
    expect(getByAltText('John Doe')).toHaveAttribute(
      'src',
      'https://example.com/john-doe.jpg'
    );
  });

  it('renders the component with the default values when no data is provided', () => {
    const { getByRole, getByText } = render(<InfoCard />); // Check that the component has rendered with the correct data
    // Check that the component has rendered with the default values
    expect(getByText('Artist')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('alt', '');
  });
});
