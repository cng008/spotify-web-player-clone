'use strict';

const db = require('../../db.js');
const User = require('../../models/user');
const Playlist = require('../../models/playlist');
const Artist = require('../../models/artist');
const Album = require('../../models/album');
const Song = require('../../models/song');

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query('DELETE FROM playlist_songs');
  await db.query('DELETE FROM playlists');
  await db.query('DELETE FROM songs');
  await db.query('DELETE FROM albums');
  await db.query('DELETE FROM artists');
  await db.query('DELETE FROM users');
  // fixes songs and playlists primary keys from not restarting
  await db.query('ALTER SEQUENCE songs_key_seq RESTART');
  await db.query('ALTER SEQUENCE playlists_id_seq RESTART');

  await User.add({
    username: 'routestestuser',
    display_name: 'TestUser',
    image: 'http://test.img',
    profile_url: 'routestestuser.com'
  });

  await Playlist.create({
    name: 'RoutesPlaylist1',
    username: 'routestestuser',
    description: 'testing',
    image: 'http://p1.img'
  });
  await Playlist.create({
    name: 'RoutesPlaylist2',
    username: 'routestestuser',
    description: 'testing',
    image: 'http://p2.img'
  });
  await Playlist.create({
    name: 'RoutesPlaylist3',
    username: 'routestestuser',
    description: 'testing',
    image: 'http://p3.img'
  });

  await Artist.add({
    id: 'at1',
    name: 'Artist1',
    handle: 'artist1',
    image: 'http://at1.img'
  });
  await Artist.add({
    id: 'at2',
    name: 'Artist2',
    handle: 'artist2',
    image: 'http://at2.img'
  });

  await Album.add({
    id: 'ab1',
    name: 'Album1',
    artist_id: 'at1',
    release_date: '2022-08-31',
    image: 'http://ab1.img'
  });
  await Album.add({
    id: 'ab2',
    name: 'Album2',
    artist_id: 'at2',
    release_date: '2022-08-31',
    image: 'http://ab2.img'
  });

  await Song.add({
    id: 's1',
    name: 'Song1',
    duration_ms: 200000,
    explicit: false,
    artist_id: 'at1',
    album_id: 'ab1',
    image: 'http://s1.img'
  });
  await Song.add({
    id: 's2',
    name: 'Song2',
    duration_ms: 200000,
    explicit: false,
    artist_id: 'at1',
    album_id: 'ab1',
    image: 'http://s2.img'
  });
  await Song.add({
    id: 's3',
    name: 'Song3',
    duration_ms: 200000,
    explicit: false,
    artist_id: 'at2',
    album_id: 'ab2',
    image: 'http://s3.img'
  });
  await Song.add({
    id: 's4',
    name: 'Song4',
    duration_ms: 200000,
    explicit: false,
    artist_id: 'at2',
    album_id: 'ab2',
    image: 'http://s4.img'
  });

  await Playlist.addToPlaylist(1, 1);
  await Playlist.addToPlaylist(1, 2);
  await Playlist.addToPlaylist(2, 3);
  await Playlist.addToPlaylist(2, 4);
  await Playlist.addToPlaylist(2, 1);
}

async function commonBeforeEach() {
  await db.query('BEGIN');
}

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
