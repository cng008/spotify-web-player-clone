import React from 'react';
import { Route } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Header from '../player/Header';
import Sidebar from '../player/Sidebar';
import Footer from '../player/Footer';
import PlaylistCardM from '../player/PlaylistCardM';
import ArtistCard from '../player/ArtistCard';
import './Library.css';

const Library = () => {
  return (
    <>
      <div className="Library">
        <Sidebar />
        <div className="Library-body">
          <Header />
          <div className="Library-content">
            <Route exact path="/library">
              <PlaylistTab />
            </Route>
            <Route path="/library/podcasts">
              <PodcastTab />
            </Route>
            <Route path="/library/artists">
              <ArtistTab />
            </Route>
            <Route path="/library/albums">
              <AlbumTab />
            </Route>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const PlaylistTab = () => {
  const [{ playlists }] = useStateValue();

  return (
    <div>
      <h2>Playlists</h2>
      <div className="Grid">
        {playlists.map(item => {
          return <PlaylistCardM key={item.name} data={item} />;
        })}
      </div>
    </div>
  );
};

const PodcastTab = () => {
  return (
    <div>
      <h2>Podcasts</h2>
      <div className="Grid">
        <p>You have no favorited podcasts.</p>
      </div>
    </div>
  );
};

const ArtistTab = () => {
  const [{ artists }] = useStateValue();

  return (
    <div>
      <h2>Artists</h2>
      <div className="Grid">
        {artists.map(item => {
          return <ArtistCard key={item.name} data={item} />;
        })}
      </div>
    </div>
  );
};

const AlbumTab = () => {
  const [{ albums }] = useStateValue();

  return (
    <div>
      <h2>Albums</h2>
      <div className="Grid">
        {albums.map(item => {
          return <PlaylistCardM key={item.name} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Library;
