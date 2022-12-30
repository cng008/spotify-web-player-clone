import React, { createContext, useContext, useReducer } from 'react';

/** Context: provides data object and setter for use throughout app.
 * useContext is useful for providing data that is global to the application and that is not modified within the component tree
 * useReducer is useful for managing local state that is modified within the component tree, or for encapsulating complex update logic
 */

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
