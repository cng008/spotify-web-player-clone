'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');

/** Related functions for songs. */

class Song {
  /** Add a song (from data)
   * update db (playlists_songs, artist_songs, album_songs, artists, songs, albums)
   *
   * data should be { name, duration_ms, explicit, added_at, artist_id, album_id, image }
   *
   * Returns new song data { id, name, duration_ms, explicit, added_at, artist_id, album_id, image }
   **/

  static async add(data) {
    const duplicateCheck = await db.query(
      `SELECT id
           FROM songs
           WHERE id = $1`,
      [data.id]
    );

    if (duplicateCheck.rows[0]) return;

    const result = await db.query(
      `INSERT INTO songs (id, name, duration_ms, explicit, added_at, artist_id, album_id, image)
           VALUES ($1, $2, $3, $4, now(), $5, $6, $7)
           RETURNING id, 
                    name, 
                    duration_ms, 
                    explicit, 
                    added_at,
                    artist_id,
                    album_id, 
                    image`,
      [
        data.id,
        data.name,
        data.duration_ms,
        data.explicit,
        data.artist_id,
        data.album_id,
        data.image
      ]
    );
    let song = result.rows[0];

    return song;
  }

  /** Find all songs (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ id, name, duration_ms, explicit, added_at, artist_id, album_id, image }, ...]
   *   where album is { id, name, artist_id, release_date, image }
   *   where artist is { id, name, image }
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT s.id, s.name, s.duration_ms, s.explicit, s.added_at, at.name AS "artist_name", ab.name AS "album_name", ab.release_date AS "album_release_date", s.image
                 FROM songs AS s
                   JOIN albums AS ab ON s.album_id = ab.id
                   JOIN artist_songs AS ats ON s.id = ats.song_id
                   JOIN artists AS at ON ats.artist_id = at.id`;
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

    query += ' ORDER BY added_at DESC';
    const songsRes = await db.query(query, queryValues);
    return songsRes.rows;
  }

  //   /** Given a song id, return data about song and start playing audio.
  //    *
  //    * Returns { id, name, duration_ms, explicit, added_at, artist_id, album_id, image }
  //    *   where album is { id, name, artist_id, release_date, image }
  //    *   where artist is { id, name, image }
  //    *
  //    * Throws NotFoundError if not found.
  //    **/

  static async get(id) {
    const songRes = await db.query(
      `SELECT id, name, duration_ms, explicit, added_at, artist_id, album_id, image
        FROM songs
        WHERE id = $1`,
      [id]
    );

    const song = songRes.rows[0];

    if (!song) throw new NotFoundError(`No song: ${id}`);

    const albumRes = await db.query(
      `SELECT ab.id, ab.name, ab.artist_id, ab.release_date, ab.image
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

  static async remove(playlistId, songId) {
    const result = await db.query(
      `DELETE
           FROM playlist_songs
           WHERE playlist_id = $1 AND song_id = $2
           RETURNING id`,
      [playlistId, songId]
    );
    const song = result.rows[0];

    if (!song) throw new NotFoundError(`No song: ${id}`);
  }
}

module.exports = Song;
