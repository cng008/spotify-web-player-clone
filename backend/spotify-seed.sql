-- test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'christien@christienng.com');

INSERT INTO playlists (name, user_id, created_at, image)
VALUES ('Workout', 1, '2022-09-02 04:05:06','https://images.unsplash.com/photo-1558017487-06bf9f82613a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1070&q=80'),
        ('Study', 1, '2022-09-01 14:25:16','https://www.billboard.com/wp-content/uploads/media/Tame-Impala-Currents-2017-billboard-1240.jpg?w=600');

INSERT INTO artists (name, image)
VALUES ('Tyler the Creator', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Tyler_the_Creator_2022_cropped.png/220px-Tyler_the_Creator_2022_cropped.png'),
        ('Tame Impala', 'https://pbs.twimg.com/profile_images/1188863090646904832/2fi9Reuh_400x400.jpg');

INSERT INTO albums (name, artist_id, release_year, image)
VALUES ('Flower Boy', 1, 2017, 'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/bebllwzjpsujz9ffwp6s/tyler-the-creator-scum-fuck-flower-boy-cover?fimg-ssr-default'),
        ('Currents', 2, 2015, 'https://www.billboard.com/wp-content/uploads/media/Tame-Impala-Currents-2017-billboard-1240.jpg?w=600');

INSERT INTO songs (title, duration, artist_id, album_id,image)
VALUES ('Sometimes...', '0:36', 1, 1, 'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/bebllwzjpsujz9ffwp6s/tyler-the-creator-scum-fuck-flower-boy-cover?fimg-ssr-default'),
        ('The Less I Know The Better', '3:36', 2, 2, 'https://www.billboard.com/wp-content/uploads/media/Tame-Impala-Currents-2017-billboard-1240.jpg?w=600');

INSERT INTO artist_songs (artist_id, song_id)
VALUES (1,1),
        (2,2);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1,1),
        (2,2);

INSERT INTO follows (user_following_id, artist_being_followed_id)
VALUES (1,1),
        (1,2);

