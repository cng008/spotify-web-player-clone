import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';

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
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/library">
        <Library />
      </Route>
      <Route exact path="/playlists/:handle">
        <Playlist />
      </Route>
    </Switch>
  );
};

export default Routes;
