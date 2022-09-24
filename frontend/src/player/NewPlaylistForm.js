import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import SpotifyApi from '../common/api';
import './NewPlaylistForm.css';

/** CREATE NEW PLAYLIST
 * with default values
 */
const NewPlaylistForm = ({ closeModal }) => {
  const history = useHistory();
  const [{ playlists }, dispatch] = useStateValue();
  const playlistsCount = playlists[0].id;
  const INITIAL_DATA = {
    name: '',
    description: '',
    user_id: 1,
    image: ''
  };
  const [formData, setFormData] = useState(INITIAL_DATA);

  // console.debug(
  //   'NewPlaylistForm',
  //   'formData=',
  //   formData,
  //   'formErrors=',
  //   formErrors
  // );

  /** Update form fields */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();

    /** Sets default playlist name and image if inputs are left empty */
    if (formData.name === '')
      formData.name = `My Playlist #${playlistsCount + 1}`;
    if (formData.image === '')
      formData.image = `https://assets.audiomack.com/jojo-1264/82a10a07eff76040ec325e3498c6d6c7.jpeg?type=song&width=280&height=280&max=true`;

    try {
      /** Makes a POST request to Api.js and adds corresponding data to matching category in db.json */
      await SpotifyApi.newPlaylist(formData);
      // for refreshing playlist name in sidebar
      SpotifyApi.getPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        });
      });
      // history.push(`/playlists/${result.handle}`); // redirect to newly-made playlist
      closeModal();
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <>
      <div className="NewPlaylistForm-background" onClick={closeModal}></div>
      <div className="NewPlaylistForm-child">
        <form onSubmit={handleSubmit} className="NewPlaylistForm-child">
          <div className="create-playlist-title">Create New Playlist</div>
          <div className="create-playlist-grey">
            <div className="playlist-inputs">
              <div className="playlist-inputs-left">
                <div className="input-name">Playlist name</div>
                <input
                  name="name"
                  className="playlist-input-name"
                  placeholder="Give it a name (or not)"
                  onChange={handleChange}
                  value={formData.name}
                  maxLength="100"
                  autoComplete="off"
                  autoFocus="autofocus"
                />
              </div>
              <div className="playlist-inputs-right">
                <div className="input-name">Description</div>
                <textarea
                  name="description"
                  className="playlist-input-description"
                  placeholder="Say something about your new playlist"
                  onChange={handleChange}
                  value={formData.description}
                  maxLength="200"
                  autoComplete="off"
                />
              </div>
              <div className="playlist-inputs-image">
                <div className="input-name">Playlist image</div>
                <input
                  name="image"
                  type="url"
                  className="playlist-input-image"
                  placeholder="Insert an image uri"
                  onChange={handleChange}
                  value={formData.image}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="NewPlaylistForm-buttons">
            <div className="NewPlaylistForm-cancel" onClick={closeModal}>
              CANCEL
            </div>
            <button type="submit" className="NewPlaylistForm-create">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPlaylistForm;
