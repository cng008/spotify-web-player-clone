import React from 'react';
import './Slider.css';

/** Reusable component used for volume and music scrubber range slider
 *
 * App -> Routes -> Footer -> Slider
 */

const Slider = ({ value, minValue, maxValue, handleChange }) => {
  // console.debug('Slider','value',value, 'minValue',minValue, 'maxValue',maxValue, 'handleChange',handleChange)

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
        data-testid="slider"
      />
    </>
  );
};

export default Slider;
