import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getTokenFromUrl } from './common/auth';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyApi from './common/api';
import { useStateValue } from './StateProvider';
import Routes from './Routes';

// Connect Spotify API to our React App
const spotify = new SpotifyWebApi();

function App() {
  // pull from useContext
  const [{ token }, dispatch] = useStateValue();
  console.debug('App', 'token', token);

  // runs when app component loads and every time variable changes
  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    window.location.hash = ''; // clean url

    // set token to state
    if (_token) {
      // add to useContext layer
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      });

      spotify.setAccessToken(_token);

      // get user's account
      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        });
      });

      /** GET PLAYLISTS *************************
      //  * returns a promise
      //  */
      // SpotifyApi.getPlaylists().then(playlists => {
      //   dispatch({
      //     type: 'SET_PLAYLISTS',
      //     playlists: playlists
      //   });
      // });

      spotify.getPlaylist('37i9dQZEVXcUfolfIkR1hC').then(response => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response
        });
      });
    }
  }, [dispatch]);

  /** FOR PRODUCTION ***********************************
   * delete before deploying*/
  useEffect(() => {
    /** GET PLAYLISTS *************************
     * returns a promise
     */
    SpotifyApi.getPlaylists().then(playlists => {
      dispatch({
        type: 'SET_PLAYLISTS',
        playlists: playlists
      });
    });

    /** GET ARTISTS *************************
     * returns a promise
     */
    SpotifyApi.getArtists().then(artists => {
      dispatch({
        type: 'SET_ARTISTS',
        artists: artists
      });
    });

    /** GET ALBUMS *************************
     * returns a promise
     */
    SpotifyApi.getAlbums().then(albums => {
      dispatch({
        type: 'SET_ALBUMS',
        albums: albums
      });
    });
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
