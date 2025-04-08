import React from "react";
import "../css/Cue.css";

const Cue = ({ className, children }) => {
  return <div className={ `cue ${className}`}>{children}</div>;
};

export default Cue;
