import React from 'react';
import { useStateValue } from '../StateProvider';
import Song from '../player/Song';
import './SongList.css';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

const SongList = ({ playlist, playerTime }) => {
  const [{}, dispatch] = useStateValue();

  /** SETS SONG IN FOOTER */
  const setSong = track => {
    dispatch({
      type: 'SET_SONG',
      trackData: track
    });
    dispatch({
      type: 'SET_PLAYING',
      isPlaying: false
    });
    dispatch({
      type: 'SET_PLAYER_TIMELINE',
      playerTime: 0
    });
  };

  return (
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
          {playlist?.songs.map((track, id) => (
            <tr
              key={id}
              onClick={() => {
                setSong(track);
              }}
            >
              <Song track={track} id={id} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
