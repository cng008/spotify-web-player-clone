import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import SpotifyCloneApi from '../../common/api';
import './EditPlaylistForm.css';

/** View Playlist and edit details with default values.
 *
 * - useHistory: lets you access the history instance used by React Router, useful for redirecting users to another page
 * - useStateValue: access globally stored state
 *
 * App -> Routes -> Home/Library/Sidebar -> Playlist -> EditPlaylistForm
 */

const EditPlaylistForm = ({ playlist, closeModal }) => {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();

  const INITIAL_STATE = {
    name: playlist.name,
    description: playlist.description,
    image: ''
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  //   console.debug('EditPlaylistForm',  'playlist=',  playlist, 'formData=', formData );

  /** Update form fields */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - close modal and show new changes
   */

  const handleSubmit = async evt => {
    evt.preventDefault();

    let playlistData = {
      name: formData.name,
      handle: formData.name.toLowerCase().split(' ').join('-').replace('#', ''),
      description: formData.description,
      image: formData.image ? formData.image : playlist.image
    };

    // sets default playlist name if name input is left empty
    try {
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      let result = await SpotifyCloneApi.savePlaylist(
        playlist.handle,
        playlistData
      );
      // for refreshing playlist name in sidebar
      SpotifyCloneApi.getPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        });
      });
      history.push(`/playlists/${result.handle}`); // redirect to newly-named playlist
      closeModal();
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <>
      <div className="EditPlaylistForm-background" onClick={closeModal}></div>
      <div className="EditPlaylistForm-child">
        <form onSubmit={handleSubmit} className="EditPlaylistForm-child">
          <div className="create-playlist-title">Edit {playlist.name}</div>
          <div className="create-playlist-grey">
            <div className="playlist-inputs">
              <div className="playlist-inputs-name">
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
                  required
                />
              </div>
              <div className="playlist-inputs-description">
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
          <div className="EditPlaylistForm-buttons">
            <div className="EditPlaylistForm-cancel" onClick={closeModal}>
              CANCEL
            </div>
            <button type="submit" className="EditPlaylistForm-create">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPlaylistForm;
