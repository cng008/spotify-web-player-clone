import React from 'react';
import { Link } from 'react-router-dom';
import './PlaylistCardS.css';

/** Renders preview of playlists
 *
 * App -> Routes -> Home -> Playlists
 */

const PlaylistCardS = ({ data }) => {
  return (
    <div className="PlaylistCardSBox">
      <Link to={`/playlists/${data?.handle}`} data-testid="playlist-link">
        <div className="PlaylistCardS">
          <div className="PlaylistCardS-ImgBox">
            <img src={data?.image} alt={`${data?.name} playlist cover`} />
          </div>
          <div className="PlaylistCardS-Title">
            <h3>{data?.name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCardS;
