import React from "react";
import PropTypes from "prop-types";
import "../../css/MediaComponent.css";


const MediaComponent = ({  title = "",  content = "" }) => {
  return (
    <div className="media-component-container">
      <img className="media-component__img" src={`${import.meta.env.BASE_URL}/assets/BuyFacts Logo Bullet Square.png`} alt="" />
      <div className="media-component__body">
        <h2>{title}</h2>
        {content}
      </div>
    </div>
  );
};

MediaComponent.propTypes = {
  alt: PropTypes.string,
  heading: PropTypes.string,
  content: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
};

export default MediaComponent;
