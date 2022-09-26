import React from 'react';
import './InfoCard.css';

/** Renders artists and albums
 *
 * difference from PlaylistCardM is lack of a Link
 *
 * App -> Routes -> Library -> Artists/Albums
 */

function InfoCard({ data, borderRadius }) {
  // console.debug('InfoCard', 'trackData=', trackData, 'isPlaying=', isPlaying);

  return (
    <div className="InfoCardMBox">
      <div className="InfoCardM">
        <div className={borderRadius}>
          <img src={data?.image} alt={data?.name} />
        </div>
        <div className="InfoCardM-Title">
          <h3>{data?.name}</h3>
          <p>{data?.description ? data?.description : 'Artist'}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
