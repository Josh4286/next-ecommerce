import React from "react";

const Toggle = () => {
  return (
    <div>
      <input className="theme-slider" type="checkbox"></input>
      <label for="theme-slider" className="theme-slider-label">
        <span className="theme-slider-background"></span>
      </label>
    </div>
  );
};

export default Toggle;
