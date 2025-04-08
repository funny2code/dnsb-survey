import React, { useState, useEffect } from "react";

const TimerArrow = ({ arrowColor }) => {
  return (
    <>
      <svg
        width="18"
        height="30"
        viewBox="0 0 18 30"
        fill={"none"}
        xmlns="http://www.w3.org/2000/svg"
        className="timer-arrow"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.3979 19.1991L8.81679 29.0516L0.235718 19.1991H4.96541V0.0516338H12.6682V19.1991H17.3979Z"
          fill={arrowColor}
        />
      </svg>
    </>
  );
};

export default TimerArrow;
