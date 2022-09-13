import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getTokenFromUrl } from './common/auth';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyApi from './common/api';
import { useStateValue } from './StateProvider';
import Login from './Login';
import Routes from './Routes';

// Connect Spotify API to our React App
const spotify = new SpotifyWebApi();

function App() {
  // pull from useContext
  const [{ token }, dispatch] = useStateValue();

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

      // /** get playlists
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

  /** FOR PRODUCTION
   * delete before deploying*/
  useEffect(() => {
    /** get playlists
     * returns a promise
     */
    SpotifyApi.getPlaylists().then(playlists => {
      dispatch({
        type: 'SET_PLAYLISTS',
        playlists: playlists
      });
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Display different pages depending on if a user is logged in */}
        {token ? null : <Login />}
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
