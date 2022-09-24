import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import DiscoverPlaylist from './pages/DiscoverPlaylist';
import NotFound404 from './pages/NotFound404';
// import Protected from './ProtectedRoute';

/** Site-wide routes.
 *
 * Visiting a non-existant route redirects to the homepage.
 */
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/welcome">
        <Login />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/search">
        <Search />
      </Route>

      <Route path="/library">
        <Library />
      </Route>

      <Route exact path="/playlist/discover">
        <DiscoverPlaylist />
      </Route>

      <Route exact path="/playlists/:handle">
        <Playlist />
      </Route>

      <Route>
        <NotFound404 />
      </Route>
    </Switch>
  );
};

export default Routes;
