import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useStateValue } from '../StateProvider';

const Sidebar = () => {
  // pull from useContext
  const [{ playlists }, dispatch] = useStateValue();
  // console.log(playlists.items);

  return (
    <div className="Sidebar">
      <img
        className="Sidebar-logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="sidebar_logo"
      />
      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />

      <br />
      <strong className="Sidebar-title">PLAYLISTS</strong>
      <hr />

      {/* extract items value from returned playlist object and map over playlist names 
      usees optional chaining*/}
      {playlists?.items?.map(playlist => (
        <SidebarOption title={playlist.name} />
      ))}
      {/* <SidebarOption title="Hip Hop" />
      <SidebarOption title="RnB" />
      <SidebarOption title="Jazz" /> */}
    </div>
  );
};

export default Sidebar;
