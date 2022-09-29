'use strict';

const db = require('../db');

/** Related functions for users. */

class User {
  /** Register user with data.
   *
   * Returns { username, display_name, image, profile_url }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async add(data) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [data.username]
    );

    if (duplicateCheck.rows[0]) return;

    const result = await db.query(
      `INSERT INTO users
           (username, display_name, image, profile_url)
           VALUES ($1, $2, $3, $4)
           RETURNING username, display_name, image, profile_url`,
      [data.username, data.display_name, data.image, data.profile_url]
    );

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
