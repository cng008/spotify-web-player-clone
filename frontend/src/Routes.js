import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Login from './Login';

/** Site-wide routes.
 *
 * Visiting a non-existant route redirects to the homepage.
 */
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/welcome">
        <Login />
      </Route>

      <Route exact path="/search">
        <Search />
      </Route>

      <Route path="/library">
        <Library />
      </Route>

      <Route exact path="/playlists/:handle">
        <Playlist />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
