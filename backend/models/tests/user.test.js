'use strict';

const db = require('../../db.js');
const User = require('../user.js');
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

/************************************** register */

describe('add new user', function () {
  const newUser = {
    username: 'newuser',
    display_name: 'NewUser',
    image: 'http://u2.img',
    profile_url: 'newuser.com'
  };

  test('works', async function () {
    const user = await User.add({
      ...newUser
    });
    expect(user).toEqual(newUser);
    const found = await db.query(
      "SELECT * FROM users WHERE username = 'newuser'"
    );
    expect(found.rows.length).toEqual(1);
  });

  test('do nothing with dup data', async function () {
    await User.add({
      ...newUser
    });
    const result = await User.add({
      ...newUser
    });
    expect(result).toBe(undefined);
  });
});
