import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { loginUrl, getAccessToken } from '../common/auth';
import './Login.css';

/** NOT USED */

const Login = () => {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();

  const noLogin = () => {
    getAccessToken().then(res => {
      sessionStorage.setItem('spotify_access_token', res.access_token);
      sessionStorage.setItem('spotify_expires_in', res.expires_in);
      sessionStorage.setItem('spotify_token_type', res.token_type);
      dispatch({
        type: 'SET_TOKEN',
        token: res.access_token
      });
    });
    history.push('/');
  };

  return (
    <div className="Login">
      {/* Spotify Logo */}
      <div className="Spotify-logo">
        <img
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
      </div>
      {/* Login with spotify button or proceed with demo*/}
      <div className="Login-options">
        {/* <a href={loginUrl}>Login with Spotify</a> */}
        <button
          onClick={noLogin}
          title="*you won't be able to add songs to playlists"
        >
          Login
        </button>
        {/* <a href={'/'} title="*you won't be able to add songs to playlists">
          Browse without logging in
        </a> */}
      </div>
    </div>
  );
};

export default Login;
