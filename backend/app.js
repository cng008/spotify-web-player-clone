/** Express backend for spotify_clone. */

const express = require('express');

const { NotFoundError } = require('./expressError');

const { authenticateJWT } = require('./middleware/auth');
const playlistsRoutes = require('./routes/playlists');
const songsRoutes = require('./routes/songs');

const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(authenticateJWT);

app.use('/playlists', playlistsRoutes);
app.use('/songs', songsRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

module.exports = app;
