import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import SpotifyCloneApi from '../../common/api';
import './NewPlaylistForm.css';

// NOT USED

/** Create new playist form (pop-up modal)
 *
 * - useParams: returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>
 * - useState: state variables in functional components
 * - useHistory: lets you access the history instance used by React Router, useful for redirecting users to another page
 * - useStateValue: access globally stored state
 * - useContext: common data that can be accessed throughout the component hierarchy without passing the props down manually to each level
 *
 * App -> Routes -> Sidebar -> NewPlaylistForm
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

  // console.debug(  'NewPlaylistForm', 'formData=',  formData, 'playlists=',playlists ,'playlistsCount=',playlistsCount);

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
    formData.name = formData.name || `My Playlist #${playlistsCount + 1}`;
    formData.image =
      formData.image ||
      `https://assets.audiomack.com/jojo-1264/82a10a07eff76040ec325e3498c6d6c7.jpeg?type=song&width=280&height=280&max=true`;

    try {
      /** Makes a POST request to Api.js and adds corresponding data to matching category in db.json */
      await SpotifyCloneApi.newPlaylist(formData);
      // for refreshing playlist name in sidebar
      const playlists = await SpotifyCloneApi.getPlaylists();
      dispatch({
        type: 'SET_PLAYLISTS',
        playlists: playlists
      });
      // Redirect to newly-made playlist
      // history.push(`/playlists/${result.handle}`);
      closeModal();
    } catch (err) {
      console.error(err);
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
