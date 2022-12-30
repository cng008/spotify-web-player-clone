import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import SearchPageCard from '../SearchPageCard';

describe('SearchPageCard Component Tests', () => {
  const cardData = {
    title: 'My Card',
    bgcolor: '#ffffff',
    imgurl: '/path/to/image.jpg'
  };

  // smoke test
  it('renders without crashing', () => {
    render(<SearchPageCard cardData={cardData} />);
  });

  // snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(<SearchPageCard cardData={cardData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with the correct data', () => {
    const { getByText, getByAltText, getByTestId } = render(
      <MemoryRouter>
        <SearchPageCard cardData={cardData} />
      </MemoryRouter>
    );

    // Check that the component has rendered with the correct data
    expect(getByText('My Card')).toBeInTheDocument();
    expect(getByAltText('My Card cover')).toHaveAttribute(
      'src',
      '/path/to/image.jpg'
    );
    expect(getByTestId('card-box')).toHaveStyle({
      backgroundColor: '#ffffff'
    });
  });
});
