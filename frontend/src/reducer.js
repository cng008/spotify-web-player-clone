export const INITIAL_STATE = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token:
    'BQCcuMrX2ibx2djgcGHYXQWpBxEw04bZ9GPdpp8aHMiVD02odVgL-JDMmXkNbQxhpxNO3G_fNIXEHQDioqiN3jE3MpWCChMJOxiJcOi_A-ho-6Z_BlFK5_bNHoHTbpKwLpj5zVYcmSYURSwA1-xaF7bynWKlT-oTyrki-pGL1lZLtC8H8ZO7'
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

    // if no matching action, return original state
    default:
      return state;
  }
};
export default reducer;
