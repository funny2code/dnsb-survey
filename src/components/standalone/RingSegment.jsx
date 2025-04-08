import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChoiceList } from "../../store/surveys";

const RingSegment = ({
  style,
  widgetOutAnimation,
  widgetInAnimationRight,
  size,
  total,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 10;
  let currentOffset = 0; // Start from 12 o'clock position
  const dispatch = useDispatch();

  // Add the color property
  const { choiceList } = useSelector((state) => state.entities.surveys);
  // Sort data by `value` in descending order
  const sortedData = [...choiceList].sort((a, b) => b.value - a.value);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      transform="rotate(-90, 0, 0)"
      className={`${style} ${
        widgetOutAnimation ? widgetOutAnimation : widgetInAnimationRight
      }`}
    >
      <circle
        r="50"
        cx="60"
        cy="60"
        fill="none"
        stroke="#d5d5d5" /* Background color */
        strokeWidth={strokeWidth + 8}
      />
      {sortedData.map((item, index) => {
        const segmentLength =
          (total <= 100 ? item.value / 100 : item.value / total) *
          circumference; // Segment proportional to percentage
        const circleElement = (
          <circle
            key={index}
            r={radius}
            cx="60"
            cy="60"
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={currentOffset}
          />
        );
        currentOffset -= segmentLength; // Update offset for the next segment
        return circleElement;
      })}
    </svg>
  );
};

export default RingSegment;
