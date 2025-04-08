import React, { useState, useRef, useEffect } from "react";
import "../../css/Swipe.css";

const Swipe = ({ handleAddToStory }) => {
  const [count, setCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef(null);
  const allowSwipeToAdd = count > 2;

  // Handle swipe to add to story
  const handleTouchORMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleTouchOrMouseMove = (e) => {
    if (!isDragging) return;
    // e.preventDefault();
    setCount((prev) => {
      return prev + 1;
    });
  }; // Adjust the delay as needed

  const handleTouchOrMouseUp = (e) => {
    setIsDragging(false);

    if (allowSwipeToAdd) {
      handleAddToStory();
    }
    setCount(0);
  };

  return (
    <div
      ref={ref}
      className="swipe__add-to-story"
      onMouseDown={handleTouchORMouseDown}
      onMouseUp={handleTouchOrMouseUp}
      onMouseMove={handleTouchOrMouseMove}
      onTouchStart={handleTouchORMouseDown}
      onTouchEnd={handleTouchOrMouseUp}
      onTouchMove={handleTouchOrMouseMove}
    >
      <img
        src={`${import.meta.env.BASE_URL}/assets/PointerArrow.svg`}
        alt=""
        className="swipe__arrow animate__animated animate__slideInUp animate__slow animate__infinite"
      />
    </div>
  );
};

export default Swipe;
