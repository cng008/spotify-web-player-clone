import React from 'react';
import './SearchPageCard.css';

/** Filler category cards for Search.js
 *
 * App -> Routes -> Search -> SearchPageCard
 */

const SearchPageCard = ({ cardData }) => {
  // console.debug('SearchPageCard','cardData=', cardData);

  return (
    <div
      key={cardData.title}
      className="SearchCardBox"
      style={{ backgroundColor: `${cardData.bgcolor}` }}
      data-testid="card-box"
    >
      <div className="SearchCard">
        <img src={cardData.imgurl} alt={`${cardData.title} cover`} />
        <h2>{cardData.title}</h2>
      </div>
    </div>
  );
};

export default SearchPageCard;
