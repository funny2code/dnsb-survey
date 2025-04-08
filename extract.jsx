import React, { useState, useRef, useEffect } from "react";

function ActiveModePage() {
  const [duration, setDuration] = useState(0);

  console.log(duration);

  const fetchSurvey = async () => {
    try {
      const survey = await getSurvey();
      const data = survey.data;

      setStory(data.story);
      setQuestionType(data.blank.questionType);
      setWidget(data.blank.widget);
      setHeading(data.blank.heading);
      setChoiceList(data.blank.choiceList);
      setInstruction(data.blank.instruction);
      setDuration(data.durationInMin * 60);
      if (data.blank.children.length) {
        setIsFollowUp(true);
      }
    } catch (error) {
      setError("Error with POST request");
      toast("Something Failed");
    }
  };
  fetchSurvey();

  useEffect(() => {
    const timerId = setInterval(() => {
      setDuration((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [duration]);

  return <Timer duration={duration} label={"PENDING"} />;
}
