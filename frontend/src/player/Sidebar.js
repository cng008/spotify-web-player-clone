import React, { useState } from 'react';
import { useStateValue } from '../StateProvider';
import { NavLink } from 'react-router-dom';
import SidebarOption from './SidebarOption';
// import NewPlaylistForm from './NewPlaylistForm'; // for pop-out modal (not used)
import SpotifyApi from '../common/api';
import './Sidebar.css';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Sidebar = () => {
  const [{ playlists }, dispatch] = useStateValue();
  const playlistsCount = Object.keys(playlists).length;
  // const [showModal, setShowModal] = useState(false);
  /** Sets default playlist name and image if inputs are left empty */
  const INITIAL_DATA = {
    name: `My Playlist #${playlistsCount + 1}`,
    description: '',
    user_id: 1,
    image:
      'https://assets.audiomack.com/jojo-1264/82a10a07eff76040ec325e3498c6d6c7.jpeg?type=song&width=280&height=280&max=true'
  };

  // const openModal = () => {
  //   setShowModal(true);
  // };
  // const closeModal = () => {
  // setShowModal(false);
  // };

  // console.debug('Sidebar', 'playlists=', playlists);

  const createNewPlaylist = async evt => {
    evt.preventDefault();

    try {
      /** Makes a POST request to Api.js and adds corresponding data to matching category in db.json */
      await SpotifyApi.newPlaylist(INITIAL_DATA);
      // for refreshing playlist name in sidebar
      SpotifyApi.getPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        });
      });
      // history.push(`/playlists/${result.handle}`); // redirect to newly-made playlist
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div className="Sidebar">
      <div className="Sidebar-nav">
        <img
          className="Sidebar-logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="sidebar_logo"
        />
        <NavLink to="/">
          <SidebarOption title="Home" Icon={HomeIcon} />
        </NavLink>
        <NavLink to="/search">
          <SidebarOption title="Search" Icon={SearchIcon} />
        </NavLink>
        <NavLink to="/library">
          <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
        </NavLink>
        <br />
        <button onClick={createNewPlaylist}>
          <SidebarOption title="Create Playlist" Icon={AddBoxIcon} />
        </button>
        <SidebarOption
          title="Liked Songs"
          Icon={FavoriteIcon}
          img="https://community.spotify.com/t5/image/serverpage/image-id/104727iC92B541DB372FBC7/image-size/large?v=v2&px=999"
        />
      </div>
      <br />
      {/* extract items value from returned playlist object and map over playlist names 
      usees optional chaining*/}
      <div className="Sidebar-playlists">
        {playlists?.map(playlist => (
          <NavLink to={`/playlists/${playlist.handle}`} key={playlist.id}>
            <SidebarOption title={playlist.name} />
          </NavLink>
        ))}
      </div>
      {/* {showModal ? (
        <div>
          <NewPlaylistForm closeModal={closeModal} />
        </div>
      ) : null} */}
    </div>
  );
};

export default Sidebar;
