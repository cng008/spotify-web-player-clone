import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const Searchbar = () => {
  return (
    <div>
      <TextField
        placeholder="Search for Artists, Songs, or Albums"
        type="text"
        InputProps={{
          style: {
            border: 'none',
            alignItems: 'center',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '30px',
            minWidth: '80px',
            width: '200%',
            height: '2.5em',
            padding: '10px',
            margin: '5px 10px'
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
  );
};

export default Searchbar;
