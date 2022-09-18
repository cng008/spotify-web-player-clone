import React from 'react';
import './SearchPageCard.css';

function SearchPageCard({ cardData }) {
  return (
    <div
      key={cardData.title}
      className="SearchCardBox"
      style={{ backgroundColor: `${cardData.bgcolor}` }}
    >
      <div className="SearchCard">
        <img src={cardData.imgurl} />
        <h2>{cardData.title}</h2>
      </div>
    </div>
  );
}

export default SearchPageCard;
