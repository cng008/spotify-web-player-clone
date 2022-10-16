'use strict';

const db = require('../../db.js');
const { BadRequestError, NotFoundError } = require('../../expressError');
const Playlist = require('../playlist.js');
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

/************************************** create */

describe('create', function () {
  const newPlaylist = {
    name: 'New',
    username: 'modeltestuser',
    description: 'create new playlist test',
    image: 'http://new.img'
  };

  test('works', async function () {
    const playlist = await Playlist.create(newPlaylist);
    expect(playlist).toEqual(newPlaylist);

    const result = await db.query(
      `SELECT name, username, description, image
           FROM playlists
           WHERE handle = 'new'`
    );
    expect(result.rows).toEqual([{ ...newPlaylist }]);
  });

  test('bad request with dupe', async function () {
    try {
      await Playlist.create(newPlaylist);
      await Playlist.create(newPlaylist);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** addToPlaylist */

describe('addToPlaylist', function () {
  test('works', async function () {
    const res = await Playlist.addToPlaylist(1, 3);
    expect(res).toEqual({ playlist_id: 1, song_key: 3 });
  });
});

/************************************** findAll */

describe('findAll', function () {
  test('works: all', async function () {
    const playlists = await Playlist.findAll();
    expect(playlists).toEqual([
      {
        id: 3,
        name: 'Playlist3',
        handle: 'playlist3',
        username: 'modeltestuser',
        description: 'testing',
        created_at: '2022-09-28 03:33:03 PM',
        image: 'http://p3.img'
      },
      {
        id: 2,
        name: 'Playlist2',
        handle: 'playlist2',
        username: 'modeltestuser',
        description: 'testing',
        created_at: '2022-09-28 03:32:03 PM',
        image: 'http://p2.img'
      },
      {
        id: 1,
        name: 'Playlist1',
        handle: 'playlist1',
        username: 'modeltestuser',
        description: 'testing',
        created_at: '2022-09-28 03:31:03 PM',
        image: 'http://p1.img'
      }
    ]);
  });
});

/************************************** get */

describe('get', function () {
  test('works', async function () {
    const playlist = await Playlist.get('playlist1');
    expect(playlist).toEqual({
      id: 1,
      name: 'Playlist1',
      handle: 'playlist1',
      username: 'modeltestuser',
      description: 'testing',
      created_at: '2022-09-28 03:31:03 PM',
      image: 'http://p1.img',
      user: {
        display_name: 'TestUser',
        image: 'http://test.img',
        profile_url: 'modeltestuser.com'
      },
      songs: [
        {
          key: 1,
          id: 's1',
          name: 'Song1',
          duration_ms: 200000,
          explicit: false,
          added_at: '2022-09-28 04:31:03 PM',
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
          added_at: '2022-09-28 04:31:03 PM',
          image: 'http://ab1.img',
          artist_name: 'Artist1',
          album_name: 'Album1',
          album_release_date: '2022-08-31'
        }
      ]
    });
  });

  test('not found if no such playlist', async function () {
    try {
      await Playlist.get('nope');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe('update', function () {
  const updateData = {
    name: 'update',
    description: 'New Description',
    image: 'http://new.img'
  };

  test('works', async function () {
    const playlist = await Playlist.update('playlist1', updateData);
    expect(playlist).toEqual({
      handle: 'playlist1',
      ...updateData
    });

    const result = await db.query(
      `SELECT name, handle, description, image
           FROM playlists
           WHERE handle = 'playlist1'`
    );
    expect(result.rows).toEqual([
      {
        name: 'update',
        handle: 'playlist1',
        description: 'New Description',
        image: 'http://new.img'
      }
    ]);
  });

  test('works: empty fields', async function () {
    const updateDataSetNulls = {
      name: 'Empty',
      description: '',
      image: ''
    };

    const playlist = await Playlist.update('playlist1', updateDataSetNulls);
    expect(playlist).toEqual({
      handle: 'playlist1',
      ...updateDataSetNulls
    });

    const result = await db.query(
      `SELECT id, name, handle, username, description, to_char(created_at, 'yyyy-mm-dd hh:mi:ss AM') AS "created_at", image
           FROM playlists
           WHERE handle = 'playlist1'`
    );
    expect(result.rows).toEqual([
      {
        id: 1,
        name: 'Empty',
        handle: 'playlist1',
        username: 'modeltestuser',
        description: '',
        created_at: '2022-09-28 03:31:03 PM',
        image: ''
      }
    ]);
  });

  test('not found if no such playlist', async function () {
    try {
      await Playlist.update('nope', updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test('bad request with no data', async function () {
    try {
      await Playlist.update('playlist1', {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** removeSong */

describe('removeSong', function () {
  test('works: delete from playlist', async function () {
    await Playlist.removeSong(1, 1);
    const res = await db.query(
      `SELECT playlist_id, song_key 
        FROM playlist_songs 
        WHERE playlist_id = '1' AND song_key ='1'`
    );
    const songRes = await db.query(
      `SELECT key 
        FROM songs 
        WHERE key ='1'`
    );
    expect(res.rows.length).toEqual(0);
    expect(songRes.rows.length).toEqual(1);
  });

  test('not found if song not in any playlists', async function () {
    try {
      await Playlist.removeSong(1, 0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe('remove', function () {
  test('works', async function () {
    await Playlist.remove(1);
    const res = await db.query("SELECT handle FROM playlists WHERE id='1'");
    expect(res.rows.length).toEqual(0);
  });

  test('not found if no such playlist', async function () {
    try {
      await Playlist.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
