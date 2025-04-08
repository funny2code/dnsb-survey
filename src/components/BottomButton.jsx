import React from "react";
import Button from "./Button";
import "../css/bottomButton.css";

export default function BottomButton({
  classNameA,
  classNameC,
  classNameD,
}) {


  return (
    <div className="bottom_buttons">
        <Button
          label="COMPARE"
          className={`${classNameA} bottom_button`}
        />
        <Button
          label="EXIT"
          className={`${classNameD} bottom_button`}
        />
        <Button
          label="PDF IT"
          className={`${classNameC} bottom_button`}
        />
    </div>
  );
}
