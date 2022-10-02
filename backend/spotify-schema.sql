CREATE TABLE users (
  username TEXT PRIMARY KEY,
  display_name TEXT,
  image TEXT,
  profile_url TEXT
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name TEXT,
  handle TEXT,
  username TEXT REFERENCES users ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMP,
  image TEXT
);

CREATE TABLE artists (
  id TEXT PRIMARY KEY,
  name TEXT,
  handle TEXT,
  image TEXT
);

CREATE TABLE albums (
  id TEXT PRIMARY KEY,
  name TEXT,
  handle TEXT,
  artist_id TEXT REFERENCES artists ON DELETE CASCADE,
  release_date TEXT,
  image TEXT
);

CREATE TABLE songs (
  key SERIAL PRIMARY KEY,
  id TEXT,
  name TEXT,
  duration_ms INTEGER,
  explicit BOOLEAN,
  added_at TIMESTAMP,
  artist_id TEXT REFERENCES artists ON DELETE CASCADE,
  album_id TEXT REFERENCES albums ON DELETE CASCADE,
  image TEXT
);

CREATE TABLE playlist_songs (
  playlist_id INTEGER REFERENCES playlists ON DELETE CASCADE,
  song_key INTEGER REFERENCES songs ON DELETE CASCADE
);

CREATE TABLE album_songs (
  song_key INTEGER REFERENCES songs ON DELETE CASCADE,
  album_id TEXT REFERENCES albums ON DELETE CASCADE
);

CREATE TABLE artist_songs (
  song_key INTEGER REFERENCES songs ON DELETE CASCADE,
  artist_id TEXT REFERENCES artists ON DELETE CASCADE
);