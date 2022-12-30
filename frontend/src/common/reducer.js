export const INITIAL_STATE = {
  user: null,
  token: sessionStorage.getItem('spotify_access_token') || null,
  searchTerm: '',
  searchResults: [],
  isPlaying: false,
  playerTime: 0,
  volume: sessionStorage.getItem('unMuteVariable') || 50,
  playlists: [],
  artists: [],
  albums: [],
  trackData: null,
  discover_weekly:
    JSON.parse(sessionStorage.getItem('spotify_discover_weekly_data')) || []
};

/** Listens to actions and stores data as global variables
 *
 * - sessionStorage: locally stores parameters that are received from Spotify API login
 *
 * StateProvider -> reducer
 */

const reducer = (state = INITIAL_STATE, action) => {
  console.log(action);

  //   action -> type, [payload]

  switch (action.type) {
    case 'SET_USER':
      return {
        // new state -> keep current state, update declared state
        ...state,
        user: action.user
      };

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };

    case 'SET_SEARCHTERM':
      return {
        ...state,
        searchTerm: action.searchTerm
      };

    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.searchResults
      };

    case 'SET_PLAYING':
      return {
        ...state,
        isPlaying: action.isPlaying
      };

    case 'SET_SONG':
      return {
        ...state,
        trackData: action.trackData
      };

    case 'SET_PLAYER_TIMELINE':
      return {
        ...state,
        playerTime: action.playerTime
      };

    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.volume
      };

    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists
      };

    case 'SET_ARTISTS':
      return {
        ...state,
        artists: action.artists
      };

    case 'SET_ALBUMS':
      return {
        ...state,
        albums: action.albums
      };

    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state,
        discover_weekly: action.discover_weekly
      };

    // if no matching action, return original state
    default:
      return state;
  }
};

export default reducer;
