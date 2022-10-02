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

/************************************** POST /playlists */

describe('POST /playlists', function () {
  const newPlaylist = {
    name: 'New',
    username: 'routestestuser',
    description: 'create new playlist test',
    image: 'http://new.img'
  };

  test('works', async function () {
    const resp = await request(app).post('/playlists').send(newPlaylist);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      playlist: newPlaylist
    });
  });

  test('bad request with missing data', async function () {
    const resp = await request(app).post('/playlists').send({
      name: 'new'
    });
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request with invalid data', async function () {
    const resp = await request(app).post('/playlists').send({
      name: 999,
      username: 'routestestuser',
      description:
        'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt',
      image: 'http://new.img'
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************ POST /playlists/:playlistID/songs/:songKey */

describe('addToPlaylist', function () {
  test('works', async function () {
    const resp = await request(app).post('/playlists/1/songs/3');
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ song: { playlist_id: 1, song_key: 3 } });
  });
});

/************************************** GET /playlists */

describe('GET /playlists', function () {
  test('works', async function () {
    const resp = await request(app).get('/playlists');
    expect(resp.body).toEqual({
      playlists: [
        {
          id: 1,
          name: 'RoutesPlaylist1',
          handle: 'routesplaylist1',
          username: 'routestestuser',
          description: 'testing RoutesPlaylist1',
          created_at: expect.any(String),
          image: 'http://p1.img'
        },
        {
          id: 2,
          name: 'RoutesPlaylist2',
          handle: 'routesplaylist2',
          username: 'routestestuser',
          description: 'testing RoutesPlaylist2',
          created_at: expect.any(String),
          image: 'http://p2.img'
        },
        {
          id: 3,
          name: 'RoutesPlaylist3',
          handle: 'routesplaylist3',
          username: 'routestestuser',
          created_at: expect.any(String),
          description: 'testing RoutesPlaylist3',
          image: 'http://p3.img'
        }
      ]
    });
  });
});

/************************************** GET /playlists/:handle */

describe('GET /playlists/:handle', function () {
  test('works', async function () {
    const resp = await request(app).get(`/playlists/routesplaylist1`);
    expect(resp.body).toEqual({
      playlist: {
        id: expect.any(Number),
        name: 'RoutesPlaylist1',
        handle: 'routesplaylist1',
        username: 'routestestuser',
        description: 'testing RoutesPlaylist1',
        created_at: expect.any(String),
        image: 'http://p1.img',
        songs: [
          {
            key: 1,
            id: 's1',
            name: 'Song1',
            duration_ms: 200000,
            explicit: false,
            added_at: expect.any(String),
            image: 'http://ab1.img',
            artist_name: 'Artist1',
            album_name: 'Album1',
            album_release_date: '2022-08-31'
          },
          {
            key: 2,
            id: 's2',
            name: 'Song2',
            duration_ms: 200000,
            explicit: false,
            added_at: expect.any(String),
            image: 'http://ab1.img',
            artist_name: 'Artist1',
            album_name: 'Album1',
            album_release_date: '2022-08-31'
          }
        ],
        user: {
          display_name: 'TestUser',
          image: 'http://test.img',
          profile_url: 'routestestuser.com'
        }
      }
    });
  });

  test('works: playlist w/o songs', async function () {
    const resp = await request(app).get(`/playlists/routesplaylist3`);
    expect(resp.body).toEqual({
      playlist: {
        id: 3,
        name: 'RoutesPlaylist3',
        handle: 'routesplaylist3',
        username: 'routestestuser',
        created_at: expect.any(String),
        description: 'testing RoutesPlaylist3',
        image: 'http://p3.img',
        songs: [],
        user: {
          display_name: 'TestUser',
          image: 'http://test.img',
          profile_url: 'routestestuser.com'
        }
      }
    });
  });

  test('not found for no such playlist', async function () {
    const resp = await request(app).get(`/playlists/nope`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /playlists/:handle */

describe('PATCH /playlists/:handle', function () {
  test('works', async function () {
    const resp = await request(app).patch(`/playlists/routesplaylist1`).send({
      name: 'RoutesPlaylist1 New'
    });
    expect(resp.body).toEqual({
      playlist: {
        name: 'RoutesPlaylist1 New',
        handle: 'routesplaylist1',
        description: 'testing RoutesPlaylist1',
        image: 'http://p1.img'
      }
    });
  });

  test('not found on no such playlist', async function () {
    const resp = await request(app).patch(`/playlists/nope`).send({
      name: 'new nope'
    });
    expect(resp.statusCode).toEqual(404);
  });

  test('bad request on owner change attempt', async function () {
    const resp = await request(app).patch(`/playlists/routesplaylist1`).send({
      username: 'notowner'
    });
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request on invalid data', async function () {
    const resp = await request(app).patch(`/playlists/routesplaylist1`).send({
      logoUrl: 'not-a-url'
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/******************************** DELETE /playlists/:playlistId/song/:songKey */

describe('DELETE /playlists/:playlistId/song/:songKey', function () {
  test('works: delete from playlist', async function () {
    const resp = await request(app).delete(`/playlists/1/song/1`);
    expect(resp.body).toEqual({ deleted: '1' });
    expect(resp.statusCode).toEqual(200);
  });

  test('bad request on invalid data', async function () {
    const resp = await request(app).delete(`/playlists/1/song/00`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** DELETE /playlists/:id */

describe('DELETE /playlists/:id', function () {
  test('works', async function () {
    const resp = await request(app).delete(`/playlists/1`);
    expect(resp.body).toEqual({ deleted: '1' });
  });

  test('not found for no such playlist', async function () {
    const resp = await request(app).delete(`/playlists/0`);
    expect(resp.statusCode).toEqual(404);
  });
});
