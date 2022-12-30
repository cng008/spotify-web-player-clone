import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SpotifyCloneApi {
  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    // passes authorization token in the header
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

  /** Add newly logged in user ***************************
   * for when Spotify Auth is allowed for personal logins > App.js
   */
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

  /** Get playlists */
  static async getPlaylists() {
    let res = await this.request('playlists');
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

  /** Save song to playlist by playlistID. */
  static async addSongToPlaylist(playlistID, songKey) {
    let res = await this.request(
      `playlists/${playlistID}/songs/${songKey}`,
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

  /** Get albums */
  static async getAlbums() {
    let res = await this.request('albums');
    return res.albums;
  }

  /** Get details on an album by id. */
  // static async getAlbum(id) {
  //   let res = await this.request(`albums/${id}`);
  //   return res.album;
  // }

  /*********************** ARTISTS **********************/
  /** Add artist to db */
  static async addArtist(data) {
    let res = await this.request('artists', data, 'post');
    return res.artist;
  }

  /** Get artists */
  static async getArtists() {
    let res = await this.request('artists', {});
    return res.artists;
  }

  /** Get details on an artist by id. */
  // static async getArtist(id) {
  //   let res = await this.request(`artists/${id}`);
  //   return res.artist;
  // }
}

export default SpotifyCloneApi;
