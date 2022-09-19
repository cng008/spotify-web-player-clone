-- test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'christien@christienng.com');

INSERT INTO playlists (name, handle, user_id, description, created_at, image)
VALUES ('Workout', 'workout', 1, 'A playlist that will pump you up for the gym','2022-09-02 04:05:06','https://images.unsplash.com/photo-1558017487-06bf9f82613a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1070&q=80'),
        ('Study', 'study', 1, 'To help you get some work done','2022-09-01 14:25:16','https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=883&q=80');

INSERT INTO artists (name, handle, image)
VALUES ('Tyler the Creator', 'tyler-the-creator','https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Tyler_the_Creator_2022_cropped.png/220px-Tyler_the_Creator_2022_cropped.png'),
        ('Tame Impala', 'tame-impala','https://pbs.twimg.com/profile_images/1188863090646904832/2fi9Reuh_400x400.jpg'),
        ('Vince Staples', 'vince-staples','https://i1.sndcdn.com/avatars-XjO8ubSPDobu7eGa-f2HAHQ-t500x500.jpg'),
        ('The Black Keys', 'the-black-keys','https://www.billboard.com/wp-content/uploads/media/the-back-keys-press-billboard-650.jpg?w=650');

INSERT INTO albums (name, handle, artist_id, release_year, image)
VALUES ('Flower Boy','flower-boy', 1, 2017, 'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/bebllwzjpsujz9ffwp6s/tyler-the-creator-scum-fuck-flower-boy-cover?fimg-ssr-default'),
        ('Currents','currents', 2, 2015, 'https://www.billboard.com/wp-content/uploads/media/Tame-Impala-Currents-2017-billboard-1240.jpg?w=600'),
        ('Big Fish Theory','big-fish-theory', 3, 2015, 'http://images.genius.com/037801ff09afa2af7c8b9996efb048a8.1000x1000x1.jpg'),
        ('Fever','fever', 4, 2014, 'https://upload.wikimedia.org/wikipedia/en/c/c2/Black_Keys_Fever_cover.png'),
        ('The Slow Rush','the-slow-rush', 2, 2020, 'https://upload.wikimedia.org/wikipedia/en/5/54/Tame_Impala_-_The_Slow_Rush.png');

INSERT INTO songs (name, duration, date_added, artist_id, album_id,image)
VALUES ('Sometimes...', '36000', '2022-09-02 04:06:06', 1, 1, 'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/bebllwzjpsujz9ffwp6s/tyler-the-creator-scum-fuck-flower-boy-cover?fimg-ssr-default'),
        ('The Less I Know The Better', '216000', '2022-09-01 14:26:16', 2, 2, 'https://www.billboard.com/wp-content/uploads/media/Tame-Impala-Currents-2017-billboard-1240.jpg?w=600'),
        ('Yeah Right', '189000', '2022-09-01 14:26:16', 3, 3, 'http://images.genius.com/037801ff09afa2af7c8b9996efb048a8.1000x1000x1.jpg'),
        ('Fever', '246000', '2022-09-01 14:26:16', 4, 4, 'https://upload.wikimedia.org/wikipedia/en/c/c2/Black_Keys_Fever_cover.png'),
        ('Eventually', '318000', '2022-09-08 15:43:42', 2, 2, 'https://www.billboard.com/wp-content/uploads/media/Tame-Impala-Currents-2017-billboard-1240.jpg?w=600'),
        ('Lost In Yesterday', '246000', '2022-09-18 15:08:08', 2, 5, 'https://upload.wikimedia.org/wikipedia/en/5/54/Tame_Impala_-_The_Slow_Rush.png');

INSERT INTO artist_songs (artist_id, song_id)
VALUES (1,1),
        (2,2),
        (3,3),
        (4,4),
        (2,5),
        (2,6);

INSERT INTO album_songs (album_id, song_id)
VALUES (1,1),
        (2,2),
        (3,3),
        (4,4),
        (2,5),
        (5,6);

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1,1),
        (2,2),
        (1,3),
        (2,4),
        (2,5),
        (1,4),
        (2,6);

INSERT INTO follows (user_following_id, artist_being_followed_id)
VALUES (1,1),
        (1,2);

