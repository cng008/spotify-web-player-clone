import React, { useState } from 'react';
import { useStateValue } from '../StateProvider';
import SpotifyApi from '../common/api';
import './NewPlaylistForm.css';

/** CREATE NEW PLAYLIST
 * with default values
 */
const NewPlaylistForm = ({ closeModal }) => {
  const [{ playlists, user }, dispatch] = useStateValue();
  const playlistsCount = Object.keys(playlists).length;
  const INITIAL_DATA = {
    name: '',
    description: '',
    user_id: 1,
    image:
      'https://assets.audiomack.com/jojo-1264/82a10a07eff76040ec325e3498c6d6c7.jpeg?type=song&width=280&height=280&max=true'
  };
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formErrors, setFormErrors] = useState([]);

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
    // sets default playlist name if name input is left empty
    if (formData.name === '')
      formData.name = `My Playlist #${playlistsCount + 1}`;
    try {
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      let result = await SpotifyApi.newPlaylist(formData);

      if (result.status !== 200 || 201) {
        // stay on current page, refresh playlists state to see new data
        closeModal();
        dispatch({
          type: 'SET_PLAYLISTS'
        });
      } else {
        setFormErrors(result.errors);
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <>
      <div className="NewPlaylistForm-background" onClick={closeModal}></div>
      <div className="NewPlaylistForm-child create-playlist-center">
        <form onSubmit={handleSubmit} className="NewPlaylistForm-child">
          <div className="NewPlaylistForm-form-center create-playlist-title">
            Create new playlist
          </div>
          <div className="create-playlist-grey">
            <div className="playlist-inputs">
              <div className="playlist-inputs-left">
                <div className="playlist-name">Playlist Name</div>
                <input
                  name="name"
                  className="playlist-input-name"
                  placeholder="New Playlist"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="playlist-inputs-right">
                <div className="playlist-name">Description</div>
                <textarea
                  name="description"
                  className="playlist-input-description"
                  placeholder="Say something about your new playlist"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>
            </div>
            <span className="NewPlaylistForm-formErrors">
              {formErrors ? <p>{formErrors}</p> : null}
            </span>
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
