import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useStateValue } from '../StateProvider';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // const [playlists, setPlaylists] = useState([]);
  const [{ playlists }, dispatch] = useStateValue();

  return (
    <div className="Sidebar">
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
      <strong className="Sidebar-title">PLAYLISTS</strong>
      <hr />
      {/* extract items value from returned playlist object and map over playlist names 
      usees optional chaining*/}
      {playlists?.map(playlist => (
        <NavLink to={`/playlists/${playlist.handle}`}>
          <SidebarOption title={playlist.name} />
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
