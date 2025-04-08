import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateChoiceList } from "../../store/surveys";
import { sortChoiceListByName } from "../../utilities/choiceListSorter";
import AnswerCueButtons from "./AnswerCueButtons";
import Lever from "../standalone/BarrelLever";
import StickyArrow from "../standalone/StickyArrow";
import BarrelTable from "../standalone/BarrelTable";
import "../../css/barrel.css";

const Barrel = ({ questionType, heading, isRecording, widgetOutAnimation }) => {
  const { choiceList, lastFetch } = useSelector(
    (state) => state.entities.surveys
  );

  const [isDescending, setIsDescending] = useState(false);
  const [activeRow, setActiveRow] = useState();
  const dispatch = useDispatch();

  const handleUpdateActiveRow = (data) => {
    setActiveRow(data);
  };

  const handleSortToggle = () => {
    const tempChoiceList = [...choiceList];
    setIsDescending((prevIsDescending) => !prevIsDescending);
    dispatch(updateChoiceList(sortChoiceListByName(tempChoiceList, isDescending)));
  };

  const handleScaleToggle = (choice, rowIndex, colIndex) => {
    updatedChoiceList = choiceList.map((item, index) => {
      if (index === rowIndex) {
        // Update the current row's scales
        return {
          ...item,
          scales: item.scales.map((scale, idx) => (idx === colIndex ? 1 : 0)), // Only the clicked column is active in the row
        };
      }
      return item; // Other rows remain unchanged
    });
    dispatch(updateChoiceList(updatedChoiceList));
  };

  const handleRate = (choice) => {
    if (choice.value < 5) {
      onSetChoiceList((prevChoiceList) => {
        return prevChoiceList.map((item) => ({
          ...item, // Copy all other properties
          value: item.text === choice.text ? item.value + 1 : item.value,
        }));
      });
    }
  };

  const handleRank = (choice) => {
    if (choice.value < 6) {
      onSetChoiceList((prevChoiceList) => {
        // 1. Get all existing values
        const existingValues = prevChoiceList.map((item) => item.value);

        // 2. Find the next available value
        let newValue = choice.value + 1;
        while (existingValues.includes(newValue)) {
          newValue++;
          if (newValue > 6) {
            // Prevent infinite loop if no values are available
            return prevChoiceList;
          }
        }

        // 3. Update the choiceList
        return prevChoiceList.map((item) => ({
          ...item,
          value: item.text === choice.text ? newValue : item.value,
        }));
      });
    }
  };

  const widgetInAnimation = `animate__animated  animate__rollIn`;

  return (
    <div className="barrel-set">
      <div
        className={`barrel ${
          widgetOutAnimation ? widgetOutAnimation : widgetInAnimation
        }`}
      >
        {questionType !== "scale" ? (
          <StickyArrow
            type={questionType}
            widgetInAnimation={widgetInAnimation}
            widgetOutAnimation={widgetOutAnimation}
          />
        ) : (
          ""
        )}
        <img className="barrel-img" src={`${import.meta.env.BASE_URL}/assets/Barrel.png`} alt="" />

        <Lever
          isDescending={isDescending}
          onClick={handleSortToggle}
          widgetInAnimation={widgetInAnimation}
          widgetOutAnimation={widgetOutAnimation}
        />

        <BarrelTable
          onScaleToggle={handleScaleToggle}
          onSetActiveRow={handleUpdateActiveRow}
          widgetOutAnimation={widgetOutAnimation}
          questionType={questionType}
          heading={heading}
        />
      </div>
      <strong className="instruction">
        {questionType === "multipleChoice" ? "Select Up to Six" : ""}
      </strong>
      <AnswerCueButtons
        isRecording={isRecording}
        classAddAChoice={"accent"}
        classContinue={"disabled"}
        label={"CONTINUE"}
      />
    </div>
  );
};

export default Barrel;
