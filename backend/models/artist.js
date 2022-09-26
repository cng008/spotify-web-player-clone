'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');

/** Related functions for artistss. */

class Artist {
  /** Add an artist (from data)
   * update db (id, name, handle, image)
   *
   * data should be { id, name, handle, image }
   *
   * Returns new artist data { id, name, handle, image }
   **/

  static async add(data) {
    const handle = data.name.toLowerCase().split(' ').join('-');

    const duplicateCheck = await db.query(
      `SELECT id
           FROM artists
           WHERE id = $1`,
      [data.id]
    );

    if (duplicateCheck.rows[0]) return;

    const result = await db.query(
      `INSERT INTO artists (id, name, handle, image)
           VALUES ($1, $2, $3, $4)
           RETURNING id, 
                    name,
                    handle,
                    image`,
      [data.id, data.name, handle, data.image]
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
//    *   where albums is { id, name, handle, artist_id, release_date, image }
//    *   where songs is { id, name, duration_ms, explicit, added_at, artist_id, album_id, image }
   * */

  static async findAll() {
    let query = `SELECT id, name, handle, image
                 FROM artists
                 ORDER BY name ASC`;
    const artistsRes = await db.query(query);
    return artistsRes.rows;
  }

  //   /** Given an artist id, return data about artist.
  //    *
  //    * Returns [{ id, name, handle, image }, ...]
  //    *   where artist is { id, name, handle, image }
  //    *   where albums is { id, name, handle, artist_id, release_date, image }
  //    *   where songs is { id, name, duration_ms, added_at, artist_id, album_id, image }
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
      `SELECT ab.id, ab.name, ab.handle, ab.artist_id, ab.release_date, ab.image
        FROM albums AS ab
        JOIN artists AS at ON ab.artist_id = at.id
        WHERE at.handle = $1`,
      [handle]
    );

    const songRes = await db.query(
      `SELECT DISTINCT s.id, s.name, s.duration_ms, s.explicit, s.added_at, s.artist_id, s.album_id, s.image
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
