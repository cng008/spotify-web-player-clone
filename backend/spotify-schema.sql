-- from the terminal run:
-- psql < spotify-schema.sql
-- psql spotify-schema

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  image TEXT,
  profile_url TEXT NOT NULL
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name TEXT,
  handle TEXT,
  username TEXT REFERENCES users (username),
  description TEXT,
  created_at timestamp,
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
  artist_id TEXT REFERENCES artists,
  release_date TEXT,
  image TEXT
);

CREATE TABLE songs (
  id TEXT PRIMARY KEY,
  name TEXT,
  duration_ms INTEGER,
  explicit BOOLEAN,
  added_at TEXT,
  artist_id TEXT REFERENCES artists,
  album_id TEXT REFERENCES albums,
  image TEXT
);

CREATE TABLE playlist_songs (
  playlist_id INTEGER REFERENCES playlists,
  song_id TEXT REFERENCES songs
);

CREATE TABLE album_songs (
  album_id TEXT REFERENCES albums,
  song_id TEXT REFERENCES songs
);

CREATE TABLE artist_songs (
  artist_id TEXT REFERENCES artists,
  song_id TEXT REFERENCES songs
);