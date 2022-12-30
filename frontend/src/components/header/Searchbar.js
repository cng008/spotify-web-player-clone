import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext';
import { useStateValue } from '../../StateProvider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

/** Form for sending requests to Spotify API
 *
 * returns songs relevant to search term
 *
 * - useState: state variables in functional components
 * - useStateValue: access globally stored state
 * - useContext: common data that can be accessed throughout the component hierarchy without passing the props down manually to each level
 *
 * App -> Routes -> Home/Library/Sidebar -> Playlist
 */

const Searchbar = () => {
  const [{ token }, dispatch] = useStateValue();
  const { searchFor } = useContext(UserContext);
  const [searchText, setSearchText] = useState('');

  // console.debug('Searchbar','searchFor=', searchFor, 'searchText=', searchText);

  /** Update form fields */
  const handleChange = evt => {
    setSearchText(evt.target.value);
  };

  /** Tell parent to filter */
  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch({
      type: 'SET_SEARCHTERM',
      searchTerm: searchText
    });

    // take care of accidentally trying to search for just spaces
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
      <form
        onSubmit={
          token
            ? handleSubmit
            : e => {
                e.preventDefault();
                alert('You must be logged in to do that');
              }
        }
      >
        <TextField
          type="text"
          placeholder={
            token
              ? 'Search for Songs, Artists, or Albums'
              : 'You must login in order to search for songs'
          }
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
