-- test users have the password 'password'

INSERT INTO users (username, display_name, image, profile_url)
VALUES ('testuser','Tomie','https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1612999979l/57024270._SX318_.jpg','https://open.spotify.com/user/christienrenee');

INSERT INTO playlists (name, handle, username, description, created_at, image)
VALUES ('Workout', 'workout', 'testuser', '100 push-ups per day','2022-09-02 04:05:06','https://cdn-www.comingsoon.net/assets/uploads/2022/06/one-punch-man-justin-lin.png'),
        ('Study', 'study', 'testuser', 'Some beats to help you get some work done','2022-09-01 14:25:16','https://www.theanimedaily.com/wp-content/uploads/2021/07/36e522f1fdab091d58ac54cb88a88379.jpg');

INSERT INTO artists (id, name, handle, image)
VALUES ('0aA1GTrIMutjIh4GlPPUVN', 'Crooked Colours', 'crooked-colors', 'https://i.scdn.co/image/ab67616100005174fe59f29735cfca0256767031'),
        ('5INjqkS1o8h1imAzPqGZBb', 'Tame Impala', 'tame-impala','https://i.scdn.co/image/ab6761610000517490357ef28b3a012a1d1b2fa2'),
        ('68kEuyFKyqrdQQLLsmiatm', 'Vince Staples', 'vince-staples','https://i.scdn.co/image/ab6761610000517453054f8bc7e0153daefe12cc'),
        ('7mnBLXK823vNxN3UWB7Gfz', 'The Black Keys', 'the-black-keys','https://i.scdn.co/image/ab67616100005174ae537808bd15be9f7031e99b'),
        ('4oLeXFyACqeem2VImYeBFe', 'Fred again..', 'fred-again...', 'https://i.scdn.co/image/ab67616100005174c3631d90ebc9440d6fd63755'),
        ('3eUpxakSdjFZ5ROQKgfL2W', 'Tentendo', 'tentendo', 'https://i.scdn.co/image/ab676161000051741d153931d70b23894b2be2f6');

INSERT INTO albums (id, name, handle, artist_id, release_date, image)
VALUES ('1zDkevWz3xdsqVAYbdANiN', 'Love Language',' love-language', '0aA1GTrIMutjIh4GlPPUVN', '2020-08-27', 'https://i.scdn.co/image/ab67616d00001e02a61351f4ac889baa329881e5'),
        ('79dL7FLiJFOO0EoehUHQBv', 'Currents','currents', '5INjqkS1o8h1imAzPqGZBb', '2015-07-17', 'https://i.scdn.co/image/ab67616d00001e029e1cfc756886ac782e363d79'),
        ('5h3WJG0aZjNOrayFu3MhCS', 'Big Fish Theory','big-fish-theory', '68kEuyFKyqrdQQLLsmiatm', '2017-06-23', 'https://i.scdn.co/image/ab67616d00001e027ba7b4d23c717f3211717946'),
        ('6TvxpBzf9c8H1fsrAaQ8t3', 'Turn Blue', 'turn-blue', '7mnBLXK823vNxN3UWB7Gfz', '2014-05-09', 'https://i.scdn.co/image/ab67616d00001e021af8fb0d8859055d35d2290f'),
        ('31qVWUdRrlb8thMvts0yYL', 'The Slow Rush','the-slow-rush', '5INjqkS1o8h1imAzPqGZBb', '2020-02-14', 'https://i.scdn.co/image/ab67616d00001e0258267bd34420a00d5cf83a49'),
        ('2eQW56txcEoh0iG0bC0gDr', 'Actual Life', 'actual-life', '4oLeXFyACqeem2VImYeBFe', '2020-06-12', 'https://i.scdn.co/image/ab67616d00001e02e67f2c3d40ed4148168d6bd2'),
        ('2LtnuQprMk03gZYi4eUFVP', 'Make Me High', 'make-me-high', '3eUpxakSdjFZ5ROQKgfL2W', '2020-11-27', 'https://i.scdn.co/image/ab67616d00001e0258500d4ab511675dc2970ae5');

INSERT INTO songs (id, name, duration_ms, explicit, added_at, artist_id, album_id,image)
VALUES ('2kII74W6BvQZSOwXBotukX', 'Love Language', 198961, false, '2022-09-01 14:26:16', '0aA1GTrIMutjIh4GlPPUVN', '1zDkevWz3xdsqVAYbdANiN', 'https://i.scdn.co/image/ab67616d00001e02a61351f4ac889baa329881e5'),
        ('6K4t31amVTZDgR3sKmwUJJ', 'The Less I Know The Better', 216320, true, '2022-09-01 14:26:16', '5INjqkS1o8h1imAzPqGZBb', '79dL7FLiJFOO0EoehUHQBv', 'https://i.scdn.co/image/ab67616d00001e029e1cfc756886ac782e363d79'),
        ('35tWhD29yvWwB0IDRr6zsL', 'Yeah Right', 188946, true, '2022-09-01 14:26:16', '68kEuyFKyqrdQQLLsmiatm', '5h3WJG0aZjNOrayFu3MhCS', 'https://i.scdn.co/image/ab67616d00001e027ba7b4d23c717f3211717946'),
        ('3Hx7RXqCS7Kzjy2ot2q1Gk', 'Fever', 246306, false,'2022-09-01 14:26:16', '7mnBLXK823vNxN3UWB7Gfz', '6TvxpBzf9c8H1fsrAaQ8t3', 'https://i.scdn.co/image/ab67616d00001e021af8fb0d8859055d35d2290f'),
        ('5M4yti0QxgqJieUYaEXcpw', 'Eventually', 318591, false,'2022-09-08 15:43:42', '5INjqkS1o8h1imAzPqGZBb', '79dL7FLiJFOO0EoehUHQBv', 'https://i.scdn.co/image/ab67616d00001e029e1cfc756886ac782e363d79'),
        ('5JWPUEov2wlX7c0jhYZpeB', 'Lost In Yesterday', 249586, false, '2022-09-18 15:08:08', '5INjqkS1o8h1imAzPqGZBb', '31qVWUdRrlb8thMvts0yYL', 'https://i.scdn.co/image/ab67616d00001e0258267bd34420a00d5cf83a49'),
        ('6tNDYeDmysMdXnH6agTz3v', 'Kyle (i found you)', 196071, false, '2022-09-22 17:43:08', '4oLeXFyACqeem2VImYeBFe', '2eQW56txcEoh0iG0bC0gDr', 'https://i.scdn.co/image/ab67616d00001e02e67f2c3d40ed4148168d6bd2'),
        ('6utNem2fRNIoANRLvyjGRw', 'Make Me High', 170515, false, '2022-09-22 17:54:40', '3eUpxakSdjFZ5ROQKgfL2W', '2LtnuQprMk03gZYi4eUFVP', 'https://i.scdn.co/image/ab67616d00001e0258500d4ab511675dc2970ae5');

INSERT INTO artist_songs (artist_id, song_id)
VALUES ('0aA1GTrIMutjIh4GlPPUVN', '2kII74W6BvQZSOwXBotukX'),
        ('5INjqkS1o8h1imAzPqGZBb', '6K4t31amVTZDgR3sKmwUJJ'),
        ('68kEuyFKyqrdQQLLsmiatm', '35tWhD29yvWwB0IDRr6zsL'),
        ('7mnBLXK823vNxN3UWB7Gfz', '3Hx7RXqCS7Kzjy2ot2q1Gk'),
        ('5INjqkS1o8h1imAzPqGZBb', '5M4yti0QxgqJieUYaEXcpw'),
        ('5INjqkS1o8h1imAzPqGZBb', '5JWPUEov2wlX7c0jhYZpeB'),
        ('4oLeXFyACqeem2VImYeBFe', '6tNDYeDmysMdXnH6agTz3v'),
        ('3eUpxakSdjFZ5ROQKgfL2W', '6utNem2fRNIoANRLvyjGRw');

INSERT INTO album_songs (album_id, song_id)
VALUES ('1zDkevWz3xdsqVAYbdANiN', '2kII74W6BvQZSOwXBotukX'),
        ('79dL7FLiJFOO0EoehUHQBv', '6K4t31amVTZDgR3sKmwUJJ'),
        ('5h3WJG0aZjNOrayFu3MhCS', '35tWhD29yvWwB0IDRr6zsL'),
        ('6TvxpBzf9c8H1fsrAaQ8t3', '3Hx7RXqCS7Kzjy2ot2q1Gk'),
        ('79dL7FLiJFOO0EoehUHQBv', '5M4yti0QxgqJieUYaEXcpw'),
        ('79dL7FLiJFOO0EoehUHQBv', '5JWPUEov2wlX7c0jhYZpeB'),
        ('2eQW56txcEoh0iG0bC0gDr', '6tNDYeDmysMdXnH6agTz3v'),
        ('2LtnuQprMk03gZYi4eUFVP', '6utNem2fRNIoANRLvyjGRw');

INSERT INTO playlist_songs (playlist_id, song_id)
VALUES (1,'2kII74W6BvQZSOwXBotukX'),
        (2,'6K4t31amVTZDgR3sKmwUJJ'),
        (1,'35tWhD29yvWwB0IDRr6zsL'),
        (2,'3Hx7RXqCS7Kzjy2ot2q1Gk'),
        (2,'5M4yti0QxgqJieUYaEXcpw'),
        (1,'5JWPUEov2wlX7c0jhYZpeB'),
        (2,'6tNDYeDmysMdXnH6agTz3v'),
        (2, '6utNem2fRNIoANRLvyjGRw');