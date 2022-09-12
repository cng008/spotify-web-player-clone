import axios from 'axios';
// import { useStateValue } from '../StateProvider';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
// the token for interactive with the API will be stored here.
// const [{ token }] = useStateValue();

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

  // Individual API routes

  // /** Get the current user. */
  // static async getCurrentUser(username) {
  //   let res = await this.request(`users/${username}`);
  //   return res.user;
  // }

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

  // /** Get songs by title (filtered by name if not undefined) */
  // static async getSongs(title) {
  //   let res = await this.request('songs', { title });
  //   return res.jobs;
  // }

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

  // /** Signup for site. */
  // static async signup(data) {
  //   let res = await this.request('auth/register', data, 'post');
  //   return res.token;
  // }

  // /** Get token for login from username, password. */
  // static async login(data) {
  //   let res = await this.request('auth/token', data, 'post');
  //   return res.token;
  // }

  // /** Save user profile edits. */
  // static async saveProfile(username, data) {
  //   let res = await this.request(`users/${username}`, data, 'patch');
  //   return res.user;
  // }

  // /** Delete user profile. */
  // static async deleteProfile(username) {
  //   await this.request(`users/${username}`, {}, 'delete');
  // }
}

export default SpotifyApi;
