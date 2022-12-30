import React from 'react';
import { Link } from 'react-router-dom';
import './PlaylistCardM.css';

/** Renders preview of playlists
 *
 * App -> Routes -> Home/Library -> Playlists
 */

const PlaylistCardM = ({ data }) => {
  return (
    <div className="PlaylistCardMBox">
      <Link to={`/playlists/${data?.handle}`} data-testid="playlist-link">
        <div className="PlaylistCardM">
          <div className="PlaylistCardM-ImgBox">
            <img src={data?.image} alt={`${data?.name} playlist cover`} />
          </div>
          <div className="PlaylistCardM-Title">
            <h3>{data?.name}</h3>
            <p>{data?.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCardM;
