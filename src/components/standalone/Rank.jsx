import React, { useEffect } from "react";
import { getScreenHeight } from "../../utilities/getScreenSize";

function Rank({ rank, onClick, className, isScrollable, length }) {

  const height = getScreenHeight();
  let width = "15px"; // Default value

  if (length <= 6) {
    width = "20px";
  } else if (isScrollable && height === 20) {
    width = "12px";
  } else if (isScrollable && height === 15) {
    width = "10px";
  } else if (length >= 7 && height === 20) {
    width = "14px";
  } else if (length >= 7 && height === 15) {
    width = "14px";
  }

  
  return (
    <>
      <svg
        viewBox="0 0 62 97"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        className={className}
        style={{width: width}}
      >
        <rect
          x="10.25"
          y="0.25"
          width="51.5"
          height="86.5"
          rx="4.75"
          fill="#44CEEC"
          stroke="black"
          strokeWidth="0.5"
        />
        <rect
          x="8.25"
          y="2.25"
          width="51.5"
          height="86.5"
          rx="4.75"
          fill="#44CEEC"
          stroke="black"
          strokeWidth="0.5"
        />
        <rect
          x="6.25"
          y="4.25"
          width="51.5"
          height="86.5"
          rx="4.75"
          fill="#44CEEC"
          stroke="black"
          strokeWidth="0.5"
        />
        <rect
          x="4.25"
          y="6.25"
          width="51.5"
          height="86.5"
          rx="4.75"
          fill="#44CEEC"
          stroke="black"
          strokeWidth="0.5"
        />
        <rect
          x="2.25"
          y="8.25"
          width="51.5"
          height="86.5"
          rx="4.75"
          fill="#44CEEC"
          stroke="black"
          strokeWidth="0.5"
        />
        <rect
          x="0.25"
          y="10.25"
          width="51.5"
          height="86.5"
          rx="4.75"
          fill="#44CEEC"
          stroke="black"
          strokeWidth="0.5"
        />
        <text
          x="40%"
          y="60%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="black"
          fontSize="70"
          fontWeight="100"
        >
          {rank ? rank : "?"}
        </text>
      </svg>
    </>
  );
}

export default Rank;
