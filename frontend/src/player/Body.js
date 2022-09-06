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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
              value={sort ? sort : 'Custom Order'}
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
        <TableContainer>
          <Table sx={{ maxWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>ALBUM</TableCell>
                <TableCell>DATA ADDED</TableCell>
                <AccessTimeIcon />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {discover_weekly?.tracks.items.map(item => (
                  <Song track={item.track} />
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Body;
