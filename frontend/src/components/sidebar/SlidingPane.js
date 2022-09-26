import React, { useState } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './SlidingPane.css';

const SlidingPanel = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    const isClicked = click === false ? true : false;
    setClick(isClicked);
  };

  return (
    <div className="SlidingPanel">
      <div style={{ marginTop: '1em' }}>
        <button onClick={handleClick}>Click me!</button>
      </div>

      <SlidingPane
        className="Pop-out-slider"
        isOpen={click}
        title="Spotify Clone"
        from="left"
        width="18em"
        onRequestClose={handleClick}
      >
        <div className="Pop-out-slider-content">
          <p>
            *made by
            <a href="https://www.linkedin.com/in/christienng/"> Christien Ng</a>
          </p>

          <div className="Pop-out-slider-links">
            <a href="https://www.linkedin.com/in/christienng/" target="_blank">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                title="LinkedIn"
                width="30px"
                height="30px"
              />
            </a>
            <a href="https://github.com/cng008" target="_blank">
              <img
                src="https://www.nicepng.com/png/full/52-520535_free-files-github-github-icon-png-white.png"
                alt="GitHub"
                title="GitHub"
                width="30px"
                height="30px"
              />
            </a>
          </div>
          <p>
            Application data sourced from{' '}
            <a href="https://developer.spotify.com/documentation/web-api/">
              Spotify API
            </a>
          </p>
          <br />
          <p>
            *This application is not produced, endorsed, supported, or
            affiliated with Spotify or its affiliated companies
          </p>
        </div>
      </SlidingPane>
    </div>
  );
};

export default SlidingPanel;
