import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
 * - useState: state variables in functional components
 * - useHistory: lets you access the history instance used by React Router, useful for redirecting users to another page
 * - useStateValue: access globally stored state
 *
 * App -> Routes -> Home/Library/Sidebar -> Playlist -> PlaylistControls
 */

const PlaylistControls = ({ playlist }) => {
  const history = useHistory();
  const [{ isPlaying }, dispatch] = useStateValue();
  const [sort, setSort] = useState('');
  const [liked, setLike] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClicked, seIsClicked] = useState(false);

  // console.debug('PlaylistControls', 'playlist=', playlist, 'handle=', handle ,'sort=',sort,'isPlaying=',isPlaying,'liked=',liked,'showModal=',showModal,'isClicked=',isClicked);

  const handleSort = evt => {
    setSort(evt.target.value);
  };

  const togglePause = () => {
    dispatch({
      type: 'SET_PLAYING',
      isPlaying: !isPlaying
    });
  };

  const toggleLike = () => {
    setLike(liked ? false : true);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    seIsClicked(isClicked ? false : true);
  };

  const deletePlaylist = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this playlist?'
    );
    if (confirm) {
      try {
        /** Makes a POST request to Api.js and deletes playlist from db */
        await SpotifyCloneApi.deletePlaylist(playlist.id);
      } catch (err) {
        console.error(err);
        return;
      } finally {
        // runs regardless of error
        // for refreshing playlist name in sidebar
        const playlists = await SpotifyCloneApi.getPlaylists();
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        });

        history.goBack(); // redirect to previous page
        console.log('Playlist successfully deleted.');
      }
    } else {
      // Do nothing
      console.log('Delete cancelled.');
    }
  };

  return (
    <div className="Playlist-controls">
      <div className="Playlist-icons">
        {isPlaying ? (
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
          <div onClick={handleClick}>
            <MoreHorizIcon fontSize="large" />
            {isClicked && (
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
