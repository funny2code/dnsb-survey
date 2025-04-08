import React from "react";
import "../../css/Teleprompter.css";

const Teleprompter = ({ story, containerRef, children }) => {
  return (
    <div className="teleprompter-container">
      <div ref={containerRef} className={"teleprompter-text-container"}>
        {<div dangerouslySetInnerHTML={{ __html: story }} />}
      </div>
      {children}
    </div>
  );
};

export default Teleprompter;
