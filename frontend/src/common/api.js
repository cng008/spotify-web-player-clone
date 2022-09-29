import axios from 'axios';
// import { useStateValue } from '../StateProvider';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SpotifyCloneApi {
  // static token;
  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SpotifyCloneApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, headers, params })).data;
    } catch (err) {
      console.error('API Error:', err.response);
    }
  }

  /*********************** Individual API routes **********************/

  /** Add newly logged in user ****************************/
  static async addNewUser(data) {
    let res = await this.request('users', data, 'post');
    return res.user;
  }

  /*********************** PLAYLISTS **********************/
  /** Add playlist to db */
  static async newPlaylist(data) {
    let res = await this.request('playlists', data, 'post');
    return res.playlist;
  }

  /** Get playlists (filtered by name if not undefined) */
  static async getPlaylists() {
    let res = await this.request('playlists');
    // console.log('getPlaylists results', res);
    return res.playlists;
  }

  /** Get details on a playlist by handle. */
  static async getPlaylist(handle) {
    let res = await this.request(`playlists/${handle}`);
    return res.playlist;
  }

  /** Save playlist details edits. */
  static async savePlaylist(handle, data) {
    let res = await this.request(`playlists/${handle}`, data, 'patch');
    return res.playlist;
  }

  /** Delete playlist */
  static async deletePlaylist(id) {
    await this.request(`playlists/${id}`, {}, 'delete');
  }

  /*********************** SONGS **********************/
  /** Add song to db */
  static async addSong(data) {
    let res = await this.request('songs', data, 'post');
    return res.song;
  }

  /** Save song to current playlist. */
  static async addSongToPlaylist(playlistID, songID) {
    let res = await this.request(
      `playlists/${playlistID}/songs/${songID}`,
      {},
      'post'
    );
    return res.song;
  }

  /** Get song count */
  static async getSongCount() {
    let res = await this.request('songs');
    return +res.count.total_songs;
  }

  /** Delete song from playlist by id */
  static async removeSongFromPlaylist(playlistID, songKey) {
    await this.request(`playlists/${playlistID}/song/${songKey}`, {}, 'delete');
  }

  /*********************** ALBUMS **********************/
  /** Add album to db */
  static async addAlbum(data) {
    let res = await this.request('albums', data, 'post');
    return res.album;
  }

  /** Get albums (filtered by name if not undefined) */
  static async getAlbums() {
    let res = await this.request('albums');
    // console.log('getAlbums results', res);
    return res.albums;
  }

  /** Get details on an album by handle. */
  static async getAlbum(handle) {
    let res = await this.request(`albums/${handle}`);
    return res.album;
  }

  /*********************** ARTISTS **********************/
  /** Add artist to db */
  static async addArtist(data) {
    let res = await this.request('artists', data, 'post');
    return res.artist;
  }

  /** Get artists (filtered by name if not undefined) */
  static async getArtists() {
    let res = await this.request('artists', {});
    // console.log('getArtists results', res);
    return res.artists;
  }

  /** Get details on an artist by handle. */
  static async getArtist(handle) {
    let res = await this.request(`artists/${handle}`);
    return res.artist;
  }
}

export default SpotifyCloneApi;
