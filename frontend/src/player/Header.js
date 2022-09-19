import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Searchbar from './Searchbar';
import LibraryNav from './LibraryNav';
import './Header.css';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Avatar } from '@material-ui/core';

const Header = () => {
  const [{ user }] = useStateValue();
  const location = useLocation();
  const history = useHistory();

  // console.debug('Header', 'user=', user, 'location', location, 'history', history);

  const goBack = () => {
    history.goBack();
  };

  const goForward = () => {
    history.goForward();
  };

  return (
    <div className="Header">
      <div className="Header-left">
        {/* Back/Fwd Navigation */}
        <button onClick={goBack}>
          <ArrowForwardIosIcon className="back-btn" />
        </button>
        <button
          onClick={goForward}
          // style={
          //   history.action
          //     ? { opacity: 1 }
          //     : { opacity: 0.5, cursor: 'not-allowed' }
          // }
        >
          <ArrowForwardIosIcon className="forward-btn" />
        </button>
        {/* ONLY SHOW SEARCH BAR ON SEARCH ROUTE */}
        {location.pathname === '/search' ? <Searchbar /> : null}
        {location.pathname.startsWith('/library') ? <LibraryNav /> : null}
      </div>
      <div className="Header-right">
        <Avatar src={user?.images[0].url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
