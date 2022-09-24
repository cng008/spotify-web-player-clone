import React, { useContext } from 'react';
import UserContext from '../UserContext';
import './Song.css';

import ExplicitIcon from '@material-ui/icons/Explicit';

const Song = ({ track = 'test', id }) => {
  const { getSongDuration, daysAgo } = useContext(UserContext);
  const numOfDays = daysAgo(track.added_at, new Date());

  console.debug('Song', 'numOfDays', numOfDays);

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
              <span>
                {track.explicit ? <ExplicitIcon fontSize="small" /> : null}
              </span>
              <span>{track.artist_name}</span>
              {/* <span>{track.artists.map(artist => artist.name).join(', ')}</span> */}
            </p>
          </div>
        </div>
      </td>
      <td>{track.album_name}</td>
      <td>
        {numOfDays > 0 ? numOfDays : null} {days(numOfDays)}
      </td>
      <td>{getSongDuration(track.duration_ms)}</td>
    </>
  );
};

export default Song;
