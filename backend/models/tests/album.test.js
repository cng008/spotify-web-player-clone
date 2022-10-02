'use strict';

const db = require('../../db.js');
const { NotFoundError } = require('../../expressError');
const Album = require('../album.js');
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
  const newAlbum = {
    id: 'ab3',
    name: 'Album3',
    artist_id: 'at1',
    release_date: '2022-08-31',
    image: 'http://ab3.img'
  };

  test('works', async function () {
    const album = await Album.add(newAlbum);
    expect(album).toEqual({
      ...newAlbum
    });

    const result = await db.query(
      `SELECT id, name, artist_id, release_date, image
      FROM albums
      WHERE id = 'ab3'`
    );
    expect(result.rows).toEqual([{ ...newAlbum }]);
  });
});

/************************************** findAll */

describe('findAll', function () {
  test('works: all', async function () {
    const albums = await Album.findAll();
    expect(albums).toEqual([
      {
        id: 'ab1',
        name: 'Album1',
        handle: 'album1',
        artist_id: 'at1',
        release_date: '2022-08-31',
        image: 'http://ab1.img'
      },
      {
        id: 'ab2',
        name: 'Album2',
        handle: 'album2',
        artist_id: 'at2',
        release_date: '2022-08-31',
        image: 'http://ab2.img'
      }
    ]);
  });
});

/************************************** get */

describe('get', function () {
  test('works', async function () {
    const album = await Album.get('ab1');
    expect(album).toEqual({
      id: 'ab1',
      name: 'Album1',
      artist_id: 'at1',
      release_date: '2022-08-31',
      image: 'http://ab1.img',
      artists: [{ id: 'at1', image: 'http://at1.img', name: 'Artist1' }],
      songs: [
        {
          key: 1,
          id: 's1',
          name: 'Song1',
          duration_ms: 200000,
          explicit: false,
          added_at: expect.any(String),
          artist_id: 'at1',
          album_id: 'ab1',
          image: 'http://s1.img'
        },
        {
          key: 2,
          id: 's2',
          name: 'Song2',
          duration_ms: 200000,
          explicit: false,
          added_at: expect.any(String),
          artist_id: 'at1',
          album_id: 'ab1',
          image: 'http://s2.img'
        }
      ]
    });
  });

  test('not found if no such album', async function () {
    try {
      await Album.get('none');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
