// https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/

const authEndpoint = 'https://accounts.spotify.com/authorize';
// const redirectUri = 'http://localhost:3000/';
const redirectUri = 'http://cng008-spotify-clone.surge.sh/';
const clientId = 'd357a25eff754e449e6ad19ca67978f5';
const scopes = ['user-read-private'];
const state = generateRandomString(16);

/** generates a random string for 'state' o ensure that the request and response originated in the same browser.
 * This provides protection against attacks such as cross-site request forgery
 * assurance that an incoming connection is the result of an authentication request */
function generateRandomString(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// get key:value of params and decode
export const getParamsFromUrl = () => {
  return window.location.hash
    .substring(1) // get first substring
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

/** returns access_token, token_type, expires_in, state */
export const loginUrl = `${authEndpoint}?client_id=${clientId}&scopes=${scopes.join(
  '%20'
)}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true&state=${state}`;
