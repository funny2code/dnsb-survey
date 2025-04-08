import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateChoiceList } from "../../store/surveys";
import { setIsTalking } from "../../store/appStates";
import capitalizeWords from "../../utilities/capilizeWords";
import RadioButton from "./RadioButton";
import Checkbox from "./Checkbox";
import Rank from "./Rank";
import Rate from "./Rate";
import Control from "../standalone/Control";
import "../../css/BarrelTable.css";

const BarrelTable = ({
  onScaleToggle,
  onSetActiveRow,
  questionType,
  heading,
}) => {
  const dispatch = useDispatch();
  const { choiceList, lastFetch } = useSelector(
    (state) => state.entities.surveys
  );

  const containerRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [activeRow, setActiveRow] = useState(null);
  const visibleRows = 10; // Display exactly 10 rows or less
  const rowHeight = 177 / visibleRows; // Calculate height for each row
  const centerIndex = Math.floor(scrollOffset / rowHeight) + 2;
  const isScrollable = choiceList.length >= visibleRows;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollOffset(containerRef.current.scrollTop);
      }
    };
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    onSetActiveRow(activeRow);
  }, [activeRow]);

  const handleScaleToggle = (choice, rowIndex, colIndex) => {
    onScaleToggle(choice, rowIndex, colIndex);
  };

  const handleRadioToggle = (choice) => {
    const updatedChoiceList = choiceList.map((item) => {
      const newValue = item.text === choice.text ? 1 : 0;
      return { ...item, value: newValue };
    });

    dispatch(updateChoiceList(updatedChoiceList));
  };

  const handleCheckToggle = (choice) => {
    const updatedChoiceList = choiceList.map((item) => {
      if (item.text === choice.text) {
        const newValue = item.value === 0 ? 1 : 0;
        const selectedCount = choiceList.filter(
          (item) => item.value === 1
        ).length;
        if (newValue === 1 && selectedCount >= 6) {
          return item;
        }
        return { ...item, value: newValue };
      }
      return item;
    });

    dispatch(updateChoiceList(updatedChoiceList));
  };

  const handleRate = (choice) => {
    if (choice.value < 5) {
      const updatedChoiceList = choiceList.map((item) => {
        const newValue =
          item.text === choice.text ? item.value + 1 : item.value;
        return { ...item, value: newValue };
      });

      dispatch(updateChoiceList(updatedChoiceList));
    }
  };

  const handleRank = (choice) => {
    const existingValues = choiceList.map((item) => item.value);

    if (choice.value < 6) {
      // 2. Find the next available value
      let newValue = choice.value + 1;

      while (existingValues.includes(newValue)) {
        newValue++;
        if (newValue > 6) {
          // Prevent infinite loop if no values are available
          return;
        }
      }

      const updatedChoiceList = choiceList.map((item) => {
        return {
          ...item,
          value: item.text === choice.text ? newValue : item.value,
        };
      });

      dispatch(updateChoiceList(updatedChoiceList));
    }
  };

  const handleIncrement = () => {
    if (activeRow != null) {
      const choice = choiceList[activeRow];
      if (questionType == "rank") {
        handleRank(choice);
      } else {
        handleRate(choice);
      }
    }
  };
  const handleDecrement = () => {
    let updatedChoiceList;
    const existingValues = choiceList.map((choice) => choice.value);
    const activeChoice = activeRow >= 0 && choiceList[activeRow];
    let newValue = activeChoice.value > 0 ? activeChoice.value - 1 : 0;

    if (questionType === "rank") {
      while (existingValues.includes(newValue)) {
        newValue--;
        if (newValue < 0) {
          newValue = 0; // Prevent negative values and use ? instead
          break;
        }
      }
    }

    updatedChoiceList = choiceList.map((choice) => {
      newValue = questionType === "rank" ? newValue : choice.value - 1;
      return {
        ...choice,
        value: choice.text === activeChoice.text ? newValue : choice.value,
      };
    });

    dispatch(updateChoiceList(updatedChoiceList));
  };

  const handleItemSelect = (choice, rowIndex) => {
    if (choice.toLowerCase().startsWith("other")) { 
      console.log(choice.text)
      handleTalk();
    }
    setActiveRow(rowIndex);
  };

    const handleTalk = () => {
      dispatch(setIsTalking(true));
  };
  
  return (
    <>
      <div className="barrel-table__heading">{heading || "HEADING"} </div>
      <div className="barrel-table-container">
        <div
          className="barrel-table"
          ref={containerRef}
          style={{
            overflowY: isScrollable ? "auto" : "hidden",
          }}
        >
          {choiceList.map((choice, rowIndex) => {
            const prominenceFactor = Math.abs(centerIndex - rowIndex);
            return (
              <div
                key={rowIndex}
                onClick={() => handleItemSelect(choice.text, rowIndex)}
                className={
                  rowIndex === activeRow ? "active-row table-row" : "table-row"
                }
                style={{
                  transform: `scale(${1 - prominenceFactor * 0.001}) rotateX(${
                    prominenceFactor * 1
                  }deg)`,
                  // opacity: `${1 - prominenceFactor * 0.05}`,
                }}
              >
                {[...Array(questionType === "scale" ? 4 : 2)].map(
                  (_, colIndex) => (
                    <div
                      key={colIndex}
                      className={`table-cell ${
                        colIndex === 0 ? "first-column" : ""
                      }`}
                    >
                      {colIndex === 0 ? (
                        capitalizeWords(choice.text)
                      ) : colIndex === 1 && questionType !== "scale" ? (
                        questionType === "singleChoice" &&
                        !choice.text.toLowerCase().startsWith("other") ? (
                          <RadioButton
                            className="radio"
                            questionType={questionType}
                            isChecked={choice.value}
                            onClick={() => handleRadioToggle(choice)}
                            isScrollable={isScrollable}
                            length={choiceList.length}
                          />
                        ) : questionType === "multipleChoice" &&
                          !choice.text.toLowerCase().startsWith("other") ? (
                          <Checkbox
                            className="checkbox"
                            isChecked={choice.value}
                            onClick={() => handleCheckToggle(choice)}
                            isScrollable={isScrollable}
                            choiceList={choiceList}
                            length={choiceList.length}
                          />
                        ) : questionType === "rank" &&
                          !choice.text.toLowerCase().startsWith("other") ? (
                          <Rank
                            className="rank"
                            onClick={() => handleRank(choice)}
                            rank={choice.value}
                            isScrollable={isScrollable}
                            length={choiceList.length}
                          />
                        ) : questionType === "rate" &&
                          !choice.text.toLowerCase().startsWith("other") ? (
                          <Rate
                            className={"rate"}
                            onClick={() => handleRate(choice)}
                            rate={choice.value}
                            isScrollable={isScrollable}
                            length={choiceList.length}
                          />
                        ) : (
                          ""
                        )
                      ) : (
                        <RadioButton
                          className="radio"
                          questionType={questionType}
                          isChecked={choice.scales[colIndex] === 1}
                          onScaleToggle={() =>
                            handleScaleToggle(choice, rowIndex, colIndex)
                          }
                        />
                      )}
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
      {questionType == "rank" || questionType == "rate" ? (
        <Control
          questionType={questionType} //question type
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default BarrelTable;
