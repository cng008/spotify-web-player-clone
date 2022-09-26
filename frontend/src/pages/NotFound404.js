import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import './NotFound404.css';

import NewReleasesRoundedIcon from '@material-ui/icons/NewReleasesRounded';

/** 404 redirect for missing urls or lost routes
 *
 * App -> Routes -> NotFound404
 */

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
