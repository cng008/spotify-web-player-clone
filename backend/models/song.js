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
   * Returns new song data { key, id, name, duration_ms, explicit, added_at, artist_id, album_id, image }
   **/

  static async add(data) {
    // const duplicateCheck = await db.query(
    //   `SELECT id
    //        FROM songs
    //        WHERE id = $1`,
    //   [data.id]
    // );

    // if (duplicateCheck.rows[0]) return;

    // reset id sequence in db
    await db.query(
      `SELECT SETVAL(
          'songs_key_seq',
          (SELECT (MAX("key")) FROM "songs"),
          TRUE)`
    );

    const result = await db.query(
      `INSERT INTO songs (id, name, duration_ms, explicit, added_at, artist_id, album_id, image)
           VALUES ($1, $2, $3, $4, now(), $5, $6, $7)
           RETURNING key,
                    id, 
                    name, 
                    duration_ms, 
                    explicit, 
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
   * Returns [{ key, id, name, duration_ms, explicit, added_at, artist_id, album_id, image }, ...]
   *   where album is { id, name, artist_id, release_date, image }
   *   where artist is { id, name, image }
   * */

  // static async findAll() {
  //   let query = `SELECT s.key, s.id, s.name, s.duration_ms, s.explicit, s.added_at, at.name AS "artist_name", ab.name AS "album_name", ab.release_date AS "album_release_date", s.image
  //                 FROM songs AS s
  //                 JOIN albums AS ab ON s.album_id = ab.id
  //                 JOIN artist_songs AS ats ON s.key = ats.song_key
  //                 JOIN artists AS at ON ats.artist_id = at.id
  //                 ORDER BY added_at DESC`;
  //   const songsRes = await db.query(query);
  //   return songsRes.rows;
  // }

  /** Find all songs (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ key, id, name, duration_ms, explicit, added_at, artist_id, album_id, image }, ...]
   *   where album is { id, name, artist_id, release_date, image }
   *   where artist is { id, name, image }
   * */

  static async getTotalSongs() {
    const count = await db.query(`
        SELECT COUNT(*) AS total_songs
          FROM songs `);
    return count.rows[0];
  }

  //   /** Given a song id, return data about song and start playing audio.
  //    *
  //    * Returns { id, name, duration_ms, explicit, added_at, artist_id, album_id, image }
  //    *   where album is { id, name, artist_id, release_date, image }
  //    *   where artist is { id, name, image }
  //    *
  //    * Throws NotFoundError if not found.
  //    **/

  static async get(key) {
    const songRes = await db.query(
      `SELECT key, id, name, duration_ms, explicit, to_char(added_at, 'yyyy-mm-dd hh:mi:ss AM') AS "added_at", artist_id, album_id, image
        FROM songs
        WHERE key = $1`,
      [key]
    );

    const song = songRes.rows[0];

    if (!song) throw new NotFoundError(`No song: ${key}`);

    const albumRes = await db.query(
      `SELECT ab.id, ab.name, ab.artist_id, ab.release_date, ab.image
        FROM albums AS ab
        JOIN album_songs AS abs ON ab.id = abs.album_id
        JOIN songs AS s ON abs.song_key = s.key
        WHERE ab.id = $1`,
      [song.albumId]
    );

    const artistRes = await db.query(
      `SELECT at.id, at.name, at.image
        FROM artists AS at
        JOIN artist_songs AS ats ON at.id = ats.artist_id
        JOIN songs AS s ON ats.song_key = s.key
        WHERE at.id = $1`,
      [song.artistId]
    );

    song.album = albumRes.rows[0];
    song.artist = artistRes.rows[0];

    return song;
  }
}

module.exports = Song;
