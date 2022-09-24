import React from 'react';
import { useStateValue } from '../StateProvider';
import Header from '../player/Header';
import Sidebar from '../player/Sidebar';
import Footer from '../player/Footer';
import PlaylistCardS from '../player/PlaylistCardS';
import PlaylistCardM from '../player/PlaylistCardM';
import './Home.css';

const Home = () => {
  const [{ playlists }] = useStateValue();
  // console.debug('Home', 'playlists', playlists);

  return (
    <>
      <div className="Home">
        <Sidebar />
        <div className="Home-body">
          <Header />
          <div className="Home-content">
            <section>
              <div className="Section-title">
                <h2>Good afternoon</h2>
              </div>

              <div className="Section-cards">
                {playlists.slice(0, 4).map(item => {
                  return <PlaylistCardS key={item.name} data={item} />;
                })}
              </div>
            </section>

            <section>
              <div className="Section-title">
                <h2>Soundtrack your day</h2>
              </div>

              <div className="Section-cards">
                {playlists.slice(0, 10).map(item => {
                  return <PlaylistCardM key={item.name} data={item} />;
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
