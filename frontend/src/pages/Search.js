import React from 'react';
import Header from '../player/Header';
import Sidebar from '../player/Sidebar';
import Footer from '../player/Footer';
import SearchPageCard from '../player/SearchPageCard';
import { SEARCHCARDS } from '../data/index';
import './Search.css';

const Search = () => {
  return (
    <>
      <div className="Search">
        <Sidebar />
        <div className="Search-body">
          <Header />
          <div className="Search-content">
            <h2>Browse all</h2>
            <div className="SearchCardGrid">
              {SEARCHCARDS.map(card => {
                return (
                  <SearchPageCard
                    key={card.title}
                    cardData={{
                      bgcolor: card.bgcolor,
                      title: card.title,
                      imgurl: card.imgurl
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Search;
