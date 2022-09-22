import React from 'react';
import Sidebar from '../player/Sidebar';
import Footer from '../player/Footer';
import Header from '../player/Header';
import './NotFound404.css';

import NewReleasesRoundedIcon from '@material-ui/icons/NewReleasesRounded';

const NotFound404 = () => {
  return (
    <>
      <div className="NotFound">
        <Sidebar />
        <div className="NotFound-body">
          <Header />
          <div className="NotFound-content">
            <NewReleasesRoundedIcon className="NotFound-icon" />
            <h1>404: Page Not Found</h1>
            <p>What you were looking for is just not there.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound404;
