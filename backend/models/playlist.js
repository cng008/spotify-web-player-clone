'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for playlists. */

class Playlist {
  /** Create a playlist (from data), update db, return new playlist data.
   *
   * data should be { name, userId, createdAt, image }
   *
   * Returns { id, name, handle, userId, createdAt, image }
   *
   * Throws BadRequestError if playlist already in database.
   * */

  static async create({ name, userId, description, image }) {
    const handle = name.toLowerCase().replace(' ', '-');

    const duplicateCheck = await db.query(
      `SELECT handle
           FROM playlists
           WHERE handle = $1`,
      [handle]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate playlist: ${name}`);

    const result = await db.query(
      `INSERT INTO playlists
           (name, handle, user_id, description, created_at, image)
           VALUES ($1, $2, $3, $4, now(), $5)
           RETURNING id, name, handle, user_id AS "userId", description, created_at AS "createdAt", image`,
      [name, handle, userId, description, image]
    );
    const playlist = result.rows[0];

    return playlist;
  }

  /** Find all playlists (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ id, name, handle, userId, description, createdAt, image }, ...]
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT id, name, handle, user_id AS "userId", description, to_char(created_at, 'yyyy-mm-dd hh:mi:ss AM') AS "createdAt", image
                 FROM playlists`;
    let whereExpressions = [];
    let queryValues = [];

    const { name } = searchFilters;

    if (name) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += ' WHERE ' + whereExpressions.join(' AND ');
    }

    // Finalize query and return results
    query += ' ORDER BY created_at DESC';
    const playlistsRes = await db.query(query, queryValues);
    return playlistsRes.rows;
  }

  /** Given a playlist name, return data about playlist.
   *
   * Returns { id, name, handle, userId, description, createdAt, image }
   *   where songs is [{ name, duration, date_added, artist_id, album_id, image }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const playlistRes = await db.query(
      `SELECT id, name, handle, user_id AS "userId", description, to_char(created_at, 'yyyy-mm-dd hh:mi:ss AM') AS "createdAt", image
           FROM playlists
           WHERE handle = $1`,
      [handle]
    );

    const playlist = playlistRes.rows[0];

    if (!playlist) throw new NotFoundError(`No playlist: ${handle}`);

    const songRes = await db.query(
      `SELECT s.id, 
              s.name, 
              s.duration, 
              s.date_added AS "dateAdded", 
              at.name AS "artistName", 
              at.image AS "artistImage", 
              ab.name AS "albumName", 
              ab.release_year AS "albumReleaseYear", 
              ab.image
        FROM playlists AS p
          JOIN playlist_songs AS pls ON p.id = pls.playlist_id
          JOIN songs AS s ON pls.song_id = s.id
          JOIN albums AS ab ON s.album_id = ab.id
          JOIN artists AS at ON s.artist_id = at.id      
          WHERE p.handle = $1`,
      [handle]
    );

    // const song = songRes.rows[0];

    // const albumRes = await db.query(
    //   `SELECT ab.id, ab.name, ab.artist_id AS "artistId", ab.release_year AS "releaseYear", ab.image
    //     FROM albums AS ab
    //     JOIN album_songs AS abs ON ab.id = abs.album_id
    //     JOIN songs AS s ON abs.song_id = s.id
    //     WHERE ab.id = $1`,
    //   [song.albumId]
    // );

    // const artistRes = await db.query(
    //   `SELECT at.id, at.name, at.image
    //     FROM artists AS at
    //     JOIN artist_songs AS ats ON at.id = ats.artist_id
    //     JOIN songs AS s ON ats.song_id = s.id
    //     WHERE at.id = $1`,
    //   [song.artistId]
    // );

    playlist.songs = songRes.rows;
    // song.album = albumRes.rows[0];
    // song.artist = artistRes.rows[0];

    return playlist;
  }

  /** Update playlist data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, userId, description, createdAt, image}
   *
   * Returns { id, name, handle, userId, description, createdAt, image }
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
                      RETURNING id, name, handle, user_id AS "userId", description, created_at AS "createdAt", image`;
    const result = await db.query(querySql, [...values, handle]);
    const playlist = result.rows[0];

    if (!playlist) throw new NotFoundError(`No playlist: ${playlist.name}`);

    return playlist;
  }

  /** Delete given playlist from database; returns undefined.
   *
   * Throws NotFoundError if playlist not found.
   **/

  static async remove(handle) {
    const result = await db.query(
      `DELETE
           FROM playlists
           WHERE handle = $1
           RETURNING name`,
      [handle]
    );
    const playlist = result.rows[0];

    if (!playlist) throw new NotFoundError(`No playlist: ${name}`);
  }
}

module.exports = Playlist;
