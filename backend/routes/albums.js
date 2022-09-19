'use strict';

/** Routes for songs. */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const { ensureLoggedIn } = require('../middleware/auth');
const Album = require('../models/Album');

const albumNew = require('../schemas/albumNew.json');
const albumSearch = require('../schemas/albumSearch.json');

const router = express.Router({ mergeParams: true });

/** POST / { album } => { album }
 *
 * Album should be { name, image }
 *
 * Returns { id, name, handle, image }
 *
 * Authorization required: is logged in
 */

router.post('/', ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, albumNew);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const album = await Album.add(req.body);
    return res.status(201).json({ album });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { albums: [ { id, name, handle, image }, ...] }
 *
 * Can provide search filter in query:
 * - name (will find case-insensitive, partial matches)

 * Authorization required: none
 */

router.get('/', async function (req, res, next) {
  const q = req.query;
  try {
    const validator = jsonschema.validate(q, albumSearch);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const albums = await Album.findAll(q);
    return res.json({ albums });
  } catch (err) {
    return next(err);
  }
});

/** GET /[albumId] => { album }
 *
 * Returns { id, name, handle, duration, date_added, artist_id, album_id, image }
 *   where album is { id, name, handle, artist_id, release_year, image }
 *   where artist is { id, name, handle, image }
 *
 * Authorization required: none
 */

router.get('/:handle', async function (req, res, next) {
  try {
    const album = await Album.get(req.params.handle);
    return res.json({ album });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization required: admin
 */

// router.delete('/:handle', async function (req, res, next) {
//   try {
//     await Album.remove(req.params.handle);
//     return res.json({ deleted: +req.params.handle });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
