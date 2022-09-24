import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';
import { useStateValue } from '../StateProvider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const Searchbar = () => {
  const { token, searchFor } = useContext(UserContext);
  const [{}, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState('');

  /** Update form fields */
  const handleChange = evt => {
    setSearchText(evt.target.value);
  };

  /** Tell parent to filter */
  const handleSubmit = evt => {
    evt.preventDefault();
    // take care of accidentally trying to search for just spaces
    dispatch({
      type: 'SET_SEARCHTERM',
      searchTerm: searchText
    });
    searchFor(searchText.trim() || undefined);
    setSearchText(searchText.trim());

    // clear search results
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      searchResults: []
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          placeholder="Search for Songs, Artists, or Albums"
          value={searchText}
          onChange={handleChange}
          InputProps={{
            style: {
              border: 'none',
              alignItems: 'center',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '30px',
              minWidth: '80px',
              width: '25vw',
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
      </form>
    </div>
  );
};

export default Searchbar;
