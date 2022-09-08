-- from the terminal run:
-- psql < spotify.sql

\echo 'Delete and recreate spotify_clone db?'
\prompt 'Return for yes or control-C to cancel > ' foo


DROP DATABASE IF EXISTS  spotify_clone;
CREATE DATABASE spotify_clone;
\c spotify_clone

\i spotify-schema.sql
\i spotify-seed.sql

\echo 'Delete and recreate spotify_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE spotify_test;
CREATE DATABASE spotify_test;
\c spotify_test

\i spotify-schema.sql
