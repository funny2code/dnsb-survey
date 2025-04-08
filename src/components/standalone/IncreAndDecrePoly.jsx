import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChoiceList } from "../../store/surveys";
import choiceListUpdater from "../../utilities/choiceListUpdater";

const IncreAndDecrePoly = ({
  widgetOutAnimation,
  widgetInAnimationRight,
  onSetSegmentValue,
  activeRow,
}) => {
  const width = "100";
  const height = "100";
  const incrementIntervalRef = useRef(null); // To store the increment interval ID
  const decrementIntervalRef = useRef(null); // To store the decrement interval ID
  const dispatch = useDispatch();
  const { choiceList } = useSelector((state) => state.entities.surveys);

  const handleIncrement = () => {
    onSetSegmentValue((prevValue) => {
      const newValue = prevValue + 1;

      if (activeRow) {
        const updatedChoiceList = choiceListUpdater(
          choiceList,
          newValue,
          activeRow
        );
        dispatch(updateChoiceList(updatedChoiceList));
      }

      return newValue;
    });
  };

  const handleDecrement = () => {
    onSetSegmentValue((prevValue) => {
      const newValue = Math.max(prevValue - 1, 0); // Ensure it doesn't go below 0

      if (activeRow) {
        const updatedChoiceList = choiceListUpdater(
          choiceList,
          newValue,
          activeRow
        );
        dispatch(updateChoiceList(updatedChoiceList));
      }

      return newValue;
    });
  };

  const handlePoligonMouseDownIncrement = () => {
    // Start incrementing on mouse down
    incrementIntervalRef.current = setInterval(handleIncrement, 100); // Adjust interval as needed (100ms here)
  };

  const handlePoligonMouseDownDecrement = () => {
    // Start decrementing on mouse down
    decrementIntervalRef.current = setInterval(handleDecrement, 100); // Adjust interval as needed (100ms here)
  };

  const handlePoligonMouseUp = () => {
    // Stop both increment and decrement on mouse up
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
  };

  const handlePoligonMouseLeave = () => {
    // Stop both increment and decrement if the mouse leaves the button while holding down
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
  };
  return (
    <>
      <div className="polygon-container">
        <svg
          width={width}
          height={height}
          viewBox="0 0 10 8"
          className={`polygon ${
            widgetOutAnimation ? widgetOutAnimation : widgetInAnimationRight
          }`}
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={handlePoligonMouseDownIncrement}
          onMouseUp={handlePoligonMouseUp}
          onMouseLeave={handlePoligonMouseLeave}
          onTouchStart={handlePoligonMouseDownIncrement}
          onTouchEnd={handlePoligonMouseUp}
        >
          <path d="M5.00006 0.310303L9.25814 7.68552H0.74198L5.00006 0.310303Z" />
        </svg>

        <svg
          width={width}
          height={height}
          viewBox="0 0 10 8"
          className={`polygon ${
            widgetOutAnimation ? widgetOutAnimation : widgetInAnimationRight
          }`}
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={handlePoligonMouseDownDecrement}
          onMouseUp={handlePoligonMouseUp}
          onMouseLeave={handlePoligonMouseLeave}
          onTouchStart={handlePoligonMouseDownDecrement}
          onTouchEnd={handlePoligonMouseUp}
        >
          <path d="M5.00006 7.97754L9.25814 0.602325H0.74198L5.00006 7.97754Z" />
        </svg>
      </div>
    </>
  );
};

export default IncreAndDecrePoly;
