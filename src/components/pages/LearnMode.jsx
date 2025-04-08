import React from "react";
import { useSelector } from "react-redux";

import BottomButton from "../BottomButton";
import EdgeChair from "../EdgeChair";
import MiddleButton from "../MiddleButton";
import Cue from "../Cue";
import TopButton from "../composed/TopButton";
import EdgeStanding from "../EdgeStanding";
import Timer from "../../utilities/Timer";
import Logo from "../Logo";
import NavigatorButtons from "../composed/NavigatorButtons";
import ArrowPointer from "../standalone/ArrowPointer";
import Teleprompter from "../standalone/Teleprompter";
import Barrel from "../composed/Barrel";
import Ring from "../composed/Ring";
import Bar from "../composed/Bar";
import Triad from "../composed/Triad";
import Copyright from "../standalone/Copyright";

import elements from "../../services/learnMode";
import fakeSurvey from "../../services/fakeSurvey";

import "../../css/LearnMode.css";

export default function LearnMode() {
  const index = useSelector((state) => state.entities.elements.index);
  const questionTypeIndex = useSelector(
    (state) => state.entities.elements.questionTypeIndex
  );

  const title = elements[index].title;
  const description = elements[index].description;
  const widget = elements[index].widget;
  const style = "to_" + elements[index].name;;

  const choiceList = fakeSurvey.choiceList;
  const heading = fakeSurvey.heading;
  const questionType = fakeSurvey.questionType[questionTypeIndex];
  const instruction = fakeSurvey.instruction;

  return (
    <main className="main-container">
      <ArrowPointer style={style} />
      <section className="top-section">
        <div className="logo">
          <Logo />
        </div>
        <div className="header">
          <EdgeChair />

          <Timer duration={600} label={"PENDING"} />
          <TopButton classNameA={"learn"} classNameB={"learn"} />
        </div>
      </section>

      <section className="middle-section">
        <div className="body_content">
          <div className="story_queue-group ">
            <Cue className={"question"}>
              <EdgeStanding src={`${import.meta.env.BASE_URL}/assets/Edge_Emotional_States_Hands_Back_Blue.svg`} />
              <Teleprompter>
                <p>
                  Hello I'm Edge and you are currently in{" "}
                  <span>Learn Mode</span> to exit press the{" "}
                  <a href="/welcome">
                    <span>EXIT</span>
                  </a>{" "}
                  button.
                </p>
                <NavigatorButtons />
              </Teleprompter>
              <NavigatorButtons />
            </Cue>
          </div>

          <MiddleButton classNameA={"learn"} classNameB={"learn"} />

          <div className="story_queue-single">
            <Cue className={"answer learnmode-cue"}>
              {widget === "ring" ? (
                <Ring choiceList={choiceList} />
              ) : widget === "bar" ? (
                <Bar choiceList={choiceList} />
              ) : widget === "triad" ? (
                <Triad choiceList={choiceList} />
              ) : widget === "barrel" ? (
                <Barrel
                  heading={heading}
                  choiceList={choiceList}
                  questionType={questionType}
                  instruction={instruction}
                />
              ) : (
                <p>
                  <span>{title}</span>
                  <br />
                  {description}.
                </p>
              )}
            </Cue>
          </div>
        </div>
      </section>

      <section className="bottom-section">
        <BottomButton
          classNameA={"learn"}
          classNameB={"learn"}
          classNameC={"learn"}
          classNameD={"learn"}
        />
      </section>
      <Copyright />
    </main>
  );
}
