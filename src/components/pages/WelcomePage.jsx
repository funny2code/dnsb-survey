import React from "react";
import { useNavigate } from "react-router-dom";
import BottomButton from "../BottomButton";
import EdgeChair from "../EdgeChair";
import MiddleButton from "../MiddleButton";
import Cue from "../Cue";
import Timer from "../../utilities/Timer";
import EdgeStanding from "../EdgeStanding";
import Logo from "../Logo";
import Button from "../Button";
import Copyright from "../standalone/Copyright";

export default function WelcomePage({ classNameA, classNameB }) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/activemode");
  };
  const handleLearn = () => {
    navigate("/learnmode");
  };

  return (
    <main className="main-container">
      <section className="top-section">
        <div className="logo">
          <Logo />
        </div>
        <div className="header">
          <EdgeChair />
          <Timer duration={600} label={"PENDING"} />
          <div className="top_button-group">
            <Button
              label="START"
              className={"primary top_button"}
              onClick={handleStart}
            />
            <Button label={"PAUSE"} className={"disabled top_button"} />
          </div>
        </div>
      </section>

      <section className="middle-section">
        <div className="body_content">
          <div className="story_queue-group learn-mode">
            <Cue className={"question"}>
              <div className="welcome-text">{"Welcome!"}</div>
              <EdgeStanding
                src={`${import.meta.env.BASE_URL}/assets/Edge_Emotional_States_Hands_Back_Blue.svg`}
                className="hands-back"
              />
            </Cue>
          </div>

          <MiddleButton classNameA="disabled" classNameB="disabled" />

          <div className="story_queue-single">
            <Cue className={"answer"}>
              <div className="welcome-text">
                <p>
                  "You can go start your survey by clicking the above START
                  button or click the LEARN button to explore the different
                  buttons and areas offered by Research Libs."
                </p>
                <Button
                  onClick={handleLearn}
                  label="LEARN"
                  className={`${classNameA} learn-btn primary`}
                />
              </div>
            </Cue>
          </div>
        </div>
      </section>

      <section className="bottom-section">
        <BottomButton
          classNameA="disabled"
          classNameB="disabled"
          classNameC="disabled"
          classNameD="disabled"
        />
      </section>
      <Copyright />
    </main>
  );
}

export function session() {
  // queryString.parse(location.search);
  const result = location.search;

  return result;
}
