'use strict';

/** Routes for playlists. */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
// const { ensureLoggedIn } = require('../middleware/auth');
const Playlist = require('../models/playlist');

const playlistNew = require('../schemas/playlistNew.json');
const playlistUpdate = require('../schemas/playlistUpdate.json');
const playlistSearch = require('../schemas/playlistSearch.json');

const router = new express.Router();

/** POST / { playlist } =>  { playlist }
 *
 * Creates a new playlist.
 *
 * playlist should be { name, userId, description, createdAt, image }
 *
 * Returns { name, handle, username, description, created_at, image }
 *
 * Authorization required: none
 */

router.post('/', async (req, res, next) => {
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

/** POST / { playlist } =>  { playlist }
 *
 * Adds a song to a playlist.
 *
 * Returns { id, name, duration_ms, data_added, artist_id, album_id, image }
 *
 * Authorization required: none
 */

router.post('/:playlistID/songs/:songKey', async (req, res, next) => {
  try {
    const song = await Playlist.addToPlaylist(
      req.params.playlistID,
      req.params.songKey
    );
    return res.status(201).json({ song });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *
 * Retrieves a list of playlists.
 *
 * Returns { playlists: [ { id, name, handle, username, description, created_at, image }, ...] },
 *            {user: {display_name, image, profile_url}},
 *            {songs: [{key, id, name, duration_ms, data_added, artist_id, album_id, image}, ...]}
 *
 * Authorization required: none
 */

router.get('/', async (req, res, next) => {
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
 *  Playlist is { name, handle, username, description, created_at, image }
 *   where songs is [{ key, id, name, duration_ms, data_added, artist_id, album_id, image }, ...]
 *
 * Authorization required: none
 */

router.get('/:handle', async (req, res, next) => {
  try {
    const playlist = await Playlist.get(req.params.handle);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { playlist }
 *
 * Updates playlist data.
 *
 * fields can be: { name, description, image }
 *
 * Returns { name, handle, username, description, created_at, image }
 *
 * Authorization required: none
 */

router.patch('/:handle', async (req, res, next) => {
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

/** DELETE SONG FROM PLAYLIST /[ playlistId,songKey ]  =>  { deleted: songKey }
 *
 * Authorization: none
 */

router.delete('/:playlistId/song/:songKey', async (req, res, next) => {
  try {
    await Playlist.removeSong(req.params.playlistId, req.params.songKey);
    return res.json({ deleted: req.params.songKey });
  } catch (err) {
    return next(err);
  }
});

/** DELETE PLAYLIST /[id]  =>  { deleted: id }
 *
 * Authorization: none
 */

router.delete('/:id', async (req, res, next) => {
  try {
    await Playlist.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
