import React from 'react';
import './Player.css';

import Sidebar from './player/Sidebar';
import Body from './player/Body';
import Footer from './player/Footer';

const Player = ({ spotify }) => {
  return (
    <div className="Player">
      <div className="Player-body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>

      <Footer />
    </div>
  );
};

export default Player;
