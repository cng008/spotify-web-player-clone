import React from 'react';
import Song from '../player/Song';
import './SongList.css';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

const SongList = ({ playlist }) => {
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
            <tr key={id}>
              <Song track={track} id={id} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
