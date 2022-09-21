import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { useStateValue } from '../StateProvider';
import Slider from './Slider';
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
  const [{ isPlaying, volume, trackData, playerTime }, dispatch] =
    useStateValue();
  const { getSongDuration } = useContext(UserContext);

  // console.debug(
  //   'Footer',
  //   'isPlaying=',
  //   isPlaying,
  //   'volume=',
  //   volume,
  //   'trackData',
  //   trackData,
  //   'playerTime',
  //   playerTime
  // );

  /** SETS PLAY/PAUSE GLOBALLY */
  const togglePause = () => {
    let toggle = isPlaying === false ? true : false;
    dispatch({
      type: 'SET_PLAYING',
      isPlaying: toggle
    });
  };

  /** SAVES SONG TIME GLOBALLY */
  const handleTimeline = evt => {
    dispatch({
      type: 'SET_SONG_TIME',
      playerTime: parseInt(evt.target.value)
    });
  };

  /** SETS VOLUME GLOBALLY
   * Saves volume before setting to 0
   * allows input to toggle mute/unmute by saving to localStorage
   */
  const handleVolume = evt => {
    dispatch({
      type: 'SET_VOLUME',
      volume: parseInt(evt.target.value)
    });
    localStorage.setItem('unMuteVariable', JSON.stringify(evt.target.value));
  };

  const handleMute = () => {
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
        {trackData ? (
          <img className="Footer-albumLogo" src={trackData.image} alt="" />
        ) : null}
        <div className="Footer-songInfo">
          <h4>{trackData?.name}</h4>
          <p>{trackData?.artistName}</p>
        </div>
      </div>

      <div className="Footer-center">
        <div className="Footer-center-controls">
          <ShuffleIcon activeClassName="Footer-green" />
          <SkipPreviousIcon fontSize="large" className="Footer-icon" />
          {isPlaying ? (
            <PauseCircleFilledIcon
              className="Footer-icon"
              onClick={togglePause}
            />
          ) : (
            <PlayCircleFilledIcon
              className="Footer-icon"
              onClick={togglePause}
            />
          )}
          <SkipNextIcon fontSize="large" className="Footer-icon" />
          <RepeatIcon activeClassName="Footer-green" />
        </div>
        <div className="Footer-control-timeline">
          <div>
            <span>{trackData ? getSongDuration(playerTime) : null}</span>
          </div>
          <div className="Footer-control-slider">
            <Slider
              value={playerTime}
              minValue={0}
              maxValue={trackData?.duration}
              handleChange={handleTimeline}
            />
          </div>
          <div>
            <span>
              {trackData ? getSongDuration(trackData?.duration) : null}
            </span>
          </div>
        </div>
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
            <Slider
              value={volume}
              minValue={0}
              maxValue={100}
              handleChange={handleVolume}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
