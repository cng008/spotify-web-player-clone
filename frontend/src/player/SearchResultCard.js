import React, { useContext, useState } from 'react';
import { useStateValue } from '../StateProvider';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyApi from '../common/api';
import UserContext from '../UserContext';
import './SearchResultCard.css';

import ExplicitIcon from '@material-ui/icons/Explicit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const SearchResultCard = ({ trackData = 'test' }) => {
  const spotify = new SpotifyWebApi();
  const [{ playlists }, dispatch] = useStateValue();
  const { getSongDuration } = useContext(UserContext);
  const [liked, setLike] = useState(false);
  const [isCicked, setIsClicked] = useState(false);
  const [songID, setSongID] = useState('');
  const [artistImg, setArtistImg] = useState('');

  // console.debug(
  //   'SearchResultCard',
  //   'liked',
  //   liked,
  //   'isCicked',
  //   isCicked,
  //   'songID',
  //   songID
  // );
  /** Triggered by song add to playlist */
  async function getArtistImg() {
    let res = await spotify.getArtist(trackData.artists[0].id);
    setArtistImg(res.images[1].url);
  }
  getArtistImg();
  const addSongToPlaylist = async playlistID => {
    try {
      /** Makes a POST request to common > api.js and adds song, album, artist data to db */
      await SpotifyApi.addArtist(artistData);
      await SpotifyApi.addAlbum(albumData);
      await SpotifyApi.addSong(songData);
      /** Makes a POST request to common > api.js and adds song to selected playlist */
      console.log('playlistID', playlistID, 'songID', songID);
      await SpotifyApi.addSongToPlaylist(playlistID, songID);
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

  const handleMoreClick = () => {
    let toggle = isCicked === true ? false : true;
    setIsClicked(toggle);
    setSongID(trackData.id);
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
              {isCicked && (
                <div className="Playlist-add">
                  Add to playlist:
                  {playlists.map(playlist => {
                    return (
                      <button
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
    </>
  );
};

export default SearchResultCard;
