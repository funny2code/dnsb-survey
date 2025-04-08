import React from "react";
import "../../css/Loader.css"

function Loader() {
  return (
      <div className="loader">
          <p className="loader-text">Please wait! Loading...</p>
          <div className="spinner"></div>
      </div>
  );
}

export default Loader;
