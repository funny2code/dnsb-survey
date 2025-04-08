import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChoiceList } from "../../store/surveys";
import { setExceedMaxNumber, setExceedMaxWord } from "../../store/elements";
import { setIsTalking } from "../../store/appStates";
import Rank from "./Rank";
import Control from "./Control";
import "../../css/List.css";

const List = ({ questionType }) => {
  const { choiceList } = useSelector((state) => state.entities.surveys);
  const [activeRow, setActiveRow] = useState(null);
  const [values, setValues] = useState(new Array(choiceList.length).fill(0));
  const dispatch = useDispatch();

  const handleCheckboxChange = (choice) => {
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

  const handleRadioToggle = (choice) => {
    const updatedChoiceList = choiceList.map((item) => {
      const newValue = item.text === choice.text ? 1 : 0;
      return { ...item, value: newValue };
    });

    dispatch(updateChoiceList(updatedChoiceList));
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

  const handleItemSelect = (choice, index) => {
    if (choice.toLowerCase() === "others") {
      handleTalk();
    }
    setActiveRow(index);
  };

  const handleInputChange = (index, value) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleTalk = () => {
    dispatch(setIsTalking(true));
  };

  const handleTextChange = (choice, value) => {
    const maxWords = 10;
    const wordCount = value.trim().split(/\s+/).length;
    dispatch(setExceedMaxWord(wordCount > maxWords));
    if (wordCount <= maxWords) {
      const updatedChoiceList = choiceList.map((item) => {
        return {
          ...item,
          value: item.text === choice.text ? value : item.value,
        };
      });

      dispatch(updateChoiceList(updatedChoiceList));
    }
  };

  const handleNumberChange = (choice, value) => {
    const maxNumber = 100;
    dispatch(setExceedMaxNumber(Number(value) > maxNumber));
    const updatedChoiceList = choiceList.map((item) => {
      return {
        ...item,
        value: item.text === choice.text ? Number(value) : item.value,
      };
    });

    dispatch(updateChoiceList(updatedChoiceList));
  };
  

  return (
    <div className="list-parent-container">
      <div className="list-container">
        <strong>This is My Instruction</strong>
        <table className="list-table">
          <tbody>
            {choiceList.map((choice, index) => (
              <tr
                key={index}
                onClick={() => handleItemSelect(choice.text, index)}
                className={index === activeRow ? "active-row" : ""}
              >
                <td>{`${index + 1})`}</td>
                <td>{choice.text}</td>
                {choice.text.toLowerCase() != "others"  && <td>
                  {questionType == "rank"  ? (
                    <Rank
                      onClick={() => handleRank(choice)}
                      className="rank"
                      rank={choice.value}
                    />
                  ) : questionType == "slider"  ? (
                    <div>
                      <input
                        type="range"
                        id="myRange"
                        min="0"
                        max="100"
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      ></input>
                      <strong>{values[index]}</strong>
                    </div>
                  ) : (
                    <input
                      className="list-input"
                      type={
                          questionType == "checkbox" 
                          ? "checkbox"
                          : questionType == "radio" 
                          ? "radio"
                          : questionType == "number" 
                          ? "number"
                          : questionType == "text" 
                          ? "text"
                          : null
                      }
                      placeholder={questionType == "text" ? "Type here" : ""}
                      onChange={
                        questionType === "checkbox"
                          ? () => handleCheckboxChange(choice)
                          : questionType == "radio"
                          ? () => handleRadioToggle(choice)
                          : questionType == "text"
                          ? (e) => handleTextChange(choice, e.target.value)
                          : questionType == "number"
                          ? (e) => handleNumberChange(choice, e.target.value)
                          : null
                      }
                      checked={choice.value === 1}
                      min={questionType == "number" ? 0 : undefined}
                      max={questionType == "number" ? 100 : undefined}
                      disabled={
                        questionType === "checkbox" &&
                        choice.value === 0 &&
                        choiceList.filter((item) => item.value === 1).length >=
                          6
                      }
                    />
                  )}
                </td>}
              </tr>
            ))}
          </tbody>
        </table>

        {questionType == "rank" ? (
          <Control
            style={"list-rank-control"}
            questionType={questionType}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default List;
