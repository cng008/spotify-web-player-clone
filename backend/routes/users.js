'use strict';

/** Routes for songs. */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
// const { ensureLoggedIn } = require('../middleware/auth');
const User = require('../models/user');

const userNew = require('../schemas/userNew.json');

const router = express.Router({ mergeParams: true });

/** POST / { user } => { user }
 *
 * user should be { username, display_name, image, profile_url }
 *
 * Returns { username, display_name, image, profile_url }
 *
 * Authorization required: none
 */

router.post('/', async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNew);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.add(req.body);
    return res.status(201).json({ user });
  } catch (err) {
    return next(err);
  }
});

/** GET /[userId] => { user }
 *
 * Returns { id, name, handle, duration_ms, date_added, artist_id, user_id, image }
 *   where user is { id, name, handle, artist_id, release_date, image }
 *   where artist is { id, name, handle, image }
 *
 * Authorization required: none
 */

// router.get('/:handle', async function (req, res, next) {
//   try {
//     const user = await user.get(req.params.handle);
//     return res.json({ user });
//   } catch (err) {
//     return next(err);
//   }
// });

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization required: none
 */

// router.delete('/:handle', async function (req, res, next) {
//   try {
//     await user.remove(req.params.handle);
//     return res.json({ deleted: +req.params.handle });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
