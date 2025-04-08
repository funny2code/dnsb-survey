import { useEffect } from "react";
import "../../css/ArrowPointer.css";

function ArrowPointer({ style }) {
  const animation = "animate__animated animate__bounce animate__infinite";
  
  useEffect(() => {
    console.log(style);
  }, [style]);

  return (
    <img
      src={`${import.meta.env.BASE_URL}/assets/PointerArrow.svg`}
      className={`${style} ${animation} arrow_pointer`}
    />
  );
}

export default ArrowPointer;
