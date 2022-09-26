import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import SpotifyCloneApi from '../../common/api';
import EditPlaylistForm from './EditPlaylistForm';
import './PlaylistControls.css';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';

/** Component for playlist play/pause, like, edit buttons
 *
 * - useParams: returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>
 * - useState: state variables in functional components
 * - useHistory: lets you access the history instance used by React Router, useful for redirecting users to another page
 * - useStateValue: access globally stored state
 *
 * App -> Routes -> Home/Library/Sidebar -> Playlist -> PlaylistControls
 */

const PlaylistControls = ({ playlist }) => {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
  const [sort, setSort] = useState('');
  const [paused, setPaused] = useState(false);
  const [liked, setLike] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // console.debug('PlaylistControls', 'playlist=', playlist, 'handle=', handle ,'sort=',sort,'paused=',paused,'liked=',liked,'showModal=',showModal,'isHovering=',isHovering);

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

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleMouseOver = () => {
    let toggle = isHovering === true ? false : true;
    setIsHovering(toggle);
  };

  const deletePlaylist = async () => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      try {
        /** Makes a POST request to Api.js and deletes playlist from db */
        await SpotifyCloneApi.deletePlaylist(playlist.id);

        // for refreshing playlist name in sidebar
        SpotifyCloneApi.getPlaylists().then(playlists => {
          dispatch({
            type: 'SET_PLAYLISTS',
            playlists: playlists
          });
        });

        history.goBack(); // redirect to previous page
      } catch (err) {
        console.log(err);
        return;
      }
      console.log('Playlist successfully deleted.');
    } else {
      // Do nothing
      console.log('Delete cancelled.');
    }
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

        <div className="Playlist-edit-toggle">
          <div onClick={handleMouseOver}>
            <MoreHorizIcon fontSize="large" />
            {isHovering && (
              <div className="Playlist-edit-buttons">
                <button title="Edit playlist" onClick={openModal}>
                  Edit
                </button>
                <button title="Delete playlist" onClick={deletePlaylist}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="Playlist-filter">
        <SearchIcon />
        <form sx={{ m: 1, minWidth: 80 }} className="Playlist-form">
          <select
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
      {showModal ? (
        <div>
          <EditPlaylistForm playlist={playlist} closeModal={closeModal} />
        </div>
      ) : null}
    </div>
  );
};

export default PlaylistControls;
