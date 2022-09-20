import React, { useState } from 'react';
import './PlaylistControls.css';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';

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
        <form sx={{ m: 1, minWidth: 80 }} className="Playlist-form">
          <select
            labelId="song-order"
            id="song-order"
            value={sort ? sort : 'custom'}
            label="Age"
            onChange={handleSort}
          >
            <option value="" className="sort-by" disabled>
              Sort by
            </option>
            <option value="custom">Custom order</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="dateAdded">Date added</option>
            <option value="duration">Duration</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default PlaylistControls;
