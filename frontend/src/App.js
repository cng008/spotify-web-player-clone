import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './UserContext';
import { getTokenFromUrl } from './common/auth';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyApi from './common/api';
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

  /** Handles milliseconds to minutes:seconds conversion.
   * https://stackoverflow.com/a/21294619
   */
  function getSongDuration(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  /** Calculates days since song was added to playlist.
   * https://stackoverflow.com/a/4929629
   */
  function daysAgo(dateAdded, currentDate) {
    const date1 = new Date(dateAdded);
    const date2 = currentDate;

    const oneDay = 1000 * 60 * 60 * 24; // One day in milliseconds
    const diffInTime = date2.getTime() - date1.getTime(); // Calculating the time difference between two dates
    const diffInDays = Math.round(diffInTime / oneDay); // Calculating the no. of days between two dates

    return diffInDays;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ getSongDuration, daysAgo }}>
          <Routes />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
