'use strict';

const request = require('supertest');

const app = require('../../app');

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

/************************************** POST /artists */

describe('POST /artists', function () {
  test('works', async function () {
    const resp = await request(app).post(`/artists`).send({
      id: 'at3',
      name: 'Artist3',
      handle: 'artist3',
      image: 'http://at3.img'
    });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      artist: {
        id: 'at3',
        name: 'Artist3',
        handle: 'artist3',
        image: 'http://at3.img'
      }
    });
  });

  test('bad request with missing data', async function () {
    const resp = await request(app).post(`/artists`).send({
      name: 'Artist3'
    });
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request with invalid data', async function () {
    const resp = await request(app).post(`/artists`).send({
      id: 123,
      name: 'Artist3',
      handle: 'artist3',
      image: 'http://at3.img'
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /artists */

describe('GET /artists', function () {
  test('works', async function () {
    const resp = await request(app).get('/artists');
    expect(resp.body).toEqual({
      artists: [
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
      ]
    });
  });
});

/************************************** GET /artists/:id */

describe('GET /artists/:id', function () {
  test('works', async function () {
    const resp = await request(app).get('/artists/at1');
    expect(resp.body).toEqual({
      artist: {
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
            release_date: '2022-08-31',
            image: 'http://ab1.img'
          }
        ],
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
      }
    });
  });

  test('not found for no such artist', async function () {
    const resp = await request(app).get(`/artists/none`);
    expect(resp.statusCode).toEqual(404);
  });
});
