'use strict';

const db = require('../db');

/** Related functions for users. */

class User {
  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email }
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

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  // static async get(username) {
  //   const userRes = await db.query(
  //     `SELECT username,
  //                 first_name AS "firstName",
  //                 last_name AS "lastName",
  //                 email
  //          FROM users
  //          WHERE username = $1`,
  //     [username]
  //   );

  //   const user = userRes.rows[0];

  //   if (!user) throw new NotFoundError(`No user: ${username}`);

  //   const userApplicationsRes = await db.query(
  //     `SELECT a.job_id
  //          FROM applications AS a
  //          WHERE a.username = $1`,
  //     [username]
  //   );

  //   user.applications = userApplicationsRes.rows.map(a => a.job_id);
  //   return user;
  // }

  /** Delete given user from database; returns undefined. */
  // static async remove(username) {
  //   let result = await db.query(
  //     `DELETE
  //          FROM users
  //          WHERE username = $1
  //          RETURNING username`,
  //     [username]
  //   );
  //   const user = result.rows[0];

  //   if (!user) throw new NotFoundError(`No user: ${username}`);
  // }
}

module.exports = User;
