import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useStateValue } from './StateProvider';
import Login from './Login';
import Routes from './Routes';

// Connect Spotify API to our React App
const spotify = new SpotifyWebApi();

function App() {
  // pull from useContext
  const [{ user, token }, dispatch] = useStateValue();

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
    }
  }, []);

  console.log('user:', user);
  console.log('token:', token);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Display different pages depending on if a user is logged in */}
        {token ? <Player spotify={spotify} /> : <Login />}
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
