import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import addUserChoice from "../../utilities/addUserChoice";
import Timer from "../../utilities/Timer";
import exitProgram from "../../utilities/exitProgram";
import timerArrow from "../../utilities/timerArrow";
import { listWarning } from "../../utilities/showWarning";
import markUserChoice from "../../utilities/addToOrSubmit";

import {
  loadSurveys,
  addToStory,
  moveToPreviousItem,
  updateChoiceList,
} from "../../store/surveys";
import { savePauseTimer, saveSessionTimer } from "../../store/timers";
import {
  setScrollSpeed,
  setSeenRank,
  setSeenCheckbox,
  setAddedChoiceCounter,
} from "../../store/elements";
import { storyAdded } from "../../store/responses";
import {
  setIsRecording,
  setIsTalking,
  setIsRunning,
} from "../../store/appStates";

import Barrel from "../composed/Barrel";
import Bar from "../composed/Bar";
import Ring from "../composed/Ring";
import Triad from "../composed/Triad";
import Talk from "../composed/Talk";

import Teleprompter from "../standalone/Teleprompter";
import Swipe from "../standalone/Swipe";
import Warning from "../standalone/Warning";
import List from "../standalone/List";

import Cue from "../Cue";
import Logo from "../Logo";
import Edge from "../Edge";
import Button from "../Button";
import Loader from "../standalone/Loader";
import Copyright from "../standalone/Copyright";

const ActiveMode = () => {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null); // Ref to store the animation frame ID
  const scrollOffset = useRef(0); // Ref to track fractional scrolling
  const location = useLocation();
  const session = location.search;
  const initialDuration = 60;
  let questionType, heading, instruction, widget, blankName;
  const initialPauseDuration = 10;
  const [widgetOutAnimation, setWidgetOutAnimation] = useState("");
  const [arrowColor, setArrowColor] = useState("gray"); // Initial SVG color
  const [timerLabel, setTimerLabel] = useState("PENDING");
  const [error, setError] = useState("");
  const [story, setStory] = useState("");
  const [newChoice, setNewChoice] = useState([]);
  const [duration, setDuration] = useState(initialDuration);
  const [pauseDuration, setPauseDuration] = useState(initialDuration);
  const [countDirection, setCountDirection] = useState("");
  const [totalTime, setTotalTime] = useState();
  const [transcript, setTranscript] = useState("");
  const [activeRow, setActiveRow] = useState();
  const [rankRatePass, setRankRatePass] = useState(false);
  const [ringPass, setRingPass] = useState(false);
  const [radioPass, setRadioPass] = useState(false);
  const [checkboxPass, setCheckboxPass] = useState(false);
  const [selectEnough, setSelectEnough] = useState(false);
  const [barPass, setBarPass] = useState(false);
  const [scalePass, setScalePass] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // State to track scrolling status
  const [clickUnusableBtn, setClickUnusableBtn] = useState(false);
  const [showPauseWarning, setShowPauseWarning] = useState(false);
  const [showWidget, setShowWidget] = useState(true);
  const [buttonLabel, setButtonLabel] = useState("");
  const [blinking, setBlinking] = useState(true);
  const colors = [
    "#9747FF",
    "#00659B",
    "#B1D348",
    "#5E3660",
    "#E84560",
    "#FFE600",
  ];

  const canUsePause = pauseDuration > 0 || (isRunning && pauseDuration > 0);

  const dispatch = useDispatch();
  const { list, lastFetch, currentIndex, choiceList } = useSelector(
    (state) => state.entities.surveys
  );
  const { sessionTimer, pauseTimer } = useSelector(
    (state) => state.entities.timers
  );
  const storeStory = useSelector((state) => state.entities.responses.story);
  const {
    ringTotal,
    seenCheckbox,
    seenRank,
    scrollSpeed,
    exceedMaxNumber,
    exceedMaxWord,
  } = useSelector((state) => state.entities.elements);
  const { isRunning, isTalking, isRecording } = useSelector(
    (state) => state.entities.appStates
  );
  const meetWidgetCondition =
    barPass ||
    ringPass ||
    rankRatePass ||
    radioPass ||
    checkboxPass ||
    scalePass;
  const meetListCondition =
    choiceList.some((choice) => choice.value) && widget == "";

  if (lastFetch) {
    const data = lastFetch.reply
      ? lastFetch.reply.blanks[0]
      : lastFetch.blanks[0];
    questionType = data.questionType;
    heading = data.heading;
    instruction = data.instruction;
    widget = data.widget;
    blankName = data.name;
  }

  // Warnings
  const ringFail = (ringTotal < 100 && ringTotal > 94) || ringTotal > 100;
  const showCheckboxWarning =
    questionType == "multipleChoice" ||
    (questionType == "checkbox" &&
      !seenCheckbox &&
      choiceList.filter((choice) => choice.value === 1).length);
  const showRankWarning =
    questionType === "rank" &&
    !seenRank &&
    choiceList.some((choice) => choice.value > 1);

  // API call with Redux
  useEffect(() => {
    if (list.length === 0) {
      dispatch(loadSurveys({ session }));
    }
    if (lastFetch) {
      const data = lastFetch.reply || lastFetch;

      const newChoiceList = data.blanks[0].choiceList.map((choice, index) => ({
        ...choice,
        value: 0,
        scales: [0, 0, 0, 0, 0, 0],
        color: choice.text.toLowerCase() != "others" ? colors[index] : null,
      }));
      setStory(data.story);
      dispatch(updateChoiceList(newChoiceList));
      setCountDirection(data.countDirection);
      if (currentIndex < 1) {
        setDuration(data.durationInMin * 60);
        setPauseDuration(data.pauseDuration * 60);
        setTotalTime(data.durationInMin * 60);
      }
    }
  }, [list, lastFetch]);

  useEffect(() => {}, [story, showWidget]);

  useEffect(() => {
    if (meetWidgetCondition || meetListCondition) {
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setBlinking((prev) => !prev);
        }, 300);

        setTimeout(() => {
          clearInterval(intervalId);
          setBlinking(true);
        }, 1500);
      });
    }
  }, [meetListCondition, meetWidgetCondition]); // Blinking effect for the button

  useEffect(() => {
    if (pauseDuration < 1) {
      dispatch(setIsRunning(true));
    }
  }, [pauseDuration]); // Resume Survey when pause timeout
  useEffect(() => {
    if (duration < 1) {
      console.log("Time is up");
      window.location.href = "/finish/timeout";
    }
  }, [duration]); // Redirect when time is up

  useEffect(() => {
    // Push initial state to the history stack
    window.history.pushState({ custom: true }, "custom");
    // Listen for back button navigation
    const handlePopState = (event) => {
      if (event.state && event.state.custom) {
        if (currentIndex > 0) {
          // Dispatch an action to move to the previous item in the list
          dispatch(moveToPreviousItem());
          const previousQuestion = list[currentIndex] || null;
          const data = previousQuestion.survey.reply;
          const newChoiceList = data.blanks[0].choiceList.map(
            (choice, index) => ({
              // Reinitializing value to 0
              ...choice,
              value: 0,
              scales: [0, 0, 0, 0, 0, 0],
              color: colors[index],
            })
          );
          setStory(data.story);
          dispatch(updateChoiceList(newChoiceList));
          setCountDirection(data.countDirection);
        } else {
          history.back();
        }
      } else {
        // Let the default navigation occur if it's not a custom state
        history.back();
      }
    };

    // Attach the popstate event listener
    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch, currentIndex]);

  // Timers
  useEffect(() => {
    let timerId;

    if (isRunning) {
      const startTime = Date.now();
      // Save start time and duration to Redux
      dispatch(saveSessionTimer({ startTime, remainingTime: duration }));

      timerId = setInterval(() => {
        setDuration((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    } else {
      const startTime = Date.now();
      dispatch(savePauseTimer({ startTime, remainingTime: pauseDuration }));

      timerId = setInterval(() => {
        setPauseDuration((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isRunning, duration, pauseDuration]);

  // Save timer to store every sec
  useEffect(() => {
    if (sessionTimer.startTime && isRunning) {
      const elapsed = Math.floor((Date.now() - sessionTimer.startTime) / 1000);
      setDuration(Math.max(sessionTimer.remainingTime - elapsed, 0));
    }

    if (pauseTimer.startTime && !isRunning) {
      const elapsed = Math.floor((Date.now() - pauseTimer.startTime) / 1000);
      setPauseDuration(Math.max(pauseTimer.remainingTime - elapsed, 0));
    }
  }, [isRunning]);

  // Speech Recognition
  useEffect(() => {
    let recognition;

    if (isRecording) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();

      recognition.onstart = () => {};

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognition.onend = () => {
        dispatch(setIsRecording(false));
      };

      recognition.continuous = true;
      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isRecording]);

  // Setting individual condition for widgets and question types
  useEffect(() => {
    if (widget == "ring") {
      setRingPass(
        choiceList.reduce((sum, choice) => sum + Number(choice.value), 0) ===
          100
        // && choiceList.every((choice) => choice.value > 0)
      );
    }

    if (
      questionType == "singleChoice" ||
      questionType == "radio" ||
      widget == "triangle"
    ) {
      setRadioPass(
        choiceList.filter((choice) => choice.value === 1).length === 1
      ); //handles when only one choice is selected and exclude checkbox
    }

    if (questionType == "multipleChoice") {
      const list = choiceList.filter((choice) => choice.value === 1).length;
      setCheckboxPass(list >= 3);
      setSelectEnough(list < 3 && list >= 1);
    }

    if (widget == "bar") {
      setBarPass(choiceList.length == 1 && choiceList[0].value > 1);
    }

    if (choiceList.length)
      setRankRatePass(
        choiceList.every((choice) => choice.value > 0 && choice.value <= 6)
      );

    if (questionType === "scale") {
      setScalePass(
        choiceList.every((choice) => choice.scales.some((scale) => scale === 1))
      );
    }

    handleCancel(); // Quit Talk interface if choiceList chages
  }, [choiceList]);

  // Rate the performance of the respondent
  useEffect(() => {
    const timerInterval = setInterval(() => {
      const percentage = (duration / totalTime) * 100;
      const performance = timerArrow(percentage);
      setArrowColor(performance.arrowColor);
      setTimerLabel(performance.timerLabel);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [duration]);

  useEffect(() => {}, [newChoice, widgetOutAnimation]);

  // Function to handle scrolling up
  const scrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: -50, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  // Function to handle scrolling down
  const scrollDown = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      // Check if there's more content to scroll
      if (scrollTop + clientHeight < scrollHeight) {
        setIsScrolling(true); // Set scrolling to active
        scrollOffset.current += scrollSpeed; // Accumulate fractional scrolling

        if (scrollOffset.current >= 1) {
          const scrollAmount = Math.floor(scrollOffset.current);
          containerRef.current.scrollTop += scrollAmount;
          scrollOffset.current -= scrollAmount;
        }

        animationFrameRef.current = requestAnimationFrame(scrollDown); // Continue scrolling
      } else {
        // Stop scrolling when the bottom is reached
        stopScrolling();
      }
    }
  };

  const stopScrolling = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsScrolling(false); // Set scrolling to inactive
  };

  useEffect(() => {
    // Start scrolling automatically when the component mounts
    animationFrameRef.current = requestAnimationFrame(scrollDown);

    // Cleanup the animation frame when the component unmounts
    return () => stopScrolling();
  }, []);

  const navigate = useNavigate();

  const handlePause = () => {
    if (!canUsePause) {
      setShowPauseWarning(true);
      setTimeout(() => {
        setShowPauseWarning(false);
      }, 10000);
    }

    dispatch(
      saveSessionTimer({
        startTime: sessionTimer.startTime,
        remainingTime: duration,
      })
    );

    if (pauseDuration > 0) {
      dispatch(
        savePauseTimer({
          startTime: pauseTimer.startTime,
          remainingTime: pauseDuration,
        })
      );
    }
    if (pauseDuration > 0) dispatch(setIsRunning(!isRunning));
  };

  const handleEdge = () => {
    dispatch(setIsRunning(!isRunning));
    navigate("/");
  };

  const handleAddToStory = async () => {
    dispatch(setScrollSpeed(0.3)); // Slow down the scroll speed
    dispatch(setAddedChoiceCounter(0)); // Reset the choice counter

    animationFrameRef.current = requestAnimationFrame(scrollDown); // Scroll down the story
    setWidgetOutAnimation("animate__bounceOut"); // Animate the outgoing widget

    const regex = new RegExp(`_{1,}[?]?[a-z]?_{1,}`);
    let formData = [];
    let markedUserChoice = "";

    //  handles ring, rank and rate
    if (ringPass || rankRatePass) {
      if (!seenRank) dispatch(setSeenRank(true));
      formData = markUserChoice(widget, questionType, choiceList).formData;
      markedUserChoice = markUserChoice(
        widget,
        questionType,
        choiceList
      ).processedChoice;
    }

    // choseOne handle radio and triangle
    if (radioPass && !barPass) {
      formData = markUserChoice(widget, questionType, choiceList).formData;
      markedUserChoice = markUserChoice(
        widget,
        questionType,
        choiceList
      ).processedChoice;
    }

    // Handle checkbox case
    if (checkboxPass) {
      if (!seenCheckbox) dispatch(setSeenCheckbox(true));
      formData = markUserChoice(widget, questionType, choiceList).formData;
      markedUserChoice = markUserChoice(
        widget,
        questionType,
        choiceList
      ).processedChoice;
      console.log("form data:", formData);
      console.log("markedUserChoice:", markedUserChoice);
    }

    // This handle bar
    if (barPass) {
      formData = markUserChoice(widget, questionType, choiceList).formData;
      markedUserChoice = markUserChoice(
        widget,
        questionType,
        choiceList
      ).processedChoice;
    }

    // Handle scale
    if (scalePass) {
      formData = markUserChoice(widget, questionType, choiceList).formData;
      markedUserChoice = markUserChoice(
        widget,
        questionType,
        choiceList
      ).processedChoice;
    }

    if (meetWidgetCondition) {
      dispatch(storyAdded(addUserChoice(regex, story, markedUserChoice)));
      //console.log("before Redirecting to finish page " + list[list.length - 1].name +  "===" + list[list.length - 2].name);
      console.log("before Redirecting to finish page, list=", list);
      if (list[list.length - 1].name === list[list.length - 2].name) {
        setTimeout(() => {
          console.log("Redirecting to finish page");
          navigate("/finish/endOfSurvey");
        }, 5000);
      } // Redirect to finish page when the story is complete

      // Set all conditions to false
      setRingPass(false);
      setRankRatePass(false);
      setRadioPass(false);
      setBarPass(false);
      setCheckboxPass(0);
      setScalePass(false);
      setActiveRow(null);
      setWidgetOutAnimation("");

      // Get the next question
      addToStory(formData)(dispatch);
      const response = lastFetch.reply;
      if (meetWidgetCondition) {
        if (response && response.story) {
          const newChoiceList = response.blanks[0].choiceList.map(
            (choice, index) => ({
              ...choice,
              value: 0,
              scales: [0, 0, 0, 0, 0, 0],
              color: colors[index],
            })
          );
          setStory(response.story);
          dispatch(updateChoiceList(newChoiceList));
        }
      }
      // Don't show widget for a while
      // setShowWidget(false);
      // setTimeout(() => {
      //   setShowWidget(true);
      // }, 4000);
    }
  };

  const handlePreview = () => {
    if (typeof storeStory === "string") {
      // Ensure story has been added to activate button
      navigate("/preview");
    }
  };

  const handleRecord = () => {
    setTranscript("");
    dispatch(setIsRecording(!isRecording)); // Toggle recording state
  };

  const handleErase = () => {
    setTranscript("");
  };

  const handleCancel = () => {
    dispatch(setIsRecording(false));
    dispatch(setIsTalking(false));
    setTranscript("");
  };

  const handleDone = () => {
    const respondentChoiceList = newChoice.split().map(
      (choice) =>
        choice.length && {
          name: "",
          text: choice,
          value: 0,
          scales: [0, 0, 0, 0, 0, 0],
        }
    );

    if (transcript.length) {
      dispatch(setIsRecording(false));
      dispatch(setIsTalking(false));
      // respondentChoiceList.pop(); // Remove the empty item in the array

      dispatch(updateChoiceList([...respondentChoiceList, ...choiceList]));
    }
  };

  const handleNewChoices = (respondentChoiceList) => {
    setNewChoice(respondentChoiceList);
    setTranscript(respondentChoiceList);
  };

  const handleUnavailable = (label) => {
    setButtonLabel(label);
    setClickUnusableBtn(true);
    setTimeout(() => {
      setClickUnusableBtn(false);
    }, 3000);
  };
  const handleExit = () => {
    exitProgram();
    navigate("/exit");
  };

  const handleUpdateChoiceList = (data) => {
    dispatch(updateChoiceList(data));
  };

  return (
    <main className="main-container">
      <ToastContainer />
      <section className="top-section">
        <div className="logo">
          <Logo />
        </div>
        <div className="header">
          <Edge onClick={handleEdge} />

          {isRunning ? (
            <Timer
              duration={duration}
              label={timerLabel}
              arrowColor={arrowColor}
              isRunning={isRunning}
            />
          ) : (
            <Timer
              duration={pauseDuration}
              label={"BACK IN"}
              arrowColor={"grey"}
            />
          )}

          <div className="top_button-group">
            <Button label="START" className={"disabled top_button"} />
            <Button
              label={isRunning ? "PAUSE" : "RESUME"}
              className={
                pauseDuration > 0
                  ? "primary top_button "
                  : "disabled top_button"
              }
              onClick={handlePause}
            />
          </div>
        </div>
      </section>
      <section className="middle-section">
        <div className="body_content">
          <div className="story_queue-group">
            <div className="scroll_arrow-group ">
              <img
                src={`${import.meta.env.BASE_URL}/assets/Arrow Up.svg`}
                className="scroll_arrow-up teleprompter-buttons"
                onClick={scrollUp}
              />
              <img
                src={`${import.meta.env.BASE_URL}/assets/Arrow Up.svg`}
                className="scroll_arrow-down teleprompter-buttons"
                onClick={scrollDown}
              />
            </div>
            {
              <Cue className={" question"}>
                {lastFetch === null && <Loader />}
                {isTalking ? (
                  <Talk
                    onRecord={handleRecord}
                    onErase={handleErase}
                    onCancel={handleCancel}
                    onDone={handleDone}
                    onSetNewChoices={handleNewChoices}
                    isRecording={isRecording}
                    transcript={transcript}
                  />
                ) : (
                  <Teleprompter
                    story={
                      widget
                        ? storeStory.length
                          ? storeStory + "" + story
                          : story
                        : story
                    } // If widget is set, append the story otherwise show individual question
                    containerRef={containerRef}
                  />
                )}
                {ringFail && (
                  <Warning
                    style={"warning"}
                    message={
                      "Your ring total does not sum to the required number. Adjust your values or if within 5% of required sum you can press Round Up."
                    }
                  />
                )}
                {setAddedChoiceCounter >= 3 && (
                  <Warning
                    style={"warning"}
                    message={"Reached Max Choice Allowed"}
                  />
                )}
                {clickUnusableBtn && (
                  <Warning
                    style={"warning"}
                    message={
                      buttonLabel === "pdf it"
                        ? "Complete Your Story to Use"
                        : "Coming soon"
                    }
                  />
                )}
                {showPauseWarning && (
                  <Warning
                    style={"warning"}
                    message={"Pause is not available at this time."}
                  />
                )}
                {showRankWarning ? (
                  <Warning
                    style={"warning"}
                    message={"Rank all items to proceed"}
                  />
                ) : showCheckboxWarning ? (
                  <Warning
                    style={"warning"}
                    message={"Select at least 3 but less than 7 Items"}
                  />
                ) : listWarning(exceedMaxWord) ? (
                  <Warning
                    style={"warning"}
                    message={"Cannot exceed 10 words"}
                  />
                ) : listWarning(exceedMaxNumber) ? (
                  <Warning
                    style={"warning"}
                    message={"The maximum number allowed is 100"}
                  />
                ) : null}
              </Cue>
            }
          </div>
          <div className="middle_buttons-group">
            <Button
              onClick={handleAddToStory}
              label={widget ? "ADD TO STORY" : "SUBMIT"}
              className={
                widget && meetWidgetCondition && blinking
                  ? "primary"
                  : meetListCondition && blinking
                  ? "primary"
                  : "disabled"
              }
            />
            <Button
              onClick={handlePreview}
              label="PREVIEW"
              className={
                typeof storeStory === "string"
                  ? "middle_button primary"
                  : "middle_button disabled"
              }
            />
          </div>
          <div className="story_queue-single">
            <Cue className={"answer"}>
              {lastFetch === null && <Loader />}
              {widget === "barrel" && showWidget ? (
                <>
                  <Barrel
                    widgetOutAnimation={widgetOutAnimation}
                    heading={heading}
                    choiceList={choiceList}
                    questionType={questionType}
                    instruction={instruction}
                    isRecording={isRecording}
                    onSetChoiceList={handleUpdateChoiceList}
                    onSetAllChoiceHaveValue={setRankRatePass}
                    onSetActiveRow={(row) => {
                      setActiveRow(row);
                    }}
                  />
                </>
              ) : widget === "bar" && showWidget ? (
                <Bar widgetOutAnimation={widgetOutAnimation} />
              ) : widget === "ring" && showWidget ? (
                <Ring
                  widgetOutAnimation={widgetOutAnimation}
                  heading={heading}
                  choiceList={choiceList}
                  instruction={instruction}
                  isRecording={isRecording}
                  ringPass={ringPass}
                  onSetAllChoiceHaveValue={setRankRatePass}
                  onAddToStory={handleAddToStory}
                />
              ) : widget === "triade" && showWidget ? (
                <Triad
                  widgetOutAnimation={widgetOutAnimation}
                  heading={heading}
                  instruction={instruction}
                />
              ) : lastFetch != null && showWidget ? (
                <List questionType={questionType} />
              ) : null}

              {meetWidgetCondition ? (
                <Swipe handleAddToStory={handleAddToStory} />
              ) : (
                ""
              )}
            </Cue>
          </div>
        </div>
      </section>
      <section className="bottom-section">
        <div className="bottom_buttons">
          <Button
            label="COMPARE"
            onClick={() => handleUnavailable("compare")}
            className={`bottom_button`}
          />
          <Button
            onClick={handleExit}
            label="EXIT"
            className={`bottom_button primary`}
          />
          <Button
            onClick={() => handleUnavailable("pdf it")}
            label="PDF IT"
            className={`bottom_button`}
          />
        </div>
      </section>
      <Copyright />
    </main>
  );
};

export default ActiveMode;
