'use strict';

const db = require('../../db.js');
const { NotFoundError } = require('../../expressError');
const Song = require('../song.js');
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** add */

describe('add', function () {
  const newSong = {
    id: 's5',
    name: 'Song5',
    duration_ms: 200000,
    explicit: false,
    artist_id: 'at1',
    album_id: 'ab1',
    image: 'http://s4.img'
  };

  test('works', async function () {
    const song = await Song.add(newSong);
    expect(song).toEqual({
      ...newSong,
      key: expect.any(Number)
    });

    const result = await db.query(
      `SELECT id, name, duration_ms, explicit, artist_id, album_id, image
      FROM songs
      WHERE id = 's5'`
    );
    expect(result.rows).toEqual([{ ...newSong }]);
  });
});

/*********************************** getTotalSongs */

describe('getTotalSongs', function () {
  test('works', async function () {
    const songs = await Song.getTotalSongs();
    expect(songs).toEqual({
      total_songs: '4'
    });
  });
});

/************************************** get */

describe('get', function () {
  test('works', async function () {
    const song = await Song.get(1);
    expect(song).toEqual({
      key: 1,
      id: 's1',
      name: 'Song1',
      duration_ms: 200000,
      explicit: false,
      added_at: '2022-09-28 04:31:03 PM',
      artist_id: 'at1',
      album_id: 'ab1',
      image: 'http://s1.img'
    });
  });

  test('not found if no such song', async function () {
    try {
      await Song.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
