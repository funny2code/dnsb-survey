import React, { useRef, useState, useEffect } from "react";

function Segment() {
  const size = 150;
  const strokeWidth = 30;
  const color = "#4caf50";
  const myArray = ["a", "b", "c", "d", "e", "f"];
  const circleRef = useRef(null);
  const [segmentValue, setSegmentValue] = useState(20);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (segmentValue / 100) * circumference;

  // Function to calculate SegmentValue based on angle
  const updateSegmentValue = (clientX, clientY) => {
    const { x, y, width, height } = circleRef.current.getBoundingClientRect();
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const angle = Math.atan2(dy, dx) + Math.PI / 2;

    // Calculate SegmentValue from angle
    const angleDeg = (angle * 180) / Math.PI;
    const newSegmentValue = ((angleDeg + 360) % 360) / 3.6; // Convert to percentage

    setSegmentValue(Math.max(0, Math.min(100, newSegmentValue))); // Clamp between 0 and 100
  };

  return (
    <>
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        className="polygon"
        xmlns="http://www.w3.org/2000/svg"
      ></svg>

      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        className="polygon"
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
      <svg
        width={size}
        height={size}
        ref={circleRef}
        style={{ pointerEvents: "stroke", userSelect: "none" }}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          style={{ pointerEvents: "none" }}
        />
        {/* SegmentValue Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start at 12 o'clock
          style={{ cursor: "pointer", pointerEvents: "stroke" }}
        />
      </svg>
    </>
  );
}
export default Segment;
