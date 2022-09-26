import React, { useContext, useState } from 'react';
import { useStateValue } from '../../StateProvider';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyCloneApi from '../../common/api';
import UserContext from '../../UserContext';
import './SearchResultCard.css';

import ExplicitIcon from '@material-ui/icons/Explicit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

/** MUI Alert pop-up */
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/** Song results for SearchBar
 *
 * - useState: state variables in functional components
 * - useStateValue: access globally stored state
 * - useContext: common data that can be accessed throughout the component hierarchy without passing the props down manually to each level
 *
 * App -> Routes -> Header -> Searchbar
 *                  Search -> SearchResultCard
 */

const SearchResultCard = ({ trackData = 'test' }) => {
  const spotify = new SpotifyWebApi();
  const [{ playlists }, dispatch] = useStateValue();
  const { getSongDuration } = useContext(UserContext);
  const [liked, setLike] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [songID, setSongID] = useState('');
  const [artistImg, setArtistImg] = useState('');
  const [open, setOpen] = useState(false);

  // console.debug(
  //   'SearchResultCard',
  //   'liked',
  //   liked,
  //   'isClicked',
  //   isClicked,
  //   'songID',
  //   songID,
  //   'artistImg',
  //   artistImg
  // );

  /** MUI Alert pop-up */
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const addSongToPlaylist = async playlistID => {
    try {
      /** Makes a POST request to common > api.js and adds song, album, artist data to db */
      await SpotifyCloneApi.addArtist(artistData);
      await SpotifyCloneApi.addAlbum(albumData);
      await SpotifyCloneApi.addSong(songData);

      /** Makes a POST request to common > api.js and adds song to selected playlist */
      console.log('playlistID', playlistID, 'songID', songID);
      await SpotifyCloneApi.addSongToPlaylist(playlistID, songID);
      handleClick();
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const songData = {
    id: trackData.id,
    name: trackData.name,
    duration_ms: trackData.duration_ms,
    explicit: trackData.explicit,
    artist_id: trackData.artists[0].id,
    album_id: trackData.album.id,
    image: trackData.album.images[1].url
  };
  const albumData = {
    id: trackData.album.id,
    name: trackData.album.name,
    artist_id: trackData.artists[0].id,
    release_date: trackData.album.release_date,
    image: trackData.album.images[1].url
  };
  const artistData = {
    id: trackData.artists[0].id,
    name: trackData.artists[0].name,
    image: artistImg
  };

  const playSongData = {
    id: trackData.id,
    name: trackData.name,
    duration_ms: trackData.duration_ms,
    explicit: trackData.explicit,
    artist_name: trackData.artists[0].name,
    image: trackData.album.images[1].url
  };
  /** "PLAYS" SONG IN FOOTER */
  const playSong = track => {
    dispatch({
      type: 'SET_SONG',
      trackData: track
    });
    dispatch({
      type: 'SET_PLAYING',
      isPlaying: false
    });
    dispatch({
      type: 'SET_PLAYER_TIMELINE',
      playerTime: 0
    });
  };

  const toggleLike = () => {
    let toggle = liked === true ? false : true;
    setLike(toggle);
  };

  const handleMoreClick = async () => {
    let toggle = isClicked === true ? false : true;
    setIsClicked(toggle);
    setSongID(trackData.id);

    // gets artist img (which needs a separate api call)
    let artist = await spotify.getArtist(trackData.artists[0].id);
    setArtistImg(artist.images[1].url);
  };

  return (
    <>
      <div className="SearchResultCardBox">
        <div
          className="SearchResultCard"
          onClick={() => {
            playSong(playSongData);
          }}
        >
          <div className="SearchResultCard-img">
            <img src={trackData.album.images[2].url} alt="" />
          </div>
          <div className="SearchResultCard-credits">
            <h3>{trackData.name}</h3>
            <p>
              {trackData.explicit ? <ExplicitIcon /> : null}
              {trackData.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>

          <div className="SearchResultCard-icons">
            <div className="SearchResultCard-like">
              {liked ? (
                <FavoriteIcon
                  onClick={toggleLike}
                  className="Playlist-heart-filled"
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={toggleLike}
                  className="Playlist-heart-outline"
                />
              )}
            </div>
            <div className="SearchResultCard-song-duration">
              {getSongDuration(trackData.duration_ms)}
            </div>
            <div className="SearchResultCard-more">
              <div
                onClick={() => {
                  handleMoreClick();
                }}
              >
                <MoreHorizIcon />
                {isClicked && (
                  <div className="Playlist-add">
                    Add to playlist:
                    {playlists.map(playlist => {
                      return (
                        <button
                          key={playlist.handle}
                          title="Add to this playlist"
                          onClick={() => {
                            addSongToPlaylist(playlist.id);
                          }}
                        >
                          <span>{playlist.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Material UI alert */}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%', bottom: '10em' }}
          >
            Song was successfully added!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default SearchResultCard;
