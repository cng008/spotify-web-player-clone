import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Playlist.css';

import SpotifyApi from '../common/api';
import Header from '../player/Header';
import Sidebar from '../player/Sidebar';
import Footer from '../player/Footer';
import PlaylistControls from '../player/PlaylistControls';
import SongList from '../player/SongList';

const Playlist = () => {
  const { handle } = useParams();
  const [playlist, setPlaylist] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // console.debug('Playlist', 'handle=',handle,'playlist=',playlist,'sort=',sort, 'isLoading=', isLoading, 'paused=', paused, 'liked=', liked);

  // GET PLAYLIST FROM PARAK
  useEffect(() => {
    async function getPlaylistDetails() {
      let result = await SpotifyApi.getPlaylist(handle);
      setPlaylist(result);
      setIsLoading(false);
      document.body.style.cursor = 'default';
    }
    getPlaylistDetails();
  }, [handle]);

  if (isLoading) {
    document.body.style.cursor = 'progress';
    return 'Loading...';
  }

  return (
    <>
      <div className="Playlist">
        <Sidebar />
        <div className="Playlist-body">
          <Header />
          <div className="Playlist-info">
            <img src={playlist?.image} alt="" />
            <div className="Playlist-infoText">
              <strong>PLAYLIST</strong>
              <h2>{playlist?.name}</h2>
              <p>{playlist?.description}</p>
            </div>
          </div>

          <section>
            <PlaylistControls />
            <SongList playlist={playlist} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Playlist;
