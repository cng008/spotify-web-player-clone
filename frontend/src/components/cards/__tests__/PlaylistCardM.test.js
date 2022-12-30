import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PlaylistCardM from '../PlaylistCardM';

describe('PlaylistCardM Component Tests', () => {
  const data = {
    handle: 'my-playlist',
    image: 'https://example.com/playlist.jpg',
    name: 'My Playlist',
    description: 'A playlist of my favorite songs'
  };

  //smoke test
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <PlaylistCardM data={data} />
      </MemoryRouter>
    );
  });

  // snapshot test
  it('matches snapshot', () => {
    /** asFragment returns the underlying DOM structure of the component */
    const { asFragment } = render(
      <MemoryRouter>
        <PlaylistCardM data={data} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with the correct data', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <PlaylistCardM data={data} />
      </MemoryRouter>
    );

    // Check that the component has rendered with the correct data
    const img = getByAltText('My Playlist playlist cover');
    // expect(img.src).toBe('https://example.com/playlist.jpg');
    expect(img).toHaveAttribute('src', 'https://example.com/playlist.jpg');
    expect(getByText('My Playlist')).toBeInTheDocument();
    expect(getByText('A playlist of my favorite songs')).toBeInTheDocument();
  });

  it('renders a link to the playlist page', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <PlaylistCardM data={data} />
      </MemoryRouter>
    );

    // Check that the link points to the correct playlist page
    const link = getByTestId('playlist-link').href;
    expect(link).toContain('/playlists/my-playlist');
  });
});
