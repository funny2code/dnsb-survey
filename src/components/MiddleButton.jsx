import React from "react";
import Button from "./Button";
import "../css/middleButton.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function MiddleButton({ classNameA, classNameB }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAddToStoryActive = location.pathname === "/LearnModeAddToStory";
  const isPreviewActive = location.pathname === "/LearnModePreview";

  const myClick = (label) => {
    if (
      label === "ADD TO STORY" &&
      (location.pathname.includes("/LearnMode") || location.pathname === "/")
    ) {
      navigate("/LearnModeAddToStory");
    } else if (
      label === "PREVIEW" &&
      (location.pathname.includes("/LearnMode") || location.pathname === "/")
    ) {
      navigate("/LearnModePreview");
    }
  };
  return (
    <div className="middle_buttons-group">
      <Button
        style={{ border: isAddToStoryActive ? "2px solid #009bfc" : "none" }}
        onClick={() => myClick("ADD TO STORY")}
        label="ADD TO STORY"
        className={`${classNameA} middle_button`}
      />
      <Button
        style={{ border: isPreviewActive ? "2px solid #009bfc" : "none" }}
        onClick={() => myClick("PREVIEW")}
        label="PREVIEW"
        className={`${classNameB} middle_button`}
      />
    </div>
  );
}
