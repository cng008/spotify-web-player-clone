import React, { useContext } from 'react';
import { useStateValue } from '../StateProvider';
import UserContext from '../UserContext';
import './Playlist.css';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import PlaylistControls from '../components/playlist/PlaylistControls';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

/** View Playlist with songs related to playlist.
 *
 * - useStateValue: access globally stored state
 * - useContext: common data that can be accessed throughout the component hierarchy without passing the props down manually to each level
 *
 * App -> Routes -> Home/Library/Sidebar -> Playlist
 */

const Playlist = () => {
  const [{ discover_weekly }, dispatch] = useStateValue();
  const { getSongDuration, daysAgo } = useContext(UserContext);

  // console.debug('Playlist', 'discover_weekly=',discover_weekly,'getSongDuration=',getSongDuration);

  // Save data to session storage in case of page refresh
  sessionStorage.setItem(
    'spotify_discover_weekly_data',
    JSON.stringify(discover_weekly)
  );

  /** "PLAYS" SONG IN FOOTER
   * Sets the current song and updates the playing state and player timeline
   */
  const setSong = track => {
    dispatch({
      type: 'SET_SONG',
      trackData: track
    });
    dispatch({
      type: 'SET_PLAYING',
      isPlaying: false
    });
  };

  const days = numOfDays => {
    if (numOfDays > 1) {
      return 'days ago';
    } else if (numOfDays === 1) {
      return 'day ago';
    } else {
      return 'Today';
    }
  };

  return (
    <>
      <div className="Playlist">
        <Sidebar />
        <div className="Playlist-body">
          <Header />
          <div className="Playlist-info">
            <img src={discover_weekly?.images[0].url} alt="" />
            <div className="Playlist-infoText">
              <strong>PLAYLIST</strong>
              <h2>Christen's {discover_weekly?.name}</h2>
              <p>{discover_weekly?.description}</p>
            </div>
          </div>

          <section>
            <PlaylistControls />
            <div className="Playlist-songList">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>ALBUM</th>
                    <th>DATE ADDED</th>
                    <th>
                      <AccessTimeIcon />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {discover_weekly?.tracks?.items.map((trackData, id) => (
                    <tr
                      key={id}
                      onClick={() => {
                        setSong({
                          image: trackData.track.album.images[1].url,
                          name: trackData.track.name,
                          artist_name: trackData.track.artists[0].name,
                          duration_ms: trackData.track.duration_ms,
                          added_at: trackData.added_at
                        });
                      }}
                    >
                      <td>{id + 1}</td>
                      <td>
                        <div className="Song-info">
                          <div className="Song-img">
                            <img
                              className="Song-albumImg"
                              src={trackData.track.album.images[1].url}
                              alt=""
                            />
                          </div>
                          <div className="Song-credits">
                            <h3>
                              <span>{trackData.track.name}</span>
                            </h3>
                            <p>
                              <span>
                                {trackData.track.artists
                                  .map(artist => artist.name)
                                  .join(', ')}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{trackData.track.album.name}</td>
                      <td>
                        {daysAgo(trackData.added_at, new Date()) > 0
                          ? daysAgo(trackData.added_at, new Date())
                          : null}{' '}
                        {days(daysAgo(trackData.added_at, new Date()))}
                      </td>
                      <td>{getSongDuration(trackData.track.duration_ms)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Playlist;
