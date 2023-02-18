import React, { useContext, useState } from 'react';
import UserContext from '../../UserContext';
import './Song.css';

import ExplicitIcon from '@material-ui/icons/Explicit';

/** Reusable component for Playlist.js
 * shows song details
 *
 * - useContext: common data that can be accessed throughout the component hierarchy without passing the props down manually to each level
 * - getSongDuration: Handles milliseconds to minutes:seconds conversion
 * - daysAgo: Calculates days since song was added to playlist
 *
 * App -> Routes -> Playlist -> SongList -> Song
 */

const Song = ({ track = 'test', id, removeSong }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { getSongDuration, daysAgo } = useContext(UserContext);
  const numOfDays = daysAgo(track.added_at, new Date());

  /**
   * Returns the appropriate label for the number of days since the track was added to the playlist
   * shows actual date if track.added_at is over 1 month
   */
  const days = numOfDays => {
    if (numOfDays > 30) {
      return formatDate(track.added_at);
    } else if (numOfDays > 14) {
      numOfDays = Math.floor(numOfDays / 7);
      return `${numOfDays} weeks ago`;
    } else if (numOfDays > 7) {
      numOfDays = Math.floor(numOfDays / 7);
      return `${numOfDays} week ago`;
    } else if (numOfDays > 1) {
      return `${numOfDays} days ago`;
    } else if (numOfDays === 1) {
      return `${numOfDays} day ago`;
    }
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; //prettier-ignore
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  /**
   * Toggles the hovering state of the component.
   */
  const handleMouseOver = () => {
    let mouse = isHovering === false ? true : false;
    setIsHovering(mouse);
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
                {track.explicit && <ExplicitIcon fontSize="small" />}{' '}
              </span>
              <span>{track.artist_name}</span>
              {/* <span>{track.artists.map(artist => artist.name).join(', ')}</span> */}
            </p>
          </div>
        </div>
      </td>
      <td>{track.album_name}</td>
      <td>{numOfDays > 0 ? days(numOfDays) : 'Today'}</td>
      <td>{getSongDuration(track.duration_ms)}</td>
      <td>
        <div
          className="Song-delete"
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOver}
        >
          {isHovering ? (
            <button
              className="Song-button-delete"
              onClick={() => {
                removeSong(track.key);
              }}
            >
              X
            </button>
          ) : (
            <button
              className="Song-button-static"
              title="remove from this playlist"
            >
              ...
            </button>
          )}
        </div>
      </td>
    </>
  );
};

export default Song;
