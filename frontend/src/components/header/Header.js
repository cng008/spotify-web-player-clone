import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import UserContext from '../../UserContext';
import { loginUrl } from '../../common/auth';
import Searchbar from './Searchbar';
import LibraryNav from './LibraryNav';
import './Header.css';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Avatar } from '@material-ui/core';

/** Is rendered on every page (except login)
 *
 * - useState: state variables in functional components
 * - useHistory: lets you access the history instance used by React Router, useful for redirecting users to another page
 * - useStateValue: access globally stored state
 * - useContext: common data that can be accessed throughout the component hierarchy without passing the props down manually to each level
 * - useLocation: returns the current URL and is immutable
 *
 *  */

const Header = () => {
  const [{ token, user }] = useStateValue();
  const { logout } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  const [isHovering, setIsHovering] = useState(false);

  // console.debug('Header', 'user=', user, 'location=', location, 'history=', history);

  const goBack = () => {
    history.goBack();
  };

  const goForward = () => {
    history.goForward();
  };

  const handleMouseOver = () => {
    let toggle = isHovering === true ? false : true;
    setIsHovering(toggle);
  };

  return (
    <div className="Header">
      <div className="Header-left">
        {/* Back/Fwd Navigation */}
        <button onClick={goBack}>
          <ArrowForwardIosIcon className="back-btn" />
        </button>
        <button onClick={goForward}>
          <ArrowForwardIosIcon className="forward-btn" />
        </button>
        {/* ONLY SHOW SEARCH BAR ON SEARCH ROUTE */}
        {location.pathname === '/search' ? <Searchbar /> : null}
        {location.pathname.startsWith('/library') ? <LibraryNav /> : null}
      </div>
      <div className="Header-right">
        {!token ? (
          <a
            href={loginUrl}
            title="Login with your spotify to search for songs and them to playlists!"
          >
            Login with Spotify
          </a>
        ) : (
          <div
            className="Header-avatar"
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOver}
          >
            <Avatar src={user?.images[0].url} alt={user?.display_name} />
            {isHovering && (
              <div className="Header-logout">
                <button title="Add to this playlist" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
            <h4>{user ? user.display_name : 'testuser'}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
