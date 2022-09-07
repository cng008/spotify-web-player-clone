import React from 'react';
import './Song.css';

const Song = ({ track = 'test', id }) => {
  function msToMinutesAndSeconds(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <>
      <td>{id + 1}</td>
      <td>
        <div className="Song-info">
          <div className="Song-img">
            <img
              className="Song-albumImg"
              src={track.album.images[0].url}
              alt=""
            />
          </div>
          <div className="Song-credits">
            <h3>
              <span>{track.name}</span>
            </h3>
            <p>
              <span>{track.artists.map(artist => artist.name).join(', ')}</span>
            </p>
          </div>
        </div>
      </td>
      <td>{track.album.name}</td>
      <td>2 days ago</td>
      <td>{msToMinutesAndSeconds(track.duration_ms)}</td>
    </>
  );
};

export default Song;
