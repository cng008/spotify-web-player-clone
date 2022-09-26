import React from 'react';
import { Route } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import PlaylistCardM from '../components/cards/PlaylistCardM';
import InfoCard from '../components/cards/InfoCard';
import './Library.css';

/** View list of playlists, artist, albums stored in db
 *
 * - useStateValue: access globally stored state
 *
 * App -> Routes -> Library -> Playlist
 */

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
  // console.debug('Library', 'playlists=', playlists);

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
  // console.debug('Library', 'artists=', artists);

  return (
    <div>
      <h2>Artists</h2>
      <div className="Grid">
        {artists.map(item => {
          return (
            <InfoCard
              key={item.name}
              data={item}
              borderRadius={'InfoCardM-ImgBox-Artist'}
            />
          );
        })}
      </div>
    </div>
  );
};

const AlbumTab = () => {
  const [{ albums }] = useStateValue();
  // console.debug('Library', 'albums=', albums);

  return (
    <div>
      <h2>Albums</h2>
      <div className="Grid">
        {albums.map(item => {
          return (
            <InfoCard
              key={item.name}
              data={item}
              borderRadius={'InfoCardM-ImgBox-Album'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
