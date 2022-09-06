import React from 'react';
import './Song.css';

const Song = ({ track = 'test' }) => {
  return (
    <div className="Song">
      <img className="Song-albumImg" src={track.album.images[0].url} alt="" />
      <div className="Song-info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map(artist => artist.name).join(', ')} -{' '}
          {track.album.name}
        </p>
      </div>
    </div>
  );
};

export default Song;
