import React, { useState } from 'react';
import './PlaylistControls.css';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const PlaylistControls = () => {
  const [sort, setSort] = useState('');
  const [paused, setPaused] = useState(false);
  const [liked, setLike] = useState(false);

  const handleSort = evt => {
    setSort(evt.target.value);
  };

  const togglePause = () => {
    let toggle = paused === true ? false : true;
    setPaused(toggle);
  };

  const toggleLike = () => {
    let toggle = liked === true ? false : true;
    setLike(toggle);
  };

  return (
    <div className="Playlist-controls">
      <div className="Playlist-icons">
        {paused ? (
          <PauseCircleFilledIcon
            className="Playlist-shuffle"
            onClick={togglePause}
          />
        ) : (
          <PlayCircleFilledIcon
            className="Playlist-shuffle"
            onClick={togglePause}
          />
        )}
        {liked ? (
          <FavoriteIcon
            fontSize="large"
            onClick={toggleLike}
            className="Playlist-heart-filled"
          />
        ) : (
          <FavoriteBorderIcon
            fontSize="large"
            onClick={toggleLike}
            className="Playlist-heart-outline"
          />
        )}

        <MoreHorizIcon fontSize="large" />
      </div>

      <div className="Playlist-filter">
        <SearchIcon />
        <FormControl sx={{ m: 1, minWidth: 80 }} className="Playlist-form">
          <InputLabel id="song-order"></InputLabel>
          <Select
            labelId="song-order"
            id="song-order"
            value={sort ? sort : 'custom'}
            label="Age"
            onChange={handleSort}
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
  );
};

export default PlaylistControls;
