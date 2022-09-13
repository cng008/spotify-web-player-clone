import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpotifyApi from '../common/api';
import Sidebar from '../player/Sidebar';
import Footer from '../player/Footer';
import './Playlist.css';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Song from '../player/Song';

const Playlist = () => {
  const { handle } = useParams();
  console.debug('PlaylistDetails', 'handle=', handle);

  const [playlist, setPlaylist] = useState('');
  const [sort, setSort] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // GET PLAYLIST FROM PARAK
  useEffect(() => {
    async function getPlaylistDetails() {
      let result = await SpotifyApi.getPlaylist(handle);
      setPlaylist(result);
      setIsLoading(false);
    }
    getPlaylistDetails();
  }, [handle]);
  console.log('current playlist data', playlist);

  function msToMinutesAndSeconds(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const handleChange = evt => {
    setSort(evt.target.value);
  };

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className="Playlist">
      <div className="Playlist-body">
        <Sidebar />
        <div className="Body">
          <div className="Body-info">
            <img src={playlist?.image} alt="" />
            {/* <img src="https://i.scdn.co/image/6682aad217c1" alt="" /> */}
            <div className="Body-infoText">
              <strong>PLAYLIST</strong>
              <h2>{playlist?.name}</h2>
              <p>{playlist?.description}</p>
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

            {/* List of songs */}
            <div className="Body-songList">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>ALBUM</th>
                    <th>DATE ADDED</th>
                    <th>
                      <AccessTimeIcon />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {playlist?.songs.map((track, id) => (
                    <tr>
                      <Song track={track} id={id} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Playlist;
