import React from 'react';
import './Header.css';
import { useStateValue } from '../StateProvider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="Header">
      <div className="Header-left">
        <TextField
          placeholder="Search for Artists, Songs, or Albums"
          type="text"
          InputProps={{
            style: {
              border: 'none',
              alignItems: 'center',
              backgroundColor: 'white',
              color: 'grey',
              borderRadius: '30px',
              minWidth: '80px',
              width: '200%',
              padding: '10px'
            },
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </div>
      <div className="Header-right">
        <Avatar src={user?.images[0].url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
