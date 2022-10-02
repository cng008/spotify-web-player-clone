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

/************************************** POST /songs */

describe('POST /songs', function () {
  test('works', async function () {
    const resp = await request(app).post(`/songs`).send({
      id: 's5',
      name: 'Song5',
      duration_ms: 200000,
      explicit: false,
      artist_id: 'at1',
      album_id: 'ab1',
      image: 'http://s4.img'
    });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      song: {
        key: expect.any(Number),
        id: 's5',
        name: 'Song5',
        duration_ms: 200000,
        explicit: false,
        artist_id: 'at1',
        album_id: 'ab1',
        image: 'http://s4.img'
      }
    });
  });

  test('bad request with missing data', async function () {
    const resp = await request(app).post(`/songs`).send({
      name: 'Song5'
    });
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request with invalid data', async function () {
    const resp = await request(app).post(`/songs`).send({
      id: 's5',
      name: 'Song5',
      duration_ms: 'not-a-number',
      explicit: 'not-bool',
      artist_id: 1,
      album_id: 1,
      image: 'http://s4.img'
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /songs */

describe('GET /songs', function () {
  test('works: song count', async function () {
    const resp = await request(app).get(`/songs`);
    expect(resp.body).toEqual({
      count: { total_songs: '4' }
    });
  });
});

/************************************** GET /songs/:id */

describe('GET /songs/:key', function () {
  test('works', async function () {
    const resp = await request(app).get('/songs/1');
    expect(resp.body).toEqual({
      song: {
        key: 1,
        id: 's1',
        name: 'Song1',
        duration_ms: 200000,
        explicit: false,
        added_at: expect.any(String),
        artist_id: 'at1',
        album_id: 'ab1',
        image: 'http://s1.img'
      }
    });
  });

  test('not found for no such song', async function () {
    const resp = await request(app).get(`/songs/0`);
    expect(resp.statusCode).toEqual(404);
  });
});
