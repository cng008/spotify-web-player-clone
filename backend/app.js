/** Express backend for spotify_clone. */

const express = require('express');
const cors = require('cors'); // allow requests from domain

const { NotFoundError } = require('./expressError');

// const { authenticateJWT } = require('./middleware/auth');
const usersRoutes = require('./routes/users');
const playlistsRoutes = require('./routes/playlists');
const songsRoutes = require('./routes/songs');
const artistsRoutes = require('./routes/artists');
const albumsRoutes = require('./routes/albums');

const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// app.use(authenticateJWT);

app.use('/users', usersRoutes);
app.use('/playlists', playlistsRoutes);
app.use('/songs', songsRoutes);
app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);

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
