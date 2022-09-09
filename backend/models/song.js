'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');

/** Related functions for songs. */

class Song {
  /** Add a song (from data), update db, return new song data.
   *
   * data should be { title, duration, date_added, artist_id, album_id, image }
   *
   * Returns { id, title, duration, date_added, artist_id, album_id, image }
   **/

  static async add(data) {
    const result = await db.query(
      `INSERT INTO songs (title, duration, date_added, artist_id, album_id, image)
           VALUES ($1, $2, now(), $3, $4, $5)
           RETURNING id, 
                    title, 
                    duration, 
                    date_added AS "dateAdded", 
                    artist_id AS "artistId", 
                    album_id AS "albumId", 
                    image`,
      [data.title, data.duration, data.artist_id, data.album_id, data.image]
    );
    let song = result.rows[0];

    return song;
  }

  /** Find all songs (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - title (will find case-insensitive, partial matches)
   *
   * Returns [{ id, title, duration, date_added, artist_id, album_id, image }, ...]
   *   where album is { id, name, artist_id, release_year, image }
   *   where artist is { id, name, image }
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT s.id, s.title, s.duration, s.date_added AS "dateAdded", at.name AS "artistName", ab.name AS "albumName", ab.release_year AS "albumReleaseYear", s.image
                 FROM songs AS s
                   JOIN albums AS ab ON s.album_id = ab.id
                   JOIN artist_songs AS ats ON s.id = ats.song_id
                   JOIN artists AS at ON ats.artist_id = at.id`;
    // let whereExpressions = [];
    let queryValues = [];

    // const { playlist, album } = searchFilters;

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    // if (title !== undefined) {
    //   queryValues.push(`%${title}%`);
    //   whereExpressions.push(`title ILIKE $${queryValues.length}`);
    // }

    // if (whereExpressions.length > 0) {
    //   query += ' WHERE ' + whereExpressions.join(' AND ');
    // }

    // Finalize query and return results

    query += ' ORDER BY date_added DESC';
    const songsRes = await db.query(query, queryValues);
    return songsRes.rows;
  }

  //   /** Given a song id, return data about song and start playing audio.
  //    *
  //    * Returns { id, title, duration, date_added, artist_id, album_id, image }
  //    *   where album is { id, name, artist_id, release_year, image }
  //    *   where artist is { id, name, image }
  //    *
  //    * Throws NotFoundError if not found.
  //    **/

  static async get(id) {
    const songRes = await db.query(
      `SELECT id, title, duration, date_added AS "dateAdded", artist_id AS "artistId", album_id AS "albumId", image
        FROM songs
        WHERE id = $1`,
      [id]
    );

    const song = songRes.rows[0];

    if (!song) throw new NotFoundError(`No song: ${id}`);

    const albumRes = await db.query(
      `SELECT ab.id, ab.name, ab.artist_id AS "artistId", ab.release_year AS "releaseYear", ab.image
        FROM albums AS ab
        JOIN album_songs AS abs ON ab.id = abs.album_id
        JOIN songs AS s ON abs.song_id = s.id
        WHERE ab.id = $1`,
      [song.albumId]
    );

    const artistRes = await db.query(
      `SELECT at.id, at.name, at.image
        FROM artists AS at
        JOIN artist_songs AS ats ON at.id = ats.artist_id
        JOIN songs AS s ON ats.song_id = s.id
        WHERE at.id = $1`,
      [song.artistId]
    );

    song.album = albumRes.rows[0];
    song.artist = artistRes.rows[0];

    return song;
  }

  /** Delete given song from database; returns undefined.
   *
   * Throws NotFoundError if album not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM songs
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const song = result.rows[0];

    if (!song) throw new NotFoundError(`No song: ${id}`);
  }
}

module.exports = Song;
