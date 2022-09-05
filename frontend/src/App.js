import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';

import Login from './Login';
import Routes from './Routes';

// Connect Spotify API to our React App
const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  // runs when app component loads and every time variable changes
  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    window.location.hash = ''; // clean url

    // set token to state
    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);

      // get user's account
      spotify.getMe().then(user => {
        console.log(user);
      });
    }

    console.log('TOKEN:', _token);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Spotify Clone</h1>
        <p>{token}</p>
        <Login />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
