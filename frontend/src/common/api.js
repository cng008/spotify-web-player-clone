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
class SpotifyApi {
  // static token;
  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SpotifyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, headers, params })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
    }
  }

  /*********************** PLAYLISTS **********************/

  static async newPlaylist(data) {
    let res = await this.request('playlists', data, 'post');
    return res.playlist;
  }

  /** Get playlists (filtered by name if not undefined) */
  static async getPlaylists() {
    let res = await this.request('playlists', {});
    console.log('getPlaylists results', res);
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
  static async deletePlaylist(handle) {
    await this.request(`playlists/${handle}`, {}, 'delete');
  }

  /*********************** SONGS **********************/
  /** Get song by id */
  static async getSongsByID(id) {
    let res = await this.request(`songs/${id}`);
    return res.job;
  }

  /** Save song to current playlist. */
  static async addSongToPlaylist(playlistID, songID) {
    await this.request(`playlists/${playlistID}/songs/${songID}`, {}, 'post');
  }

  /** Delete song from playlist by id */
  static async deleteSong(id) {
    await this.request(`songs/${id}`, {}, 'delete');
  }

  /*********************** ALBUMS **********************/
  /** Get albums (filtered by name if not undefined) */
  static async getAlbums() {
    let res = await this.request('albums', {});
    console.log('getAlbums results', res);
    return res.albums;
  }

  /** Get details on an album by handle. */
  static async getAlbum(handle) {
    let res = await this.request(`albums/${handle}`);
    return res.album;
  }

  /*********************** ARTISTS **********************/
  /** Get artists (filtered by name if not undefined) */
  static async getArtists() {
    let res = await this.request('artists', {});
    console.log('getArtists results', res);
    return res.artists;
  }

  /** Get details on an artist by handle. */
  static async getArtist(handle) {
    let res = await this.request(`artists/${handle}`);
    return res.artist;
  }
}

export default SpotifyApi;
