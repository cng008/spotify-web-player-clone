import React from 'react';
import './Body.css';
import Header from './Header';
import { useStateValue } from '../StateProvider';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Song from './Song';

const Body = ({ spotify }) => {
  const [{ discover_weekly }, dispatch] = useStateValue();
  const [sort, setSort] = React.useState('');

  const handleChange = evt => {
    setSort(evt.target.value);
  };
  console.log(discover_weekly);
  return (
    <div className="Body">
      <Header spotify={spotify} />

      <div className="Body-info">
        <img src={discover_weekly?.images[0].url} alt="" />
        {/* <img src="https://i.scdn.co/image/6682aad217c1" alt="" /> */}
        <div className="Body-infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <section>
        <div className="Body-controls">
          <div className="Body-icons">
            <PlayCircleFilledIcon className="Body-shuffle" />
            <FavoriteBorderIcon fontSize="large" />
            <MoreHorizIcon fontSize="large" />
          </div>

          <div className="Body-filter">
            <SearchIcon />
            <FormControl sx={{ m: 1, minWidth: 80 }} className="Body-form">
              <InputLabel id="song-order"></InputLabel>
              <Select
                labelId="song-order"
                id="song-order"
                value={sort ? sort : 'custom'}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="" disabled>
                  <small>Sort By</small>
                </MenuItem>
                <MenuItem value="custom">Custom Order</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="album">Album</MenuItem>
                <MenuItem value="dateAdded">Date added</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="Body-songList">
          {/* List of songs */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>ALBUM</th>
                <th>DATE ADDED</th>
                <AccessTimeIcon />
              </tr>
            </thead>
            <tbody>
              {discover_weekly?.tracks.items.map((item, id) => (
                <tr>
                  <Song track={item.track} id={id} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Body;
