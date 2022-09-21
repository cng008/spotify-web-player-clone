import React, { useContext } from 'react';
import UserContext from '../UserContext';
import './Song.css';

const Song = ({ track = 'test', id }) => {
  const { getSongDuration, daysAgo } = useContext(UserContext);

  return (
    <>
      <td>{id + 1}</td>
      <td>
        <div className="Song-info">
          <div className="Song-img">
            <img className="Song-albumImg" src={track.image} alt="" />
          </div>
          <div className="Song-credits">
            <h3>
              <span>{track.name}</span>
            </h3>
            <p>
              <span>{track.artistName}</span>
              {/* <span>{track.artists.map(artist => artist.name).join(', ')}</span> */}
            </p>
          </div>
        </div>
      </td>
      <td>{track.albumName}</td>
      <td>{daysAgo(track.dateAdded, new Date())} days ago</td>
      <td>{getSongDuration(track.duration)}</td>
    </>
  );
};

export default Song;
