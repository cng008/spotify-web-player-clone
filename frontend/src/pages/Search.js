import React from 'react';
import { useStateValue } from '../StateProvider';
import { SEARCHCARDS } from '../data/index';
import Header from '../player/Header';
import Sidebar from '../player/Sidebar';
import Footer from '../player/Footer';
import SearchPageCard from '../player/SearchPageCard';
import SearchResultCard from '../player/SearchResultCard';
import './Search.css';

const Search = () => {
  const [{ searchTerm, searchResults }] = useStateValue();

  return (
    <>
      <div className="Search">
        <Sidebar />
        <div className="Search-body">
          <Header />
          <div className="Search-content">
            <h2>Browse all</h2>
            <div className={searchTerm ? 'ResultsCardGrid' : 'SearchCardGrid'}>
              {searchTerm
                ? searchResults?.tracks?.items.map((songs, i) => {
                    return <SearchResultCard key={i} trackData={songs} />;
                  })
                : SEARCHCARDS.map(card => {
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
