'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');

/** Related functions for artistss. */

class Artist {
  /** Add an artist (from data)
   * update db (name, handle, image)
   *
   * data should be { name, handle, image }
   *
   * Returns new artist data { id, name, handle, image }
   **/

  static async add(name, image) {
    const handle = name.toLowerCase().replace(' ', '-');

    const result = await db.query(
      `INSERT INTO artists (name, handle, image)
           VALUES ($1, $2, $3)
           RETURNING id, 
                    name, 
                    image`,
      [name, handle, image]
    );
    let artist = result.rows[0];

    return artist;
  }

  /** Find all artists (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ id, name, handle, image }, ...]
   *   where artist is { id, name, handle, image }
//    *   where albums is { id, name, handle, artist_id, release_year, image }
//    *   where songs is { id, name, duration, date_added, artist_id, album_id, image }
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT id, name, handle, image
                 FROM artists`;
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
    const artistsRes = await db.query(query, queryValues);
    return artistsRes.rows;
  }

  //   /** Given an artist id, return data about artist.
  //    *
  //    * Returns { id, name, duration, date_added, artist_id, album_id, image }
  //    *   where album is { id, name, artist_id, release_year, image }
  //    *   where artist is { id, name, image }
  //    *
  //    * Throws NotFoundError if not found.
  //    **/

  static async get(handle) {
    const artistRes = await db.query(
      `SELECT id, name, handle, image
          FROM artists
          WHERE handle = $1`,
      [handle]
    );

    const artist = artistRes.rows[0];

    if (!artist) throw new NotFoundError(`No artist: ${id}`);

    const albumRes = await db.query(
      `SELECT ab.id, ab.name, ab.handle, ab.artist_id AS "artistId", ab.release_year AS "releaseYear", ab.image
        FROM albums AS ab
        JOIN artists AS at ON ab.artist_id = at.id
        WHERE at.handle = $1`,
      [handle]
    );

    const songRes = await db.query(
      `SELECT DISTINCT s.id, s.name, s.duration, s.date_added AS "dateAdded", s.artist_id AS "artistId", s.album_id AS "albumId", s.image
          FROM songs AS s
          JOIN albums AS ab ON s.album_id = ab.id
          JOIN artists AS at ON s.artist_id = at.id
          WHERE at.handle = $1`,
      [handle]
    );

    artist.albums = albumRes.rows;
    artist.songs = songRes.rows;

    return artist;
  }

  //   /** Delete given artist from database; returns undefined.
  //    *
  //    * Throws NotFoundError if artist not found.
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

module.exports = Artist;
