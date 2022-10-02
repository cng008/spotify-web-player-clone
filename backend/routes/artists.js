'use strict';

/** Routes for songs. */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
// const { ensureLoggedIn } = require('../middleware/auth');
const Artist = require('../models/artist');

const artistNew = require('../schemas/artistNew.json');
const artistSearch = require('../schemas/artistSearch.json');

const router = express.Router({ mergeParams: true });

/** POST / { artist } => { artist }
 *
 * Artist should be { name, image }
 *
 * Returns { id, name, handle, image }
 *
 * Authorization required: none
 */

router.post('/', async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, artistNew);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const artist = await Artist.add(req.body);
    return res.status(201).json({ artist });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { artists: [ { id, name, handle, image }, ...] }
 *
 * Can provide search filter in query:
 * - name (will find case-insensitive, partial matches)

 * Authorization required: none
 */

router.get('/', async function (req, res, next) {
  const q = req.query;
  try {
    const validator = jsonschema.validate(q, artistSearch);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const artists = await Artist.findAll(q);
    return res.json({ artists });
  } catch (err) {
    return next(err);
  }
});

/** GET /[artistId] => { artist }
 *
 * Returns { id, name, handle, image }
 *   where albums is { id, name, handle, artist_id, release_date, image }
 *   where songs is { id, name, handle, duration_ms, date_added, artist_id, album_id, image }
 *
 * Authorization required: none
 */

router.get('/:id', async function (req, res, next) {
  try {
    const artist = await Artist.get(req.params.id);
    return res.json({ artist });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: none
 */

// router.delete('/:handle', async function (req, res, next) {
//   try {
//     await Artist.remove(req.params.handle);
//     return res.json({ deleted: +req.params.handle });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
