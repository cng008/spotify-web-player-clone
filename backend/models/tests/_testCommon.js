const db = require('../../db.js');

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query('DELETE FROM album_songs');
  await db.query('DELETE FROM artist_songs');
  await db.query('DELETE FROM playlist_songs');
  await db.query('DELETE FROM songs');
  await db.query('DELETE FROM albums');
  await db.query('DELETE FROM artists');
  await db.query('DELETE FROM playlists');
  await db.query('DELETE FROM users');
  // fixes songs and playlists primary keys from not restarting
  await db.query('ALTER SEQUENCE songs_key_seq RESTART');
  await db.query('ALTER SEQUENCE playlists_id_seq RESTART');

  await db.query(`
  INSERT INTO users(username, display_name, image, profile_url)
  VALUES ('modeltestuser', 'TestUser', 'http://test.img', 'modeltestuser.com')`);

  await db.query(`
    INSERT INTO playlists (name, handle, username, description, created_at, image)
    VALUES ('Playlist1', 'playlist1', 'modeltestuser', 'testing', '2022-09-28 03:31:03 PM', 'http://p1.img'),
           ('Playlist2', 'playlist2', 'modeltestuser', 'testing', '2022-09-28 03:31:03 PM', 'http://p2.img'),
           ('Playlist3', 'playlist3', 'modeltestuser', 'testing', '2022-09-28 03:31:03 PM', 'http://p3.img')`);

  await db.query(`
    INSERT INTO artists(id, name, handle, image)
    VALUES ('at1', 'Artist1', 'artist1', 'http://at1.img'),
          ('at2', 'Artist2', 'artist2', 'http://at2.img')`);

  await db.query(`
    INSERT INTO albums(id, name, handle, artist_id, release_date, image)
    VALUES ('ab1', 'Album1', 'album1', 'at1', '2022-08-31', 'http://ab1.img'),
          ('ab2', 'Album2', 'album2', 'at2', '2022-08-31', 'http://ab2.img')`);

  await db.query(`
    INSERT INTO songs (id, name, duration_ms, explicit, added_at, artist_id, album_id, image)
    VALUES ('s1', 'Song1', '200000', 'false', '2022-09-28 03:31:03 PM', 'at1', 'ab1', 'http://s1.img'),
           ('s2', 'Song2', '200000', 'false', '2022-09-28 03:31:03 PM', 'at1', 'ab1', 'http://s2.img'),
           ('s3', 'Song3', '200000', 'false', '2022-09-28 03:31:03 PM', 'at2', 'ab2', 'http://s3.img'),
           ('s4', 'Song4', '200000', 'false', '2022-09-28 03:31:03 PM', 'at2', 'ab2', 'http://s4.img')`);

  // await db.query(`
  //   INSERT INTO artist_songs(artist_id, song_key)
  //   VALUES ('at1', '1'),
  //           ('at1', '2'),
  //           ('at2', '3'),
  //           ('at2', '4')`);

  // await db.query(`
  //   INSERT INTO album_songs(album_id, song_key)
  //   VALUES ('ab1', '1'),
  //           ('ab1', '2'),
  //           ('ab2', '3'),
  //           ('ab2', '4')`);

  await db.query(`
    INSERT INTO playlist_songs(playlist_id, song_key)
    VALUES ('1', '1'),
            ('1', '2'),
            ('2', '3'),
            ('2', '4'),
            ('2', '1')`);
}

/** BEGIN initiates a transaction block
 * all statements after a BEGIN command will be executed in a single transaction until an explicit COMMIT or ROLLBACK is given
 * https://www.postgresql.org/docs/current/sql-begin.html
 */
async function commonBeforeEach() {
  jest.resetAllMocks();
  await db.query('BEGIN');
}

/** The ROLLBACK command can only be used to undo transactions since the last COMMIT or ROLLBACK command was issued.
 * https://www.tutorialdba.com/p/postgresql-rollback.html
 */
async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
};
