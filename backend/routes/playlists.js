'use strict';

/** Routes for playlists. */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const { ensureLoggedIn } = require('../middleware/auth');
const Playlist = require('../models/playlist');

const playlistNew = require('../schemas/playlistNew.json');
const playlistUpdate = require('../schemas/playlistUpdate.json');
const playlistSearch = require('../schemas/playlistSearch.json');

const router = new express.Router();

/** POST / { playlist } =>  { playlist }
 *
 * playlist should be { name, userId, description, createdAt, image }
 *
 * Returns { name, userId, description, createdAt, image }
 *
 * Authorization required: ensureLoggedIn
 */

router.post('/', ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, playlistNew);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const playlist = await Playlist.create(req.body);
    return res.status(201).json({ playlist });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { playlists: [ { name, userId, description, createdAt, image }, ...] }
 *
 * Can filter on provided search filters:
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get('/', async function (req, res, next) {
  const q = req.query;

  try {
    const validator = jsonschema.validate(q, playlistSearch);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const playlists = await Playlist.findAll(q);
    return res.json({ playlists });
  } catch (err) {
    return next(err);
  }
});

/** GET /[handle]  =>  { playlist }
 *
 *  Playlist is { name, userId, description, createdAt, image }
 *   where songs is [{ id, title, duration, dataAdded, artistId, albumId, image }, ...]
 *
 * Authorization required: none
 */

router.get('/:handle', async function (req, res, next) {
  try {
    const playlist = await Playlist.get(req.params.handle);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { playlist }
 *
 * Patches playlist data.
 *
 * fields can be: { name, description, image }
 *
 * Returns { name, userId, description, createdAt, image }
 *
 * Authorization required: admin
 */

router.patch('/:handle', async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, playlistUpdate);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const playlist = await Playlist.update(req.params.handle, req.body);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: admin
 */

router.delete('/:handle', async function (req, res, next) {
  try {
    await Playlist.remove(req.params.handle);
    return res.json({ deleted: req.params.handle });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
