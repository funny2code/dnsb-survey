import React from "react";
import Button from "../Button";
import "../../css/topButton.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopButton({ onClick, classNameA, classNameB }) {
  const navigate = useNavigate();

  return (
    <div className="top_button-group">
      <Button
        label="START"
        className={`${classNameA} top_button`}
        onClick={onClick}
      />
      <Button
       
        label="PAUSE"
        className={`${classNameB} top_button`}
      />
    </div>
  );
}
