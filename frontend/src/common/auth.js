export const authEndpoint = 'https://accounts.spotify.com/authorize';
// const redirectUri = 'http://localhost:3000/';
const redirectUri = 'http://cng008-spotify-clone.surge.sh/';
const clientId = 'd357a25eff754e449e6ad19ca67978f5';
const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playlist-state',
  'user-top-read',
  'user-modify-playback-state'
];

export const getTokenFromUrl = () => {
  // get value of access_token and decode
  return window.location.hash
    .substring(1) // get first substring
    .split('&') // no extra params
    .reduce((initial, item) => {
      let parts = item.split('=');
      // get value of access_token and decode
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

// returns a token
export const loginUrl = `${authEndpoint}?client_id=${clientId}&scopes=${scopes.join(
  '%20'
)}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
