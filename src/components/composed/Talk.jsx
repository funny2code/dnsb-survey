import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddedChoiceCounter } from "../../store/elements";
import Button from "./../Button";
import "../../css/Talk.css";

export default function Talk({
  onRecord,
  onErase,
  onCancel,
  onDone,
  isRecording,
  transcript,
  onSetNewChoices,
}) {
  const [inputValue, setInputValue] = useState("");
  const isLengthy = transcript.length;
  const newChoice = inputValue ? inputValue : transcript;
  const addedChoiceList = (
    <p className="added-choice">
      <img src={`${import.meta.env.BASE_URL}/assets/Bullet.svg`} alt="" />
      {newChoice}
    </p>
  );

  const dispatch = useDispatch();
  const { addedChoiceCounter } = useSelector((state) => state.entities.elements);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRecord = () => {
    onRecord();
    setInputValue("");
  };

  const handleErase = () => {
    onErase();
    setInputValue("");
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleAdd = () => {
    dispatch(setAddedChoiceCounter(addedChoiceCounter + 1));
    onDone();
    setInputValue("");
  };
  useEffect(() => {
    onSetNewChoices(newChoice);
  }, [transcript, newChoice]);

  return (
    <div className="talk-container grid-2x2">
      {inputValue.length || isRecording ? (
        <div className="choice-group">
          <div className="choice-container">
            <img className="talk-wave" src={`${import.meta.env.BASE_URL}/assets/Talk.svg`} alt="" />
            <div className="added-choice-container">
              {addedChoiceCounter > 300 ? (
                <p>Maximum allowed is 3</p>
              ) : (
                addedChoiceList
              )}
            </div>
          </div>
        </div>
      ) : (
        <table className="talk-group__table">
          <tbody>
            <tr>
              <td>TYPE OR SPEAK:</td>
              <td>To add new choice</td>
            </tr>

            <tr>
              <td>ERASE:</td>
              <td>To to start over</td>
            </tr>

            <tr>
              <td>CANCEL:</td>
              <td>To continue your story</td>
            </tr>
            <tr>
              <td>DONE:</td>
              <td>To confim your new choice</td>
            </tr>
          </tbody>
        </table>
      )}
      <img
        className="talk-edge"
        src={`${import.meta.env.BASE_URL}/assets/Edge_Emotional_States_Hands_Back_Blue.svg`}
        alt=""
      />
      <div className="talk-controls">
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={isRecording ? "TRANSCRIBING" : `TYPE OR SPEAK`}
            className="input"
          />
          <img src={`${import.meta.env.BASE_URL}/fonts/Mic.svg`} alt="" onClick={handleRecord} />
        </div>
        <Button
          onClick={handleErase}
          label="ERASE"
          className={
            isLengthy ? "primary button-small" : "button-small disabled"
          }
        />
        <Button
          onClick={handleCancel}
          label="CANCEL"
          className={"primary button-small"}
        />
        <Button
          onClick={handleAdd}
          label="ADD"
          className={
            isLengthy || inputValue.length > 0
              ? "primary button-small"
              : "button-small disabled"
          }
        />
      </div>
    </div>
  );
}
