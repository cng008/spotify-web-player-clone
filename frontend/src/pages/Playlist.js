import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SpotifyCloneApi from '../common/api';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import PlaylistControls from '../components/playlist/PlaylistControls';
import SongList from '../components/playlist/SongList';
import './Playlist.css';

/** View Playlist with songs related to playlist.
 *
 * - useParams: returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>
 * - useState: state variables in functional components
 * - useHistory: lets you access the history instance used by React Router, useful for redirecting users to another page
 * - useStateValue: access globally stored state
 * - useContext: common data that can be accessed throughout the component hierarchy without passing the props down manually to each level
 *
 * App -> Routes -> Home/Library/Sidebar -> Playlist
 */

const Playlist = () => {
  const { handle } = useParams();
  const history = useHistory();
  const [playlist, setPlaylist] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // console.debug('Playlist', 'handle=',handle,'playlist=',playlist,'sort=',sort, 'isLoading=', isLoading, 'paused=', paused, 'liked=', liked);

  // GET PLAYLIST FROM DB
  useEffect(() => {
    async function getPlaylistDetails() {
      try {
        let result = await SpotifyCloneApi.getPlaylist(handle);
        setPlaylist(result);
        setIsLoading(false);
        document.body.style.cursor = 'default';
      } catch (err) {
        console.log(err);
        history.push('/404'); //redirects when no playlist found
        setIsLoading(false);
        document.body.style.cursor = 'default';
      }
    }
    getPlaylistDetails();
  }, [handle, history]);

  if (isLoading) {
    document.body.style.cursor = 'progress';
    return '';
  }

  const removeSongFromPlaylist = async songKey => {
    try {
      await SpotifyCloneApi.removeSongFromPlaylist(playlist.id, songKey);
      history.go(0);
    } catch (err) {
      console.log(err);
    }
  };

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
              <a href={playlist ? playlist?.user?.profile_url : ''}>
                <div className="Playlist-avatar">
                  <img
                    src={playlist?.user?.image}
                    alt={playlist ? playlist?.user?.display_name : ''}
                  />
                  <h4>{playlist?.user?.display_name}</h4>
                </div>
              </a>
            </div>
          </div>

          <section>
            <PlaylistControls playlist={playlist} />
            <SongList
              songs={playlist?.songs}
              removeSong={removeSongFromPlaylist}
            />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Playlist;
