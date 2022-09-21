import React from 'react';
import './Slider.css';

const Slider = ({ value, minValue, maxValue, handleChange }) => {
  return (
    <>
      <input
        className="slider"
        key="volume-slider"
        type="range"
        name="volume"
        value={value}
        min={minValue}
        max={maxValue}
        onChange={handleChange}
      />
    </>
  );
};

export default Slider;
