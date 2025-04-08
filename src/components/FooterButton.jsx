import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "../css/FooterButton.css";

export default function FooterButton({ classNameA, classNameB }) {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate(-1);
  };
  return (
    <div className="footer_buttons">
      <div className="footer_buttons-row">
        <Button label="PDF IT" className={`${classNameA} footer_button`} />
        <Button
          onClick={handleExit}
          label="EXIT"
          className={`${classNameB} footer_button`}
        />
      </div>
    </div>
  );
}
