import React, { useState } from 'react';
import { useStateValue } from '../StateProvider';
import { NavLink } from 'react-router-dom';
import SidebarOption from './SidebarOption';
import NewPlaylistForm from './NewPlaylistForm';
import './Sidebar.css';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Sidebar = () => {
  const [{ playlists, user }] = useStateValue();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // console.debug('Sidebar', 'playlists=', playlists);

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
        <button onClick={openModal}>
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
      {showModal ? (
        <div>
          <NewPlaylistForm closeModal={closeModal} />
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
