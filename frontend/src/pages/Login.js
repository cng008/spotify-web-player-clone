import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { getAccessToken } from '../common/auth';
import './Login.css';

/** NOT USED */

const Login = () => {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();

  const onLogin = async () => {
    try {
      const res = await getAccessToken();
      sessionStorage.setItem('spotify_access_token', res.access_token);
      sessionStorage.setItem('spotify_expires_in', res.expires_in);
      sessionStorage.setItem('spotify_token_type', res.token_type);
      dispatch({ type: 'SET_TOKEN', token: res.access_token });
    } catch (error) {
      console.error(error);
    } finally {
      history.push('/');
    }
  };

  return (
    <div className="Login">
      {/* Spotify Logo */}
      <div className="Spotify-logo">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt=""
        />
      </div>
      {/* Login with spotify button or proceed with demo*/}
      <div className="Login-options">
        {/* <a href={loginUrl}>Login with Spotify</a> */}
        <button onClick={onLogin} title="*uses a generic account">
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
