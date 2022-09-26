import React from 'react';
import { useStateValue } from '../StateProvider';
import { SEARCHCARDS } from '../data/index';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import SearchPageCard from '../components/cards/SearchPageCard';
import SearchResultCard from '../components/cards/SearchResultCard';
import './Search.css';

/** View Playlist with songs related to playlist.
 *
 * - useStateValue: access globally stored state
 *
 * App -> Routes -> Search -> SearchPageCard/SearchResultCard
 */

const Search = () => {
  const [{ token, searchTerm, searchResults }] = useStateValue();

  // console.debug('PlaylistCardS', 'token=', token, 'searchTerm=', searchTerm,'searchResults=', searchResults);

  return (
    <>
      <div className="Search">
        <Sidebar />
        <div className="Search-body">
          <Header />
          <div className="Search-content">
            <h2>Browse all</h2>
            <div className={searchTerm ? 'ResultsCardGrid' : 'SearchCardGrid'}>
              {searchTerm && token
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
              {searchResults?.tracks?.total === 0
                ? `There are no results for "${searchTerm}"`
                : null}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Search;
