import React from 'react';
import './Slider.css';

const Slider = ({ volume, handleVolume }) => {
  return (
    <>
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
    </>
  );
};

export default Slider;
