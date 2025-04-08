import React from "react";
import { getScreenHeight } from "../../utilities/getScreenSize";
function RadioButton({
  onClick,
  onScaleToggle,
  isChecked,
  questionType,
  className,
  isScrollable,
  length,
}) {
  const height = getScreenHeight();
  let width = "15px"; // Default value

  if (length <= 6) {
    width = "30px";
  } else if (isScrollable && height === 20) {
    width = "14px";
  } else if (isScrollable && height === 15) {
    width = "8px";
  } else if (length >= 7 && height === 20) {
    width = "17px";
  } else if (length >= 7 && height === 15) {
    width = "8px";
  }

  return (
    <>
      {isChecked ? (
        <img
          className={className}
          onClick={questionType === "scale" ? onScaleToggle : onClick}
          src={`${import.meta.env.BASE_URL}/assets/RadioChecked.svg`}
          style={{width: width}}
        />
      ) : (
        <img
          className={className}
          onClick={questionType === "scale" ? onScaleToggle : onClick}
          src={`${import.meta.env.BASE_URL}/assets/RadioUnchecked.svg`}
          style={{width: width}}
        />
      )}
    </>
  );
}

export default RadioButton;
