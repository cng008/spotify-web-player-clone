import React from 'react';
import { Link } from 'react-router-dom';
import './ArtistCard.css';

function ArtistCard({ data }) {
  return (
    <div className="ArtistCardMBox">
      <Link to={`/playlists/${data.handle}`}>
        <div className="ArtistCardM">
          <div className="ArtistCardM-ImgBox">
            <img src={data.image} alt={data.name} />
          </div>
          <div className="ArtistCardM-Title">
            <h3>{data.name}</h3>
            <p>Artist</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ArtistCard;
