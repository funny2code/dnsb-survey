import React from "react";

import { getScreenHeight } from "../../utilities/getScreenSize";


function Checkbox({ onClick, isChecked, className, isScrollable, length }) {

    const height = getScreenHeight();
    let width = "15px"; // Default value

  if (length <= 6) {
    width = "30px";
  } else if (isScrollable && height === 20) {
    width = "15px";
  } else if (isScrollable && height === 15) {
    width = "15px";
  } else if (length >= 7 && height === 20) {
    width = "17px";
  } else if (length >= 7 && height === 15) {
    width = "20px";
  }

  return (
    <>
      {isChecked ? (
        <img
          className={className}
          style={{width: width}}
          onClick={onClick}
          src={`${import.meta.env.BASE_URL}/assets/CheckboxChecked.svg`}
        />
      ) : (
        <img
          className={className}
          style={{width: width}}
          onClick={onClick}
          src={`${import.meta.env.BASE_URL}/assets/Checkbox.svg`}
        />
      )}
    </>
  );
}

export default Checkbox;
