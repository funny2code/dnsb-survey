import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRingTotal, setActiveRow } from "../../store/elements";
import { setIsTalking } from "../../store/appStates";
import { updateChoiceList } from "../../store/surveys";
import { getScreenWidth } from "../../utilities/getScreenSize";
import {
  sortChoiceListByName,
  sortChoiceListByValue,
} from "../../utilities/choiceListSorter";
import RingTable from "../standalone/RingTable";
import RingLever from "../standalone/RingLever";
import AnswerCueButtons from "./AnswerCueButtons";
import RingSegment from "../standalone/RingSegment";
import RingDraggable from "../standalone/RingDraggable";
import IncreAndDecrePoly from "../standalone/IncreAndDecrePoly";
import "../../css/ring.css";

const Ring = ({
  heading,
  instruction,
  isRecording,
  widgetOutAnimation,
  onAddToStory,
}) => {
  const size = getScreenWidth();
  const strokeWidth = size === 170 ? 15 : 20;
  const colors = [
    "#9747FF",
    "#00659B",
    "#B1D348",
    "#5E3660",
    "#E84560",
    "#FFE600",
  ];
  const [isOthers, setIsOthers] = useState(false);
  const [segmentValue, setSegmentValue] = useState(0);
  const [isDescending, setIsDescending] = useState(false);
  const { ringTotal, activeRow } = useSelector(
    (state) => state.entities.elements
  );
  const { choiceList } = useSelector((state) => state.entities.surveys);
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    choiceList.map((choice) => {
      total += Number(choice.value); // All the values;
    });
    dispatch(setRingTotal(total));
  }, [choiceList]);

  const handleSortToggle = () => {
    const tempChoiceList = [...choiceList];
    setIsDescending((prevIsSorted) => !prevIsSorted);

    if (choiceList.filter((choice) => choice.value > 1).length) {
      dispatch(
        updateChoiceList(sortChoiceListByValue(tempChoiceList, isDescending))
      );
    } else {
      dispatch(
        updateChoiceList(sortChoiceListByName(tempChoiceList, isDescending))
      );
    }
  };

  const handleItemSelect = (choice) => {
    setIsOthers(choice.text.toLowerCase() == "others");
    if (choice.text.toLowerCase() == "others") {
      handleTalk()
    }
    dispatch(setActiveRow(choice));
    setSegmentValue(choice.value);
  };

  const handleUpdateSegmentVaue = (data) => {
    if (!isOthers) {
      setSegmentValue(data);
    }
  };

  const handleTalk = () => {
    dispatch(setIsTalking(true));
  };

  const isValidTotal = ringTotal < 100 || ringTotal > 100;
  const canContinue = ringTotal == 100;
  const canRoundup = ringTotal > 94 && ringTotal < 100;
  const widgetInAnimationRight = `animate__animated animate__zoomInRight ${widgetOutAnimation}`;
  const widgetInAnimationLeft = `animate__animated animate__zoomInLeft ${widgetOutAnimation}`;

  return (
    <div className="ring-container">
      <div className="ring-heading">
        {
          "Select an Item then Drag the outter Ring from 12 O'clock to Add Weight"
        }
      </div>
      <div className="ring-set">
        <div>
          <div
            className={`ring-list-container ${
              widgetOutAnimation ? widgetOutAnimation : widgetInAnimationLeft
            }`}
          >
            <RingLever
              sorted={isDescending}
              onClick={handleSortToggle}
              widgetInAnimationLeft={widgetInAnimationLeft}
            />
            <table className="ring-table">
              <tbody>
                {<RingTable onHandleItemSelect={handleItemSelect} />}
              </tbody>
            </table>
          </div>
          <strong
            className={`ring-instruction ${
              widgetOutAnimation ? widgetOutAnimation : widgetInAnimationLeft
            }`}
          >
            {"Select an Item"}
          </strong>
        </div>

        <div className="ring-control">
          <RingDraggable
            widgetOutAnimation={widgetOutAnimation}
            widgetInAnimationRight={widgetInAnimationRight}
            size={size}
            strokeWidth={strokeWidth}
            segmentValue={segmentValue}
            isValidTotal={isValidTotal}
            total={ringTotal}
            onSetSegmentValue={handleUpdateSegmentVaue}
          />
          <IncreAndDecrePoly
            widgetOutAnimation={widgetOutAnimation}
            widgetInAnimationRight={widgetInAnimationRight}
            onSetSegmentValue={handleUpdateSegmentVaue}
            activeRow={activeRow}
          />
          <RingSegment
            style={`ring-segment`}
            widgetOutAnimation={widgetOutAnimation}
            widgetInAnimationRight={widgetInAnimationRight}
            size={size}
            strokeWidth={strokeWidth - 3}
            colors={colors}
            total={ringTotal}
          />
        </div>
      </div>
      <div className="ring-buttons">
        <AnswerCueButtons
          isRecording={isRecording}
          classContinue={canContinue ? "accent" : "disabled"}
          classRoundup={canRoundup ? "accent" : "disabled"}
          onAddToStory={onAddToStory}
          canContinue={canContinue}
          canRoundup={canRoundup}
        />
      </div>
    </div>
  );
};

export default Ring;
