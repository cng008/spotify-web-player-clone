import React, { useContext, useState, useEffect, useRef } from 'react';
import { useStateValue } from '../../StateProvider';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyCloneApi from '../../common/api';
import UserContext from '../../UserContext';
import './SongCard.css';

import ExplicitIcon from '@material-ui/icons/Explicit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

/** Song results for SearchBar
 *
 * App -> Routes -> Header -> Searchbar
 *                  Search -> SongCard
 */

const SongCard = ({ trackData = 'test', handleAlert }) => {
  const spotify = new SpotifyWebApi();
  const [{ playlists }, dispatch] = useStateValue();
  const { getSongDuration } = useContext(UserContext);
  const [liked, setLike] = useState(false);
  const [isDivActive, setIsDivActive] = useState(false);
  const addToPlaylistRef = useRef(null);
  const [artistImg, setArtistImg] = useState('');

  const addSongToPlaylist = async playlistID => {
    try {
      let totalSongs = await SpotifyCloneApi.getSongCount();
      /** Makes a POST request to common > api.js and adds song, album, artist data to postgres */
      await SpotifyCloneApi.addArtist(artistData);
      await SpotifyCloneApi.addAlbum(albumData);
      await SpotifyCloneApi.addSong(songData);

      /** Makes a POST request to common > api.js and adds song to selected playlist
       * success notification
       */
      await SpotifyCloneApi.addSongToPlaylist(playlistID, totalSongs + 1); // (playlistID, songKey)
      handleAlert();
    } catch (err) {
      console.error(err);
      return;
    }
  };

  /** set data for postgres insertion */
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

  /** "PLAYS" SONG IN FOOTER
   * set song variable for dispatch
   */
  const playSongData = {
    id: trackData.id,
    name: trackData.name,
    duration_ms: trackData.duration_ms,
    explicit: trackData.explicit,
    artist_name: trackData.artists[0].name,
    image: trackData.album.images[1].url
  };
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
    setLike(liked ? false : true);
  };

  const handleMoreClick = async () => {
    setIsDivActive(true);

    // gets artist img (which needs a separate api call)
    let artist = await spotify.getArtist(trackData.artists[0].id);
    setArtistImg(artist.images[1].url);
  };

  useEffect(() => {
    function handleClickOutside(evt) {
      // check if the clicked element is not inside the div element
      if (
        addToPlaylistRef.current &&
        !addToPlaylistRef.current.contains(evt.target)
      ) {
        // set the isDivActive state to false if the click is outside the menu
        setIsDivActive(false);
      }
    }
    // add a mousedown event listener to the document object
    document.addEventListener('mousedown', handleClickOutside);

    // remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [addToPlaylistRef]);

  return (
    <>
      <div className="SongCardBox">
        <div
          className="SongCard"
          onClick={() => {
            playSong(playSongData);
          }}
        >
          <div className="SongCard-img">
            <img src={trackData.album.images[2].url} alt="" />
          </div>
          <div className="SongCard-credits">
            <h3>{trackData.name}</h3>
            <p>
              {trackData.explicit && <ExplicitIcon />}
              {trackData.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>

          <div className="SongCard-icons">
            <div className="SongCard-like">
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
            <div className="SongCard-song-duration">
              {getSongDuration(trackData.duration_ms)}
            </div>
            <div className="SongCard-more">
              <div onClick={() => handleMoreClick()}>
                <MoreHorizIcon />
                {/* Add to playlist menu */}
                {isDivActive && (
                  <div className="Playlist-add" ref={addToPlaylistRef}>
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
    </>
  );
};

export default SongCard;
