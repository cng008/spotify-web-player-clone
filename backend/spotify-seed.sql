-- test users have the password 'password'

INSERT INTO users (username, display_name, image, profile_url)
VALUES ('testuser','testuser','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHozIxtgJx0gbDdzgKy7hcRkDoP7houIjY65EDeY&s','https://open.spotify.com/user/christienrenee');

INSERT INTO playlists (name, handle, username, description, created_at, image)
VALUES ('Workout', 'workout', 'testuser', '100 push-ups per day','2022-09-02 04:05:06','https://cdn-www.comingsoon.net/assets/uploads/2022/06/one-punch-man-justin-lin.png'),
        ('Study', 'study', 'testuser', 'Some beats to help you get some work done','2022-09-01 14:25:16','https://www.theanimedaily.com/wp-content/uploads/2021/07/36e522f1fdab091d58ac54cb88a88379.jpg');

INSERT INTO artists (id, name, handle, image)
VALUES ('13ubrt8QOOCPljQ2FL1Kca', 'A$AP Rocky', 'a$ap-rocky', 'https://i.scdn.co/image/ab67616100005174ee452efcf24aa4124fb28d94'),
        ('5INjqkS1o8h1imAzPqGZBb', 'Tame Impala', 'tame-impala','https://i.scdn.co/image/ab6761610000517490357ef28b3a012a1d1b2fa2'),
        ('68kEuyFKyqrdQQLLsmiatm', 'Vince Staples', 'vince-staples','https://i.scdn.co/image/ab6761610000517453054f8bc7e0153daefe12cc'),
        ('7mnBLXK823vNxN3UWB7Gfz', 'The Black Keys', 'the-black-keys','https://i.scdn.co/image/ab67616100005174ae537808bd15be9f7031e99b'),
        ('4oLeXFyACqeem2VImYeBFe', 'Fred again..', 'fred-again...', 'https://i.scdn.co/image/ab67616100005174c3631d90ebc9440d6fd63755'),
        ('3eUpxakSdjFZ5ROQKgfL2W', 'Tentendo', 'tentendo', 'https://i.scdn.co/image/ab676161000051741d153931d70b23894b2be2f6'),
        ('1AhjOkOLkbHUfcHDSErXQs', '88rising', '88rising', 'https://i.scdn.co/image/ab676161000051742f8dfdfeb85c3fc2d11b2ae2');

INSERT INTO albums (id, name, handle, artist_id, release_date, image)
VALUES ('3MATDdrpHmQCmuOcozZjDa', 'TESTING', 'testing', '13ubrt8QOOCPljQ2FL1Kca', '2018-05-25', 'https://i.scdn.co/image/ab67616d00001e029feadc48ab0661e9b3a9170b'),
        ('79dL7FLiJFOO0EoehUHQBv', 'Currents','currents', '5INjqkS1o8h1imAzPqGZBb', '2015-07-17', 'https://i.scdn.co/image/ab67616d00001e029e1cfc756886ac782e363d79'),
        ('5h3WJG0aZjNOrayFu3MhCS', 'Big Fish Theory','big-fish-theory', '68kEuyFKyqrdQQLLsmiatm', '2017-06-23', 'https://i.scdn.co/image/ab67616d00001e027ba7b4d23c717f3211717946'),
        ('6TvxpBzf9c8H1fsrAaQ8t3', 'Turn Blue', 'turn-blue', '7mnBLXK823vNxN3UWB7Gfz', '2014-05-09', 'https://i.scdn.co/image/ab67616d00001e021af8fb0d8859055d35d2290f'),
        ('2eQW56txcEoh0iG0bC0gDr', 'Actual Life', 'actual-life', '4oLeXFyACqeem2VImYeBFe', '2020-06-12', 'https://i.scdn.co/image/ab67616d00001e02e67f2c3d40ed4148168d6bd2'),
        ('2LtnuQprMk03gZYi4eUFVP', 'Make Me High', 'make-me-high', '3eUpxakSdjFZ5ROQKgfL2W', '2020-11-27', 'https://i.scdn.co/image/ab67616d00001e0258500d4ab511675dc2970ae5'),
        ('6YFBWwUDdot8IjBZSYOacB', 'Head In The Clouds', 'head-in-the-clouds', '1AhjOkOLkbHUfcHDSErXQs', '2018-07-20', 'https://i.scdn.co/image/ab67616d00001e024aedbebc17bc6ebccad220e9');

INSERT INTO songs (id, name, duration_ms, explicit, added_at, artist_id, album_id,image)
VALUES ('5TX0mfUkpGlU6j2xa00ERx', 'OG Beeper', 155893, true, '2022-09-01 14:26:16', '13ubrt8QOOCPljQ2FL1Kca', '3MATDdrpHmQCmuOcozZjDa', 'https://i.scdn.co/image/ab67616d00001e029feadc48ab0661e9b3a9170b'),
        ('35tWhD29yvWwB0IDRr6zsL', 'Yeah Right', 188946, true, '2022-09-01 14:26:16', '68kEuyFKyqrdQQLLsmiatm', '5h3WJG0aZjNOrayFu3MhCS', 'https://i.scdn.co/image/ab67616d00001e027ba7b4d23c717f3211717946'),
        ('3Hx7RXqCS7Kzjy2ot2q1Gk', 'Fever', 246306, false,'2022-09-01 14:26:16', '7mnBLXK823vNxN3UWB7Gfz', '6TvxpBzf9c8H1fsrAaQ8t3', 'https://i.scdn.co/image/ab67616d00001e021af8fb0d8859055d35d2290f'),
        ('5M4yti0QxgqJieUYaEXcpw', 'Eventually', 318591, false,'2022-09-08 15:43:42', '5INjqkS1o8h1imAzPqGZBb', '79dL7FLiJFOO0EoehUHQBv', 'https://i.scdn.co/image/ab67616d00001e029e1cfc756886ac782e363d79'),
        ('6tNDYeDmysMdXnH6agTz3v', 'Kyle (i found you)', 196071, false, '2022-09-22 17:43:08', '4oLeXFyACqeem2VImYeBFe', '2eQW56txcEoh0iG0bC0gDr', 'https://i.scdn.co/image/ab67616d00001e02e67f2c3d40ed4148168d6bd2'),
        ('6utNem2fRNIoANRLvyjGRw', 'Make Me High', 170515, false, '2022-09-22 17:54:40', '3eUpxakSdjFZ5ROQKgfL2W', '2LtnuQprMk03gZYi4eUFVP', 'https://i.scdn.co/image/ab67616d00001e0258500d4ab511675dc2970ae5'),
        ('2AJlEaACYHQMYxXlRMdLM6', 'Japan 88', 185510, true, '2022-09-27 13:25:46', '1AhjOkOLkbHUfcHDSErXQs', '6YFBWwUDdot8IjBZSYOacB', 'https://i.scdn.co/image/ab67616d00001e024aedbebc17bc6ebccad220e9');

INSERT INTO artist_songs (artist_id, song_key)
VALUES ('13ubrt8QOOCPljQ2FL1Kca', 1),
        ('68kEuyFKyqrdQQLLsmiatm', 2),
        ('7mnBLXK823vNxN3UWB7Gfz', 3),
        ('5INjqkS1o8h1imAzPqGZBb', 4),
        ('4oLeXFyACqeem2VImYeBFe', 5),
        ('3eUpxakSdjFZ5ROQKgfL2W', 6),
        ('1AhjOkOLkbHUfcHDSErXQs', 7);

INSERT INTO album_songs (album_id, song_key)
VALUES ('3MATDdrpHmQCmuOcozZjDa', 1),
        ('5h3WJG0aZjNOrayFu3MhCS', 2),
        ('6TvxpBzf9c8H1fsrAaQ8t3', 3),
        ('79dL7FLiJFOO0EoehUHQBv', 4),
        ('2eQW56txcEoh0iG0bC0gDr', 5),
        ('2LtnuQprMk03gZYi4eUFVP', 6),
        ('6YFBWwUDdot8IjBZSYOacB', 7);

INSERT INTO playlist_songs (playlist_id, song_key)
VALUES (1,1),
        (1,2),
        (2,3),
        (2,4),
        (2,5),
        (2,6),
        (1,7);