import React, { useState } from 'react';
import './Footer.css';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Grid } from '@material-ui/core';

const Footer = () => {
  const [paused, setPaused] = useState(false);

  const togglePause = () => {
    let toggle = paused === true ? false : true;
    setPaused(toggle);
  };

  return (
    <div className="Footer">
      <div className="Footer-left">
        <img
          className="Footer-albumLogo"
          src="https://i.scdn.co/image/ab67616d000048513984f95048773ff35971aa40"
          alt=""
        />
        <div className="Footer-songInfo">
          <h4>Gasoline</h4>
          <p>Alpine</p>
        </div>
      </div>

      <div className="Footer-center">
        <ShuffleIcon className="Footer-green" />
        <SkipPreviousIcon fontSize="large" className="Footer-icon" />
        {paused ? (
          <PauseCircleFilledIcon
            className="Footer-icon"
            onClick={togglePause}
          />
        ) : (
          <PlayCircleFilledIcon className="Footer-icon" onClick={togglePause} />
        )}
        <SkipNextIcon fontSize="large" className="Footer-icon" />
        <RepeatIcon className="Footer-green" />
      </div>

      <div className="Footer-right">
        {/* Material UI grid */}
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <input type="range" name="volume" min="0" max="100" />
            {/* <Slider aria-labelledby="continuous-slider" /> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
