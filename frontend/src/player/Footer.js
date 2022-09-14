import React from 'react';
import { useStateValue } from '../StateProvider';
import './Footer.css';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Grid } from '@material-ui/core';

const Footer = () => {
  const [{ playing, volume }, dispatch] = useStateValue();
  // console.debug('Footer', 'playing=', playing, 'volume=', volume);

  // SET PLAY/PAUSE GLOBALLY
  const togglePause = () => {
    let toggle = playing === false ? true : false;
    dispatch({
      type: 'SET_PLAYING',
      playing: toggle
    });
  };

  // SET VOLUME GLOBALLY
  const handleVolume = e => {
    dispatch({
      type: 'SET_VOLUME',
      volume: parseInt(e.target.value)
    });
    localStorage.setItem('unMuteVariable', JSON.stringify(e.target.value));
  };

  const handleMute = e => {
    dispatch({
      type: 'SET_VOLUME',
      volume: 0
    });
  };

  const unMute = () => {
    const volumeLevelBeforeMute = parseInt(
      JSON.parse(localStorage.getItem('unMuteVariable'))
    );
    dispatch({
      type: 'SET_VOLUME',
      volume: volumeLevelBeforeMute
    });
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
        {playing ? (
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
            {volume === 0 ? (
              <VolumeOffIcon onClick={unMute} />
            ) : (
              <VolumeDownIcon onClick={handleMute} />
            )}
          </Grid>
          <Grid item xs className="progressBar">
            <input
              className="slider"
              key="volume-slider"
              type="range"
              name="volume"
              value={volume}
              min="0"
              max="100"
              onChange={handleVolume}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
