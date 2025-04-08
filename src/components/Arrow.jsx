import "../css/PointerArrow.css";

import React, { useState, useEffect } from "react";

const Arrow = ({ direction, animationDirection }) => {
  const [arrowClass, setArrowClass] = useState("arrow");

  useEffect(() => {
    const animationClass =
      animationDirection === "up-down"
        ? "animate-up-down"
        : "animate-left-right";
    setArrowClass("arrow" + direction + "" + animationClass);
  }, [direction, animationDirection]);

  return (
    <div className={arrowClass}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        {/* Arrow SVG path, adjust as needed */}
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </div>
  );
};

export default Arrow;
