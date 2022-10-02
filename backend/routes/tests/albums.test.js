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

/************************************** POST /albums */

describe('POST /albums', function () {
  test('works', async function () {
    const resp = await request(app).post(`/albums`).send({
      id: 'ab3',
      name: 'Album3',
      artist_id: 'at1',
      release_date: '2022-08-31',
      image: 'http://ab3.img'
    });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      album: {
        id: 'ab3',
        name: 'Album3',
        artist_id: 'at1',
        release_date: '2022-08-31',
        image: 'http://ab3.img'
      }
    });
  });

  test('bad request with missing data', async function () {
    const resp = await request(app).post(`/albums`).send({
      name: 'Album3'
    });
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request with invalid data', async function () {
    const resp = await request(app).post(`/albums`).send({
      id: 123,
      name: 'Album3',
      artist_id: 1,
      release_date: '2022-08-31',
      image: 'http://ab3.img'
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /albums */

describe('GET /albums', function () {
  test('works', async function () {
    const resp = await request(app).get('/albums');
    expect(resp.body).toEqual({
      albums: [
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
      ]
    });
  });
});

/************************************** GET /albums/:id */

describe('GET /albums/:id', function () {
  test('works', async function () {
    const resp = await request(app).get('/albums/ab1');
    expect(resp.body).toEqual({
      album: {
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
      }
    });
  });

  test('not found for no such album', async function () {
    const resp = await request(app).get(`/albums/none`);
    expect(resp.statusCode).toEqual(404);
  });
});
