import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { BrowserRouter } from 'react-router-dom';
import useSessionStorage from './common/useSessionStorage';
import UserContext from './UserContext';
import { getParamsFromUrl } from './common/auth';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyCloneApi from './common/api';
import Routes from './Routes';

/** Connect Spotify API to our React App.
 *
 * - useSessionStorage: locally stores parameters that are received from Spotify API login
 *
 * App -> Routes
 */

const spotify = new SpotifyWebApi();

function App() {
  const [
    {
      // user,
      token
      // searchTerm,
      // searchResults,
      // isPlaying,
      // playerTime,
      // volume,
      // playlists,
      // artists,
      // albums,
      // trackData,
      // discover_weekly
    },
    dispatch
  ] = useStateValue();
  const [timestamp, setTimestamp] = useSessionStorage('spotify_timestamp');
  const [infoLoaded, setInfoLoaded] = useState(false);

  // console.debug('App','user',user,'token',token,'searchTerm',searchTerm,'searchResults',searchResults,'isPlaying',isPlaying,'playerTime',playerTime,'volume', volume, 'playlists', playlists, 'artists', artists, 'albums', albums, 'trackData', trackData, 'discover_weekly', discover_weekly);

  /** Runs when app component loads and every time variable changes */
  useEffect(() => {
    async function fetchData() {
      try {
        /** INFORMATION RECEIVED FROM SPOTIFY AUTH *******************
         */

        if (token) {
          /** adds/updates values if not in storage
           * prevents reset on refresh
           */
          if (!timestamp) setTimestamp(Date.now());

          /** SET TOKEN TO GLOBAL STATE */
          dispatch({
            type: 'SET_TOKEN',
            token: token
          });
          spotify.setAccessToken(token); // set token for Spotify API access

          /** GET CHRISTIEN'S DISCOVER PLAYLIST **************************/
          spotify.getPlaylist('37i9dQZEVXcUfolfIkR1hC').then(response => {
            dispatch({
              type: 'SET_DISCOVER_WEEKLY',
              discover_weekly: response
            });
          });
        }

        /** GET PLAYLISTS FROM POSTGRES DB **************************/
        SpotifyCloneApi.getPlaylists().then(playlists => {
          dispatch({
            type: 'SET_PLAYLISTS',
            playlists: playlists
          });
        });

        /** GET ARTISTS FROM POSTGRES DB **************************/
        SpotifyCloneApi.getArtists().then(artists => {
          dispatch({
            type: 'SET_ARTISTS',
            artists: artists
          });
        });

        /** GET ALBUMS FROM POSTGRES DB **************************/
        SpotifyCloneApi.getAlbums().then(albums => {
          dispatch({
            type: 'SET_ALBUMS',
            albums: albums
          });
        });
      } catch (err) {
        console.log(err);
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    fetchData();
  }, [token, infoLoaded, dispatch]);

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

  /** Triggered by search form submit
   * renders results on pages > Search.js
   */
  async function searchFor(searchTern) {
    try {
      // get search results
      spotify.searchTracks(searchTern).then(results => {
        dispatch({
          type: 'SET_SEARCH_RESULTS',
          searchResults: results
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Clear out all sessionStorage items we've set and reload the page
   * @returns {void}
   */
  const logout = () => {
    try {
      dispatch({
        type: 'SET_TOKEN',
        token: null
      });
      dispatch({
        type: 'SET_USER',
        user: null
      });
      sessionStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };

  if (!infoLoaded) {
    return 'Loading...';
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{ getSongDuration, daysAgo, searchFor, logout }}
        >
          <Routes />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
