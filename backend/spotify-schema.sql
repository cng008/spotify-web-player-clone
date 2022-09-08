-- from the terminal run:
-- psql < spotify-schema.sql
-- psql spotify-schema

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL
);

CREATE TABLE follows (
  user_following_id INTEGER NOT NULL,
  artist_being_followed_id INTEGER NOT NULL
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name TEXT,
  handle TEXT,
  user_id INTEGER,
  description TEXT,
  created_at timestamp,
  image TEXT
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT,
  date_added TEXT,
  artist_id INTEGER NOT NULL,
  album_id INTEGER,
  image TEXT
);

CREATE TABLE playlist_songs (
  playlist_id INTEGER,
  song_id INTEGER NOT NULL
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  artist_id INTEGER NOT NULL,
  release_year INTEGER,
  image TEXT
);

CREATE TABLE album_songs (
  album_id INTEGER,
  song_id INTEGER NOT NULL
);

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT
);

CREATE TABLE artist_songs (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER NOT NULL,
  song_id INTEGER NOT NULL
);

ALTER TABLE follows ADD FOREIGN KEY (artist_being_followed_id) REFERENCES artists (id);

ALTER TABLE follows ADD FOREIGN KEY (user_following_id) REFERENCES users (id);

ALTER TABLE playlists ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE songs ADD FOREIGN KEY (artist_id) REFERENCES artists (id);

ALTER TABLE songs ADD FOREIGN KEY (album_id) REFERENCES albums (id);

ALTER TABLE playlist_songs ADD FOREIGN KEY (playlist_id) REFERENCES playlists (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE playlist_songs ADD FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE albums ADD FOREIGN KEY (artist_id) REFERENCES artists (id);

ALTER TABLE album_songs ADD FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE ON UPDATE CASCADE;;

ALTER TABLE album_songs ADD FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE CASCADE ON UPDATE CASCADE;;

ALTER TABLE artist_songs ADD FOREIGN KEY (artist_id) REFERENCES artists (id) ON DELETE CASCADE ON UPDATE CASCADE;;

ALTER TABLE artist_songs ADD FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE ON UPDATE CASCADE;;
