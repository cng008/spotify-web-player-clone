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

/************************************** POST /users */

describe('POST /users', function () {
  test('works', async function () {
    const resp = await request(app).post('/users').send({
      username: 'u-new',
      display_name: 'NewUser',
      image: 'http://new.img',
      profile_url: 'newusertest.com'
    });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      user: {
        username: 'u-new',
        display_name: 'NewUser',
        image: 'http://new.img',
        profile_url: 'newusertest.com'
      }
    });
  });

  test('bad request if missing data', async function () {
    const resp = await request(app).post('/users').send({
      username: 'u-new'
    });
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request if invalid data', async function () {
    const resp = await request(app).post('/users').send({
      username: 1111,
      display_name: 'NewUser',
      image: 'http://new.img',
      profile_url: 'newusertest.com'
    });
    expect(resp.statusCode).toEqual(400);
  });
});
