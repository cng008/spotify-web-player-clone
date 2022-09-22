'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');

/** Related functions for artistss. */

class Album {
  /** Add an artist (from data)
   * update db (name, handle, artist_id, release_year, image)
   *
   * data should be { name, artist_id, release_year, image }
   *
   * Returns new album data { id, name, handle, artist_id, release_year, image }
   **/

  static async add(data) {
    const handle = data.name.toLowerCase().split(' ').join('-');

    const result = await db.query(
      `INSERT INTO albums (name, handle, artist_id, release_year, image)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, name, handle, artist_id, release_year, image`,
      [data.name, handle, data.artist_id, data.release_year, data.image]
    );
    const albums = result.rows[0];

    return albums;
  }

  /** Find all albums (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ id, name, artist_id, release_year, image }, ...]
   *   where album is { id, name, artist_id, release_year, image }
//    *   where artist is { id, name, image }
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT id, name, handle, artist_id, release_year, image
                 FROM albums`;
    // let whereExpressions = [];
    let queryValues = [];

    // const { playlist, album } = searchFilters;

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    // if (name !== undefined) {
    //   queryValues.push(`%${name}%`);
    //   whereExpressions.push(`name ILIKE $${queryValues.length}`);
    // }

    // if (whereExpressions.length > 0) {
    //   query += ' WHERE ' + whereExpressions.join(' AND ');
    // }

    // Finalize query and return results

    // query += ' ORDER BY date_added DESC';
    const albumsRes = await db.query(query, queryValues);
    return albumsRes.rows;
  }

  /** Given an album id, return data about the album.
   *
   * Returns [{ id, name, artist_id, release_year, image }, ...]
   *   where album is { id, name, artist_id, release_year, image }
   *   where artist is { id, name, image }
   *   where songs is { id, name, duration, date_added, artist_id, album_id, image }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const albumRes = await db.query(
      `SELECT id, name, handle, artist_id, release_year
            FROM albums
            WHERE handle = $1`,
      [handle]
    );

    const album = albumRes.rows[0];

    if (!album) throw new NotFoundError(`No album: ${handle}`);

    const songRes = await db.query(
      `SELECT s.id, s.name, s.duration, s.date_added AS "dateAdded", s.artist_id AS "artistId", s.album_id AS "albumId", s.image
            FROM songs AS s
            JOIN albums AS ab ON s.album_id = ab.id
            WHERE ab.handle = $1`,
      [handle]
    );

    const artistRes = await db.query(
      `SELECT at.id, at.name, at.image
              FROM artists AS at
              JOIN albums AS ab ON at.id = ab.artist_id
              WHERE ab.handle = $1`,
      [handle]
    );

    album.songs = songRes.rows;
    album.artists = artistRes.rows;

    return album;
  }

  //   /** Delete given album from database; returns undefined.
  //    *
  //    * Throws NotFoundError if album not found.
  //    **/

  //   static async remove(playlistId, songId) {
  //     const result = await db.query(
  //       `DELETE
  //            FROM playlist_songs
  //            WHERE playlist_id = $1 AND song_id = $2
  //            RETURNING id`,
  //       [playlistId, songId]
  //     );
  //     const song = result.rows[0];

  //     if (!song) throw new NotFoundError(`No song: ${id}`);
  //   }
}

module.exports = Album;
