import React from 'react';
import './Header.css';
import { useStateValue } from '../StateProvider';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="Header">
      <div className="Header-left">
        <SearchIcon />
        <input placeholder="Search for Artists, Songs, or Albums" type="text" />
      </div>
      <div className="Header-right">
        <Avatar src={user?.images[0].url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
