'use strict';

/** Routes for songs. */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const Song = require('../models/song');

const songNew = require('../schemas/songNew.json');

const router = express.Router({ mergeParams: true });

/** POST / { song } => { song }
 *
 * Song should be { name, duration_ms, artist_id, album_id, image }
 *
 * Returns { key, id, name, duration_ms, artist_id, album_id, image }
 *
 * Authorization required: none
 */

router.post('/', async (req, res, next) => {
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
 *   { songs: [ { key, id, name, duration_ms, artist_id, album_id, image }, ...] }
 *
 * Can provide search filter in query:
 * - name (will find case-insensitive, partial matches)

 * Authorization required: none
 */

// router.get('/', async  (req, res, next)=> {
//   try {
//     const validator = jsonschema.validate(req.body, songSearch);
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

//     const songs = await Song.findAll();
//     return res.json({ songs });
//   } catch (err) {
//     return next(err);
//   }
// });

/** GET /[songId] => { song }
 *
 * Returns { total_songs }
 *
 * Authorization required: none
 */

router.get('/', async (req, res, next) => {
  try {
    const count = await Song.getTotalSongs();
    return res.json({ count });
  } catch (err) {
    return next(err);
  }
});

/** GET /[songId] => { song }
 *
 * Returns { key, id, name, duration_ms, explicit, added_at, artist_id, album_id, image }
 *
 * Authorization required: none
 */

// router.get('/:key', async  (req, res, next)=> {
//   try {
//     const song = await Song.get(req.params.key);
//     return res.json({ song });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
