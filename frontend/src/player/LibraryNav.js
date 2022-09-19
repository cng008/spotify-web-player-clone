import React from 'react';
import { NavLink } from 'react-router-dom';
import './LibraryNav.css';

const LibraryNav = () => {
  const LIBRARYTABS = [
    { title: 'Playlists', path: '/library' },
    { title: 'Podcasts', path: '/library/podcasts' },
    { title: 'Artists', path: '/library/artists' },
    { title: 'Albums', path: '/library/albums' }
  ];

  return (
    <nav className="TabNav">
      {LIBRARYTABS.map(item => {
        return (
          <NavLink
            key={item.title}
            className="tabBtn"
            to={item.path}
            exact
            activeClassName="activeTabBtn"
          >
            <h3>{item.title}</h3>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default LibraryNav;
