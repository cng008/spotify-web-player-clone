import React from 'react';
import './Song.css';

const Song = ({ track = 'test', id }) => {
  // https://stackoverflow.com/a/21294619
  function msToMinutesAndSeconds(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  function daysAgo(dateAdded, currentDate) {
    // https://stackoverflow.com/a/4929629
    const date1 = new Date(dateAdded);
    const date2 = currentDate;

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

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
      <td>{msToMinutesAndSeconds(track.duration)}</td>
    </>
  );
};

export default Song;
