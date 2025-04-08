import React, { useState } from "react";

function RateControl() {
  const [number, setNumber] = useState(0);

  const handleIncrement = () => {
    if (number < 6) {
      setNumber(number + 1);
    }
  };

  const handleDecrement = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  return (
    <>
      <div className="star-container">
        <div className="star">
          <div className="star-center">{number}</div>
        </div>
        <div className="rating-button-container">
          <button className="rating-button" onClick={handleDecrement}>
            -
          </button>
          <button className="rating-button" onClick={handleIncrement}>
            +
          </button>
        </div>
      </div>

      {/* <div className="star-container">
        <div className="star">
          <div className="star-inner">
            <div className="star-center">{number}</div>
          </div>
        </div>
        <div className="rank-button-container">
          <button className="rank-button" onClick={handleDecrement}>
            -
          </button>
          <button className="rank-button" onClick={handleIncrement}>
            +
          </button>
        </div>
      </div> */}

      {/* <div className="rank-container">
        <span className="rank-card">{number}</span>
      </div>
      <div className="rank-button-container">
        <button className="rank-button" onClick={handleDecrement}>
          -
        </button>
        <button className="rank-button" onClick={handleIncrement}>
          +
        </button>
      </div> */}
    </>
  );
}

export default RateControl;
