'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for playlists. */

class Playlist {
  /** Create a playlist (from data), update db, return new playlist data.
   *
   * data should be { name, username, created_at, image }
   *
   * Returns { id, name, handle, username, created_at, image }
   *
   * Throws BadRequestError if playlist already in database.
   * */

  static async create({ name, username, description, image }) {
    const handle = name.toLowerCase().split(' ').join('-').replace('#', '');

    const duplicateCheck = await db.query(
      `SELECT handle
           FROM playlists
           WHERE handle = $1`,
      [handle]
    );

    if (duplicateCheck.rows[0]) return;

    const result = await db.query(
      `INSERT INTO playlists
           (name, handle, username, description, created_at, image)
           VALUES ($1, $2, $3, $4, now(), $5)
           RETURNING id, name, handle, username, description, created_at AS "created_at", image`,
      [name, handle, username, description, image]
    );
    const playlist = result.rows[0];

    return playlist;
  }

  /** Create a playlist (from data), update db, return new playlist data.
   *
   * data should be { name, username, created_at, image }
   *
   * Returns { id, name, handle, username, created_at, image }
   *
   * Throws BadRequestError if playlist already in database.
   * */

  static async addToPlaylist(playlistID, songKey) {
    // const duplicateCheck = await db.query(
    //   `SELECT playlist_id, song_key
    //        FROM playlist_songs
    //        WHERE playlist_id = $1 AND song_key = $2`,
    //   [playlistID, songID]
    // );
    // if (duplicateCheck.rows[0]) return;

    // duplicates OK
    const result = await db.query(
      `INSERT INTO playlist_songs
           (playlist_id, song_key)
           VALUES ($1, $2)
           RETURNING playlist_id, song_key`,
      [playlistID, songKey]
    );
    const playlist = result.rows[0];

    return playlist;
  }

  /** Find all playlists (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ id, name, handle, username, description, created_at, image }, ...]
   * */

  static async findAll() {
    const playlistsRes = await db.query(
      `SELECT id, name, handle, username, description, to_char(created_at, 'yyyy-mm-dd hh:mi:ss AM') AS "created_at", image
                 FROM playlists 
                 ORDER BY id DESC`
    );
    return playlistsRes.rows;
  }

  /** Given a playlist name, return data about playlist.
   *
   * Returns { id, name, handle, username, description, created_at, image }
   *   where songs is [{ key, id, name, duration_ms, explicit, added_at, artist_id, album_id, image }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const playlistRes = await db.query(
      `SELECT id, name, handle, username, description, to_char(created_at, 'yyyy-mm-dd hh:mi:ss AM') AS "created_at", image
           FROM playlists
           WHERE handle = $1`,
      [handle]
    );

    const playlist = playlistRes.rows[0];

    if (!playlist) throw new NotFoundError(`No playlist: ${handle}`);

    const userRes = await db.query(
      `SELECT u.display_name, u.image, u.profile_url
          FROM users AS u
          JOIN playlists AS p ON p.username = u.username
          WHERE p.handle = $1`,
      [handle]
    );

    const songRes = await db.query(
      `SELECT s.key, 
              s.id, 
              s.name, 
              s.duration_ms, 
              s.explicit, 
              s.added_at ,
              at.name AS "artist_name", 
              at.image,
              ab.name AS "album_name",
              ab.release_date AS "album_release_date",
              ab.image
        FROM playlists AS p
          JOIN playlist_songs AS pls ON p.id = pls.playlist_id
          JOIN songs AS s ON pls.song_key = s.key
          JOIN albums AS ab ON s.album_id = ab.id
          JOIN artists AS at ON s.artist_id = at.id      
          WHERE p.handle = $1`,
      [handle]
    );
    playlist.user = userRes.rows[0];
    playlist.songs = songRes.rows;

    return playlist;
  }

  /** Update playlist data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, username, description, createdSt, image}
   *
   * Returns { id, name, handle, username, description, created_at, image }
   *
   * Throws NotFoundError if not found.
   */

  static async update(handle, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      name: 'name',
      description: 'description',
      image: 'image'
    });
    const handleVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE playlists 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING id, name, handle, username, description, created_at, image`;
    const result = await db.query(querySql, [...values, handle]);
    const playlist = result.rows[0];

    if (!playlist) throw new NotFoundError(`No playlist: ${playlist.name}`);

    return playlist;
  }

  /** Delete given playlist from database; returns undefined.
   *
   * Throws NotFoundError if playlist not found.
   **/

  static async remove(id) {
    // delete songs from playlist (relation table)
    await db.query(
      `DELETE
           FROM playlist_songs
           WHERE playlist_id = $1`,
      [id]
    );

    const playlistRes = await db.query(
      `DELETE
           FROM playlists
           WHERE id = $1
           RETURNING name`,
      [id]
    );
    const playlist = playlistRes.rows[0];

    if (!playlist) throw new NotFoundError(`No playlist: ${id}`);

    return playlist;
  }

  /** Delete given song from database; returns undefined.
   *
   * Throws NotFoundError if album not found.
   **/

  static async removeSong(playlistId, songKey) {
    // check if song in more than one playlist
    const songInMultiplePlaylists = await db.query(
      `SELECT playlist_id, song_key
           FROM playlist_songs
           WHERE song_key = $1`,
      [songKey]
    );
    if (!songInMultiplePlaylists)
      throw new NotFoundError(`No song: ${songKey}`);

    // don't delete song from db if it's also in another playlist
    if (songInMultiplePlaylists.rows[1]) {
      await db.query(
        `DELETE
          FROM playlist_songs
          WHERE playlist_id=$1 AND song_key = $2`,
        [playlistId, songKey]
      );
      return;
    }

    /********** delete from relation tables *********/
    await db.query(
      `DELETE
        FROM playlist_songs
        WHERE song_key = $1`,
      [songKey]
    );
    await db.query(
      `DELETE
        FROM album_songs
        WHERE song_key = $1`,
      [songKey]
    );
    await db.query(
      `DELETE
        FROM artist_songs
        WHERE song_key = $1`,
      [songKey]
    );
  }
}

module.exports = Playlist;
