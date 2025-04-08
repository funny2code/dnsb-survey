import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChoiceList } from "../../store/surveys";
import {
  setIsChoiceAllowed,
  setIsRecording,
  setIsTalking,
} from "../../store/appStates";
import Button from "../Button";
import "../../css/AnswerCueButtons.css";
import "../../css/button.css";

export default function AnswerCueButtons({
  classContinue,
  classRoundup,
  onAddToStory,
  canContinue,
  canRoundup,
}) {
  let widget, canAddChoice;
  const dispatch = useDispatch();
  const { lastFetch, choiceList } = useSelector(
    (state) => state.entities.surveys
  );
  const { isRecording, isTalking, isChoiceAllowed } = useSelector(
    (state) => state.entities.appStates
  );

  useEffect(() => {
    if (lastFetch) {
      widget = lastFetch.reply
        ? lastFetch.reply.blanks[0].widget
        : lastFetch.blanks[0].widget;
      canAddChoice =
        (widget === "ring" && choiceList.length < 6) ||
        widget == "barrel" ||
        lastFetch.methodInput == "trad";
    }
    dispatch(setIsChoiceAllowed(canAddChoice));

  }, [canAddChoice]);

  const handleTalk = () => {
    if (isChoiceAllowed) {
      dispatch(setIsTalking(true));

      if (isTalking) dispatch(setIsTalking(false));
      if (isRecording) dispatch(setIsRecording(false));
    }
  };

  const handleContinue = () => {
    if (canContinue) {
      onAddToStory;
    }
  };
  const handleRoundup = () => {
    let updatedChoiceList;
    if (canRoundup) {
      const choices = choiceList.map((choice) => {
        return choice.name;
      });
      const values = choiceList.map((choice) => {
        return Number(choice.value);
      });

      // Calculate the total
      const total = values.reduce(
        (sum, value) => Number(sum) + Number(value),
        0
      );

      // Calculate the amount to distribute
      const amountToDistribute = Math.min(5, 100 - total); // Distribute up to 5 or the remaining amount to reach 100

      if (amountToDistribute > 0) {
        // Calculate proportions

        const proportions = values.map((value) => value / total);

        // Calculate the distribution for each choice
        const distribution = proportions.map((proportion) =>
          Math.round(proportion * amountToDistribute)
        );

         updatedChoiceList = choiceList.map((choice, index) => ({
          ...choice,
          value: Number(choice.value) + distribution[index],
        }));

        const updatedTotal = updatedChoiceList.reduce(
          (sum, choice) => sum + choice.value,
          0
        );

        if (updatedTotal !== 100) {
          // Find the index of the choice with the highest value
          const highestValueIndex = updatedChoiceList.reduce(
            (maxIndex, choice, index, arr) =>
              choice.value > arr[maxIndex].value ? index : maxIndex,
            0
          );

          // Add 1 to the highest value
          updatedChoiceList[highestValueIndex].value += 1;
        }
      }
    }
    dispatch(updateChoiceList(updatedChoiceList));
  };

  return (
    <>
      <div className="answer_queue_buttons">
        <Button
          onClick={handleTalk}
          className={
            isChoiceAllowed ? "accent button-small" : "disabled button-small"
          }
          label={
            isTalking
              ? "CANCEL"
              : isRecording
              ? "Transcribing..."
              : "ADD CHOICE TO LIST"
          }
        />
        {canRoundup ? (
          <Button
            onClick={handleRoundup}
            className={`${classRoundup} button-small`}
            label={"ROUNDUP"}
          />
        ) : (
          <Button
            onClick={canContinue ? onAddToStory : handleContinue}
            className={`${classContinue} button-small`}
            label={"CONTINUE"}
          />
        )}
      </div>
    </>
  );
}
