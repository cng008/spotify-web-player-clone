'use strict';

/** Routes for songs. */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const { ensureLoggedIn } = require('../middleware/auth');
const Song = require('../models/song');

const songNew = require('../schemas/songNew.json');
const songSearch = require('../schemas/songSearch.json');

const router = express.Router({ mergeParams: true });

/** POST / { song } => { song }
 *
 * Song should be { name, duration_ms, artist_id, album_id, image }
 *
 * Returns { id, name, duration_ms, artist_id, album_id, image }
 *
 * Authorization required: admin
 */

router.post('/', async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, songNew);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const song = await Song.add(req.body);
    return res.status(201).json({ song });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { songs: [ { id, name, duration_ms, artist_id, album_id, image }, ...] }
 *
 * Can provide search filter in query:
 * - name (will find case-insensitive, partial matches)

 * Authorization required: none
 */

router.get('/', async function (req, res, next) {
  const q = req.query;
  try {
    const validator = jsonschema.validate(q, songSearch);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const songs = await Song.findAll(q);
    return res.json({ songs });
  } catch (err) {
    return next(err);
  }
});

/** GET /[songId] => { song }
 *
 * Returns { id, name, duration_ms, artist_id, album_id, image }
 *   where album is { id, name, artist_id, release_date, image }
 *
 * Authorization required: none
 */

router.get('/:id', async function (req, res, next) {
  try {
    const song = await Song.get(req.params.id);
    return res.json({ song });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete('/:id', async function (req, res, next) {
  try {
    await Song.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
