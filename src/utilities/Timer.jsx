import React from "react";
import TimerArrow from "../components/TimerArrow";
import "../css/timer.css";

function Timer({ label, duration, arrowColor, isWelcome, isRunning }) {
  // console.log("Initional duration", timeLeft);

  const minutes = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (duration % 60).toString().padStart(2, "0");
  return (
    <>
      <div className="timer-group">
        <div className={isWelcome ? "timer": isRunning ? "timer" :" timer timer-pause" }>{`${minutes}:${seconds}`}</div>
        <span className="label">{isWelcome ? "PENDING":label}</span>
      </div>
      <TimerArrow arrowColor={isWelcome ? "grey" : arrowColor} />
    </>
  );
}

export default Timer;
