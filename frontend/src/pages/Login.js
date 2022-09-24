import React from 'react';
import { loginUrl } from '../common/auth';
import './Login.css';

const Login = () => {
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
        <a href={loginUrl}>Login with Spotify</a>
        <a href={'/'} title="*you won't be able to add songs to playlists">
          Browse without logging in
        </a>
      </div>
    </div>
  );
};

export default Login;
