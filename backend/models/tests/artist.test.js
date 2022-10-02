'use strict';

const db = require('../../db.js');
const { NotFoundError } = require('../../expressError');
const Artist = require('../artist.js');
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
  const newArtist = {
    id: 'at3',
    name: 'Artist3',
    handle: 'artist3',
    image: 'http://at3.img'
  };

  test('works', async function () {
    const artist = await Artist.add(newArtist);
    expect(artist).toEqual({
      ...newArtist
    });

    const result = await db.query(
      `SELECT id, name, handle, image
      FROM artists
      WHERE id = 'at3'`
    );
    expect(result.rows).toEqual([{ ...newArtist }]);
  });
});

/************************************** findAll */

describe('findAll', function () {
  test('works: all', async function () {
    const artists = await Artist.findAll();
    expect(artists).toEqual([
      {
        id: 'at1',
        name: 'Artist1',
        handle: 'artist1',
        image: 'http://at1.img'
      },
      {
        id: 'at2',
        name: 'Artist2',
        handle: 'artist2',
        image: 'http://at2.img'
      }
    ]);
  });
});

/************************************** get */

describe('get', function () {
  test('works', async function () {
    const artist = await Artist.get('at1');
    expect(artist).toEqual({
      id: 'at1',
      name: 'Artist1',
      handle: 'artist1',
      image: 'http://at1.img',
      albums: [
        {
          id: 'ab1',
          name: 'Album1',
          handle: 'album1',
          artist_id: 'at1',
          image: 'http://ab1.img',
          release_date: '2022-08-31'
        }
      ],
      songs: [
        {
          key: 1,
          id: 's1',
          name: 'Song1',
          duration_ms: 200000,
          explicit: false,
          added_at: '2022-09-28 03:31:03 PM',
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
          added_at: '2022-09-28 03:31:03 PM',
          artist_id: 'at1',
          album_id: 'ab1',
          image: 'http://s2.img'
        }
      ]
    });
  });

  test('not found if no such artist', async function () {
    try {
      await Artist.get('s0');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
