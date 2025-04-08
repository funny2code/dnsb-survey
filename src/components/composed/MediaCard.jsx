import React from "react";
import PropTypes from "prop-types";
import "../../css/MediaCard.css";

const MediaCard = ({ heading = "", style, children }) => {
    return <>
        <div className="media-card" style={style}>
            <h1>{heading}</h1>
            {children}
    </div>
    </>

}

MediaCard.propTypes = {
  
  heading: PropTypes.string,
//   component: PropTypes,
};


export default MediaCard;