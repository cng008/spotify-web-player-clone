export const INITIAL_STATE = {
  user: null,
  // token: null
  // 'BQCcuMrX2ibx2djgcGHYXQWpBxEw04bZ9GPdpp8aHMiVD02odVgL-JDMmXkNbQxhpxNO3G_fNIXEHQDioqiN3jE3MpWCChMJOxiJcOi_A-ho-6Z_BlFK5_bNHoHTbpKwLpj5zVYcmSYURSwA1-xaF7bynWKlT-oTyrki-pGL1lZLtC8H8ZO7'
  playing: false,
  volume: 50,
  playlists: [],
  artist: [],
  albums: [],
  trackData: null
};

// Listens to actions
const reducer = (state, action) => {
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

    case 'SET_PLAYING':
      return {
        ...state,
        trackData: action.trackData,
        playing: action.playing
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
