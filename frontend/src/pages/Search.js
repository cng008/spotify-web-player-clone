import React, { useState } from 'react';
import { useStateValue } from '../StateProvider';
import { SEARCHCARDS } from '../data/searchcards';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import SearchPageCard from '../components/cards/SearchPageCard';
import SongCard from '../components/cards/SongCard';
import './Search.css';

import { Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

/** MUI Alert pop-up */
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/** View Playlist with songs related to playlist.
 *
 * - useStateValue: access globally stored state
 *
 * App -> Routes -> Search -> SearchPageCard
 *                         -> SongCard
 */

const Search = () => {
  const [{ token, searchTerm, searchResults }] = useStateValue();
  const [open, setOpen] = useState(false);

  // console.debug('PlaylistCardS', 'token=', token, 'searchTerm=', searchTerm,'searchResults=', searchResults);

  /** MUI Alert pop-up */
  const handleAlert = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className="Search">
        <Sidebar />
        <div className="Search-body">
          <Header />
          <div className="Search-content">
            <h2>Browse all</h2>
            <div
              className={
                searchTerm && token ? 'ResultsCardGrid' : 'SearchCardGrid'
              }
            >
              {searchTerm && token
                ? searchResults?.tracks?.items.map((songs, i) => {
                    return (
                      <SongCard
                        key={i}
                        trackData={songs}
                        handleAlert={handleAlert}
                      />
                    );
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
            {/* Material UI alert */}
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: '100%', bottom: '10em' }}
                >
                  Song was successfully added!
                </Alert>
              </Snackbar>
            </Stack>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Search;
